# Bajaj Finance EMI Collections — Mock Loan Management API

Mock REST API simulating Bajaj Finance's internal Loan Management System for Voice AI collections agent development on [Bolna](https://bolna.ai).

## Overview

This API provides realistic borrower data and collection workflow endpoints that a **Bolna Voice AI agent** calls during live phone conversations. Part of an enterprise demo showcasing end-to-end EMI collections automation with:

- 6 real-time function calls during live calls
- 10 pre-seeded borrowers (each a different edge case)
- RBI Fair Practices Code compliant workflow
- Post-call automation via n8n → Airtable CRM → Google Sheets

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/borrowers?phone=+91xxx` | Lookup borrower by phone |
| `GET` | `/api/loans?loan_id=BFL-xxx` | Get loan details & EMI schedule |
| `GET` | `/api/payments/verify?phone=+91xxx` | Check if recent payment exists |
| `POST` | `/api/payments/link` | Generate UPI/NEFT payment link |
| `POST` | `/api/ptp` | Record Promise to Pay |
| `POST` | `/api/dispositions` | Log call disposition |
| `GET` | `/health` | Health check |
| `GET` | `/ping` | Keep-alive endpoint |

## Pre-seeded Borrower Scenarios

| Phone | Name | Scenario | Demo Purpose |
|-------|------|----------|--------------|
| +919876543001 | Rajesh Kumar | First-time overdue, Rs.5,450 | Happy path — PTP capture |
| +919876543002 | Priya Sharma | 3-month overdue, broken promises | Difficult negotiation |
| +919876543003 | Amit Patel | Paid yesterday | "Already paid" verification |
| +919876543004 | *(Unknown)* | Number reassigned | Wrong number handling |
| +919876543005 | Late Suresh Reddy | Deceased | Sensitive situation |
| +919876543006 | Meena Devi | Hindi-only, partial payer | Multilingual + partial |
| +919876543007 | Vikram Singh | Disputes amount | Angry caller de-escalation |
| +919876543008 | Fatima Begum | Job loss, hardship | Empathy + escalation |
| +919876543009 | Karthik Nair | 180 days overdue | Settlement transfer |
| +919876543010 | Deepa Iyer | Not yet overdue | Pre-due reminder |

## Run Locally

```bash
npm install
node server.js
# Test: http://localhost:3000/api/borrowers?phone=+919876543001
```

## Deploy

Deployed on [Render](https://render.com) free tier. Keep-alive via [cron-job.org](https://cron-job.org) pinging `/ping` every 10 minutes.

## Part Of

Enterprise Voice AI Collections System:
- **Bolna** — Voice AI agent with 6 function calls, 3 guardrails, multilingual
- **n8n** — Post-call workflow automation
- **Airtable** — Collections CRM
- **Google Sheets** — Collections tracker dashboard

Built for Bolna AI Enterprise Assessment.
