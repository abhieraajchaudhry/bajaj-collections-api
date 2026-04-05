// data/borrowers.js
// 10 pre-seeded borrowers for Bajaj Finance Collections Demo
// Each borrower triggers a different edge case in the Voice AI agent

const borrowers = {
  "+919876543001": {
    id: "BRW-001",
    name: "Rajesh Kumar",
    phone: "+919876543001",
    age: 34,
    city: "Lucknow",
    state: "Uttar Pradesh",
    language_preference: "hinglish",
    status: "active",
    loans: [
      {
        loan_id: "BFL-EMI-2024-78234",
        product: "Consumer Durable Loan",
        principal: 85000,
        emi_amount: 5200,
        tenure_months: 18,
        months_paid: 12,
        months_remaining: 6,
        overdue_amount: 5200,
        overdue_days: 15,
        overdue_emis: 1,
        next_due_date: "2026-04-20",
        last_payment_date: "2026-02-18",
        last_payment_amount: 5200,
        bucket: "X",
        penalty: 250,
        total_due: 5450,
        dpd: 15
      }
    ],
    recent_payment: null,
    flags: [],
    collection_history: [
      { date: "2026-03-25", disposition: "NOT_REACHABLE", notes: "No answer" }
    ]
  },

  "+919876543002": {
    id: "BRW-002",
    name: "Priya Sharma",
    phone: "+919876543002",
    age: 29,
    city: "Jaipur",
    state: "Rajasthan",
    language_preference: "english",
    status: "active",
    loans: [
      {
        loan_id: "BFL-PL-2024-45102",
        product: "Personal Loan",
        principal: 200000,
        emi_amount: 7800,
        tenure_months: 36,
        months_paid: 24,
        months_remaining: 12,
        overdue_amount: 23400,
        overdue_days: 92,
        overdue_emis: 3,
        next_due_date: "2026-01-05",
        last_payment_date: "2025-12-28",
        last_payment_amount: 4000,
        bucket: "2",
        penalty: 1800,
        total_due: 25200,
        dpd: 92
      }
    ],
    recent_payment: null,
    flags: ["BROKEN_PTP"],
    collection_history: [
      { date: "2026-02-15", disposition: "PTP_CAPTURED", notes: "Promised Rs.10,000 by Feb 28 - not paid" },
      { date: "2026-03-01", disposition: "PTP_BROKEN", notes: "Follow-up - promise broken" },
      { date: "2026-03-20", disposition: "CALLBACK_REQUESTED", notes: "Said will call back - didn't" }
    ]
  },

  "+919876543003": {
    id: "BRW-003",
    name: "Amit Patel",
    phone: "+919876543003",
    age: 41,
    city: "Ahmedabad",
    state: "Gujarat",
    language_preference: "english",
    status: "active",
    loans: [
      {
        loan_id: "BFL-EMI-2024-33210",
        product: "Two-Wheeler Loan",
        principal: 65000,
        emi_amount: 3400,
        tenure_months: 24,
        months_paid: 20,
        months_remaining: 4,
        overdue_amount: 0,
        overdue_days: 0,
        overdue_emis: 0,
        next_due_date: "2026-04-10",
        last_payment_date: "2026-04-03",
        last_payment_amount: 3400,
        bucket: "CURRENT",
        penalty: 0,
        total_due: 0,
        dpd: 0
      }
    ],
    recent_payment: {
      amount: 3400,
      date: "2026-04-03",
      mode: "UPI",
      reference: "UPI-TXN-887654321",
      status: "SUCCESS"
    },
    flags: [],
    collection_history: []
  },

  "+919876543004": {
    id: "BRW-004",
    name: null,
    phone: "+919876543004",
    status: "wrong_number",
    loans: [],
    recent_payment: null,
    flags: ["WRONG_NUMBER", "NUMBER_REASSIGNED"],
    note: "This number was previously assigned to borrower Manoj Verma (BFL-PL-2023-11234). Number has been reassigned to a different person.",
    collection_history: []
  },

  "+919876543005": {
    id: "BRW-005",
    name: "Late Suresh Reddy",
    phone: "+919876543005",
    age: null,
    city: "Hyderabad",
    state: "Telangana",
    language_preference: "telugu",
    status: "deceased",
    loans: [
      {
        loan_id: "BFL-PL-2024-67890",
        product: "Personal Loan",
        principal: 150000,
        emi_amount: 6400,
        tenure_months: 30,
        months_paid: 18,
        months_remaining: 12,
        overdue_amount: 12800,
        overdue_days: 62,
        overdue_emis: 2,
        next_due_date: "2026-02-01",
        last_payment_date: "2026-01-05",
        last_payment_amount: 6400,
        bucket: "2",
        penalty: 900,
        total_due: 13700,
        dpd: 62
      }
    ],
    recent_payment: null,
    flags: ["DECEASED", "DO_NOT_CALL_FOR_COLLECTION", "REQUIRES_MANUAL_REVIEW"],
    deceased_date: "2026-02-15",
    collection_history: []
  },

  "+919876543006": {
    id: "BRW-006",
    name: "Meena Devi",
    phone: "+919876543006",
    age: 52,
    city: "Patna",
    state: "Bihar",
    language_preference: "hindi",
    status: "active",
    loans: [
      {
        loan_id: "BFL-EMI-2025-12456",
        product: "Consumer Durable Loan",
        principal: 45000,
        emi_amount: 2870,
        tenure_months: 18,
        months_paid: 11,
        months_remaining: 7,
        overdue_amount: 8610,
        overdue_days: 45,
        overdue_emis: 3,
        next_due_date: "2026-02-15",
        last_payment_date: "2026-01-10",
        last_payment_amount: 1500,
        bucket: "1",
        penalty: 600,
        total_due: 9210,
        dpd: 45
      }
    ],
    recent_payment: null,
    flags: ["PARTIAL_PAYER", "HINDI_ONLY"],
    collection_history: [
      { date: "2026-03-10", disposition: "PARTIAL_PAYMENT", notes: "Paid Rs.1,500 against Rs.2,870 EMI" }
    ]
  },

  "+919876543007": {
    id: "BRW-007",
    name: "Vikram Singh",
    phone: "+919876543007",
    age: 38,
    city: "Delhi",
    state: "Delhi",
    language_preference: "hinglish",
    status: "active",
    loans: [
      {
        loan_id: "BFL-PL-2024-99001",
        product: "Personal Loan",
        principal: 300000,
        emi_amount: 15200,
        tenure_months: 24,
        months_paid: 16,
        months_remaining: 8,
        overdue_amount: 15200,
        overdue_days: 60,
        overdue_emis: 1,
        next_due_date: "2026-02-05",
        last_payment_date: "2026-01-30",
        last_payment_amount: 15200,
        bucket: "1",
        penalty: 1200,
        total_due: 16400,
        dpd: 60
      }
    ],
    recent_payment: null,
    flags: ["DISPUTES_AMOUNT", "PREVIOUSLY_ANGRY"],
    dispute_details: "Borrower claims processing fee of Rs.3,000 was incorrectly charged at disbursement. Has emailed complaint to support@bajajfinserv.in on March 1.",
    collection_history: [
      { date: "2026-03-15", disposition: "DISPUTE", notes: "Angry about processing fee. Refuses to pay until dispute resolved." }
    ]
  },

  "+919876543008": {
    id: "BRW-008",
    name: "Fatima Begum",
    phone: "+919876543008",
    age: 45,
    city: "Kolkata",
    state: "West Bengal",
    language_preference: "hinglish",
    status: "active",
    loans: [
      {
        loan_id: "BFL-PL-2023-55678",
        product: "Personal Loan",
        principal: 500000,
        emi_amount: 15500,
        tenure_months: 48,
        months_paid: 28,
        months_remaining: 20,
        overdue_amount: 31000,
        overdue_days: 120,
        overdue_emis: 2,
        next_due_date: "2025-12-05",
        last_payment_date: "2025-11-15",
        last_payment_amount: 8000,
        bucket: "3",
        penalty: 4500,
        total_due: 35500,
        dpd: 120
      }
    ],
    recent_payment: null,
    flags: ["HARDSHIP", "JOB_LOSS", "SETTLEMENT_POSSIBLE"],
    hardship_details: "Lost job in November 2025. Currently looking for employment. Requested restructuring on Dec 10, 2025.",
    collection_history: [
      { date: "2025-12-10", disposition: "HARDSHIP_REPORTED", notes: "Lost job. Requested EMI holiday/restructuring." },
      { date: "2026-01-15", disposition: "CALLBACK_REQUESTED", notes: "Said she's interviewing, asked to call back in Feb" },
      { date: "2026-03-01", disposition: "PARTIAL_PAYMENT", notes: "Paid Rs.8,000 from savings" }
    ]
  },

  "+919876543009": {
    id: "BRW-009",
    name: "Karthik Nair",
    phone: "+919876543009",
    age: 55,
    city: "Chennai",
    state: "Tamil Nadu",
    language_preference: "english",
    status: "active",
    loans: [
      {
        loan_id: "BFL-BL-2023-22345",
        product: "Business Loan",
        principal: 800000,
        emi_amount: 22500,
        tenure_months: 48,
        months_paid: 22,
        months_remaining: 26,
        overdue_amount: 45000,
        overdue_days: 180,
        overdue_emis: 2,
        next_due_date: "2025-10-10",
        last_payment_date: "2025-09-08",
        last_payment_amount: 22500,
        bucket: "4",
        penalty: 8500,
        total_due: 53500,
        dpd: 180
      }
    ],
    recent_payment: null,
    flags: ["SETTLEMENT_ELIGIBLE", "NPA_CANDIDATE", "REQUIRES_SENIOR_APPROVAL"],
    settlement_offer: {
      eligible: true,
      original_outstanding: 585000,
      settlement_amount: 410000,
      discount_percent: 30,
      valid_until: "2026-06-30",
      requires_approval: "VP Collections"
    },
    collection_history: [
      { date: "2025-12-01", disposition: "REFUSED", notes: "Business failed. Cannot pay full amount." },
      { date: "2026-02-01", disposition: "SETTLEMENT_DISCUSSED", notes: "Interested in settlement. Needs to arrange funds." }
    ]
  },

  "+919876543010": {
    id: "BRW-010",
    name: "Deepa Iyer",
    phone: "+919876543010",
    age: 31,
    city: "Bangalore",
    state: "Karnataka",
    language_preference: "english",
    status: "active",
    loans: [
      {
        loan_id: "BFL-EMI-2025-88901",
        product: "Consumer Durable Loan",
        principal: 120000,
        emi_amount: 6800,
        tenure_months: 20,
        months_paid: 5,
        months_remaining: 15,
        overdue_amount: 0,
        overdue_days: 0,
        overdue_emis: 0,
        next_due_date: "2026-04-08",
        last_payment_date: "2026-03-06",
        last_payment_amount: 6800,
        bucket: "CURRENT",
        penalty: 0,
        total_due: 6800,
        dpd: 0
      }
    ],
    recent_payment: null,
    flags: ["PRE_DUE_REMINDER"],
    collection_history: []
  }
};

module.exports = borrowers;
