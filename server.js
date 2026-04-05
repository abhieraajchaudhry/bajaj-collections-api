const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const borrowers = require('./data/borrowers');

const app = express();
app.use(cors());
app.use(express.json());

// ─── HEALTH + KEEP-ALIVE ───
app.get('/health', (req, res) => {
  res.json({
    status: "ok",
    service: "Bajaj Finance Collections API (Mock)",
    borrowers_loaded: Object.keys(borrowers).length,
    timestamp: new Date().toISOString()
  });
});
app.get('/ping', (req, res) => res.send('pong'));

// ─── ENDPOINT 1: LOOKUP BORROWER ───
// Supports BOTH: /api/borrowers?phone=+91xxx (Bolna) AND /api/borrowers/+91xxx (curl)
app.get('/api/borrowers', (req, res) => {
  const phone = req.query.phone;
  if (!phone) return res.status(400).json({ error: "phone query parameter required. Example: /api/borrowers?phone=+919876543001" });
  return handleBorrowerLookup(phone, res);
});
app.get('/api/borrowers/:phone', (req, res) => handleBorrowerLookup(req.params.phone, res));

// Normalize phone: handles "+91xxx", " 91xxx" (+ became space), "91xxx", "091xxx"
function normalizePhone(raw) {
  let cleaned = raw.trim().replace(/\s+/g, '').replace(/^0+/, '');
  if (!cleaned.startsWith('+')) {
    if (cleaned.startsWith('91') && cleaned.length >= 12) {
      cleaned = '+' + cleaned;
    } else {
      cleaned = '+91' + cleaned;
    }
  }
  return cleaned;
}

function handleBorrowerLookup(phone, res) {
  phone = normalizePhone(phone);
  const borrower = borrowers[phone];

  if (!borrower) {
    return res.status(404).json({
      found: false, phone,
      message: "No borrower found with this phone number. This may be a wrong number.",
      suggestion: "Log disposition as WRONG_NUMBER"
    });
  }

  if (borrower.status === "wrong_number") {
    return res.json({
      found: true, status: "wrong_number", phone,
      message: "This number was previously associated with a borrower but has been reassigned. Do NOT discuss any loan details.",
      flags: borrower.flags, note: borrower.note
    });
  }

  if (borrower.status === "deceased") {
    return res.json({
      found: true, status: "deceased",
      borrower_id: borrower.id, name: borrower.name, phone,
      deceased_date: borrower.deceased_date, flags: borrower.flags,
      message: "SENSITIVE: Borrower is deceased. Do NOT attempt collection. Express condolences. Escalate to manual review."
    });
  }

  const loan = borrower.loans[0];
  res.json({
    found: true, status: borrower.status,
    borrower_id: borrower.id, name: borrower.name, phone,
    city: borrower.city, state: borrower.state,
    language_preference: borrower.language_preference,
    primary_loan: {
      loan_id: loan.loan_id, product: loan.product,
      emi_amount: loan.emi_amount, overdue_amount: loan.overdue_amount,
      overdue_days: loan.overdue_days, overdue_emis: loan.overdue_emis,
      total_due: loan.total_due, penalty: loan.penalty,
      bucket: loan.bucket, dpd: loan.dpd,
      next_due_date: loan.next_due_date, last_payment_date: loan.last_payment_date
    },
    flags: borrower.flags,
    collection_history: borrower.collection_history,
    dispute_details: borrower.dispute_details || null,
    hardship_details: borrower.hardship_details || null,
    settlement_offer: borrower.settlement_offer || null
  });
}

// ─── ENDPOINT 2: GET LOAN DETAILS ───
app.get('/api/loans', (req, res) => {
  const loanId = req.query.loan_id;
  if (!loanId) return res.status(400).json({ error: "loan_id query parameter required" });
  return handleLoanLookup(loanId, res);
});
app.get('/api/loans/:loan_id', (req, res) => handleLoanLookup(req.params.loan_id, res));

function handleLoanLookup(loanId, res) {
  for (const phone in borrowers) {
    const borrower = borrowers[phone];
    if (borrower.loans) {
      const loan = borrower.loans.find(l => l.loan_id === loanId);
      if (loan) {
        return res.json({
          found: true, loan_id: loan.loan_id,
          borrower_name: borrower.name, borrower_phone: borrower.phone,
          product: loan.product, principal: loan.principal,
          emi_amount: loan.emi_amount, tenure_months: loan.tenure_months,
          months_paid: loan.months_paid, months_remaining: loan.months_remaining,
          overdue_amount: loan.overdue_amount, overdue_days: loan.overdue_days,
          overdue_emis: loan.overdue_emis, penalty: loan.penalty,
          total_due: loan.total_due, bucket: loan.bucket, dpd: loan.dpd,
          next_due_date: loan.next_due_date, last_payment_date: loan.last_payment_date,
          last_payment_amount: loan.last_payment_amount
        });
      }
    }
  }
  res.status(404).json({ found: false, loan_id: loanId, message: "Loan not found" });
}

