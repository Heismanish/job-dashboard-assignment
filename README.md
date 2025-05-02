# Job Portal — Next.js + TypeScript

A minimal job application platform built with Next.js App Router, Tailwind CSS, TypeScript, Formik/Yup, and localStorage.

### Tech Stack

1. Next.js (App Router) – SSR/SSG-ready routing and pages

2. TypeScript – Type-safe components, props, and logic

3. Tailwind CSS – Utility-first, responsive UI styling

4. Formik + Yup – Form state and validation

5. Context API – (Optional) for global state sharing

6. LocalStorage – Temporary persistence for job applications

7. JSON Mock Data – Simulates job listings backend

# Routes Overview

### Home Page (`/`)

- Renders a grid of job cards from jobs.json

- Each card has a “View Details” button linking to `/job/[id]`

### Job Detail Page (`/job/[id]`)

- Dynamically fetches job data by ID from jobs.json

- Displays job description, responsibilities, tech stack, etc.

- Includes a full-featured Apply Form (Formik + Yup)

- On submission, data is saved to localStorage

### Applied Jobs Page (`/jobs-applied`)

- Reads applied jobs from localStorage

- Lists each job the user applied for

- Shows name, email, resume link, and cover letter

## Application Flow

User visits home page → Sees job listings

Clicks on "View Details" → Navigates to job detail

Fills the application form → On submit, data saved to localStorage

Visits /jobs-applied → Sees previously applied jobs

## Features Implemented

- ✅ Next.js App Router
- ✅ TypeScript
- ✅ Tailwind CSS UI
- ✅ Dynamic Routing (/job/[id])
- ✅ Formik + Yup for validation
- ✅ LocalStorage-based application tracking
- ✅ Applied Jobs dashboard
- ✅ Dark mode support using dark: Tailwind utility

## Folder structure

```sh
/app
  /job
    [id]/page.tsx      // Job detail + form
  /jobs-applied
    page.tsx           // View applied jobs
  layout.tsx           // Shared layout (includes Navbar)
  page.tsx             // Home page (job grid)

components/
  Navbar.tsx
  JobCard.tsx
  ApplyForm.tsx

data/
  jobs.json            // Mock job data

```

## Run locally

```sh
git clone <your-repo-url>
cd job-portal-next
npm install
npm run dev
```

Visit: http://localhost:3000
