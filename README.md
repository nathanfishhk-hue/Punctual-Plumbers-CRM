# Punctual Plumbers CRM & Job Management System

Internal Use Only

## Features

### 5.1 Customer Management
- Internal customer profiles and contact database
- Record of all enquiries, jobs, and history (visible only to admin and relevant staff)
- Internal job status tracking (Pending → Assigned → In Progress → Completed → Invoiced)

### 5.2 Job Card System

#### Admin / Owner Features
- Manually create new job cards from incoming leads
- Assign jobs to employees/technicians
- Set hidden labour hourly rates (R350/hr by default)
- View full financial details
- One-click send completed job card to accountant

#### Employee / Technician Features (Mobile-friendly)
- Receive job cards via email / notification
- Log Time In / Time Out
- Add materials used
- Submit completed job card

#### Automation & Calculations
- Automatic labour cost calculation
- Automatic material costs
- Final total including 15% VAT
- Clear grand total display
- Payment via EFT to bank account with banking details

## Demo Credentials
- Admin: admin@punctualplumbers.co.za / admin123
- Employee: employee@punctualplumbers.co.za / emp123

## Installation

```bash
npm install
npm run seed
npm run dev
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```