// ─── ENDPOINT 3: VERIFY RECENT PAYMENT ───
app.get('/api/payments/verify', (req, res) => {
  const phone = req.query.phone;
  if (!phone) return res.status(400).json({ error: "phone query parameter required" });
  return handlePaymentVerify(phone, res);
});
app.get('/api/payments/verify/:phone', (req, res) => handlePaymentVerify(req.params.phone, res));

function handlePaymentVerify(phone, res) {
  phone = normalizePhone(phone);
  const borrower = borrowers[phone];
  if (!borrower) return res.status(404).json({ found: false, message: "Borrower not found" });

  if (borrower.recent_payment) {
    return res.json({
      payment_found: true, borrower_name: borrower.name,
      payment: borrower.recent_payment,
      message: `Payment of Rs.${borrower.recent_payment.amount} received on ${borrower.recent_payment.date} via ${borrower.recent_payment.mode}. Reference: ${borrower.recent_payment.reference}. Thank the borrower and update disposition as ALREADY_PAID.`
    });
  }

  res.json({
    payment_found: false, borrower_name: borrower.name,
    message: "No recent payment found in the last 7 days.",
    suggestion: "Ask borrower for payment date, amount, and mode for manual verification."
  });
}

// ─── ENDPOINT 4: GENERATE PAYMENT LINK (POST) ───
app.post('/api/payments/link', (req, res) => {
  const { phone, loan_id, amount } = req.body;
  if (!phone || !amount) return res.status(400).json({ error: "phone and amount required" });

  const linkId = uuidv4().substring(0, 8).toUpperCase();
  res.json({
    success: true,
    payment_link: `https://pay.bajajfinserv.in/emi/${linkId}`,
    amount, loan_id: loan_id || "N/A", valid_for_hours: 48,
    payment_modes: ["UPI", "Net Banking", "Debit Card", "NEFT/RTGS"],
    message: `Payment link generated. Valid 48 hours. Amount: Rs.${amount}. SMS sent to borrower.`
  });
});

// ─── ENDPOINT 5: RECORD PROMISE TO PAY (POST) ───
app.post('/api/ptp', (req, res) => {
  const { phone, loan_id, ptp_date, ptp_amount, notes } = req.body;
  if (!phone || !ptp_date || !ptp_amount) return res.status(400).json({ error: "phone, ptp_date, ptp_amount required" });

  const ptpId = `PTP-${uuidv4().substring(0, 6).toUpperCase()}`;
  res.json({
    success: true, ptp_id: ptpId, phone, loan_id: loan_id || "N/A",
    ptp_date, ptp_amount, status: "RECORDED",
    auto_followup: `Auto-follow-up on ${ptp_date} if payment not received`,
    message: `PTP recorded. ID: ${ptpId}. Rs.${ptp_amount} by ${ptp_date}. Auto-reminder scheduled.`
  });
});

// ─── ENDPOINT 6: LOG DISPOSITION (POST) ───
app.post('/api/dispositions', (req, res) => {
  const { phone, loan_id, disposition_code, notes } = req.body;
  if (!disposition_code) return res.status(400).json({ error: "disposition_code required" });

  const dispId = `DISP-${uuidv4().substring(0, 6).toUpperCase()}`;
  const actions = {
    "PTP_CAPTURED": "Auto-follow-up on PTP date",
    "REFUSED": "Retry after 3 days. Escalate if 3+ refusals",
    "ALREADY_PAID": "Verify payment. No further calls",
    "WRONG_NUMBER": "Remove from dialer. Flag data quality",
    "CALLBACK_REQUESTED": "Schedule callback. Max 2 attempts",
    "DISPUTE": "Route to dispute team. Pause collection",
    "SETTLEMENT_TRANSFER": "Transfer to settlement desk",
    "DECEASED_FLAG": "Stop all calls. Escalate to legal/compliance",
    "PARTIAL_PAYMENT": "Link for remaining. Follow up in 7 days",
    "HARDSHIP_REPORTED": "Route to hardship team for restructuring",
    "DND_REQUESTED": "Add to DND immediately. Compliance alert",
    "ESCALATED": "Route to human. Callback within 2 hours"
  };

  res.json({
    success: true, disposition_id: dispId,
    phone: phone || "N/A", loan_id: loan_id || "N/A",
    disposition_code, notes: notes || "",
    timestamp: new Date().toISOString(),
    next_action: actions[disposition_code] || "Review manually",
    message: `Disposition logged: ${disposition_code}. ID: ${dispId}.`
  });
});

// ─── START ───
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n=== Bajaj Finance Collections API (Mock) ===`);
  console.log(`Running on port ${PORT}`);
  console.log(`\nTest these URLs:`);
  console.log(`  Health:    http://localhost:${PORT}/health`);
  console.log(`  Borrower:  http://localhost:${PORT}/api/borrowers?phone=+919876543001`);
  console.log(`  Loan:      http://localhost:${PORT}/api/loans?loan_id=BFL-EMI-2024-78234`);
  console.log(`  Payment:   http://localhost:${PORT}/api/payments/verify?phone=+919876543003`);
  console.log(`================================================\n`);
});
