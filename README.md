# 🩸 Hemovia - Blood Donation Management Platform

<div align="center">

**Hemovia is a blood donation management platform built for Bangladesh. It helps users find compatible donors by blood group, district, and upazila, track donation requests through every stage, and gives admins and volunteers the tools to coordinate the entire process from one place.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.5-5A0EF8?style=flat&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Custom-dc2626.svg)](#-license)

<div align="center">
<a href="https://hemovia.vercel.app" target="_blank">

![Live Demo](https://img.shields.io/badge/HEMOVIA-LIVE%20DEMO-dc2626?style=for-the-badge&logo=vercel&logoColor=white&labelColor=111827)

</a>
</div>

</div>

---

## 🧠 Real-World Problem & Solution

### The Problem
During medical emergencies (surgeries, trauma care, chronic illnesses like thalassemia), finding compatible blood donors is a critical and time-sensitive bottleneck. Traditional sourcing methods suffer from:

1. **Inefficient Sourcing** - No location-based filtering means requests reach donors who are too far away
2. **Coordination Overhead** - No request tracking leads to duplicate signups or unanswered calls
3. **Transparency Issues** - No consolidated ledger for donations, volunteer roles, or charity funding

### The Solution
Hemovia digitizes the entire donation pipeline:

- **Geographic Matchmaking**: Instantly query donor pools by blood group, district, and upazila
- **Request Lifecycle Management**: Track requests through `pending` → `inprogress` → `done` / `canceled`
- **Administrative Transparency**: Role-based dashboards keep user records, requests, and funding fully audited

---

## ✨ Key Features

- **Role-Based Dashboards** - Separate dashboards for Donors, Volunteers, and Admins with purpose-built views
- **Donation Request Management** - Full CRUD with four-stage lifecycle tracking (`pending` → `inprogress` → `done` / `canceled`)
- **Live Donor Search** - Multi-field filtering by blood group, district, and upazila against the live database
- **Stripe Fundraising** - Secure checkout with a public verified transaction ledger
- **Blood Donation Centers** - Directory of verified centers with hours, contact info, and ratings
- **Blood Compatibility Guide** - Full blood type compatibility reference built into the platform
- **Demo Mode** - One-click demo login (Donor / Admin) with all write operations safely blocked
- **Contact Support** - EmailJS-powered contact form for direct messages to the support team
- **Dark Mode** - Persistent light/dark theme toggle synced across all views
- **Responsive Design** - Fully adaptive layout from mobile to large desktop screens

---

## 🧪 Demo Accounts

To test the platform without registering, use the one-click demo login on the login page or enter these credentials:

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Donor** | `donor@hemovia.com` | `Demo@123` | Donor Dashboard, request creation, profile views |
| **Admin** | `admin@hemovia.com` | `Demo@123` | Admin Dashboard, user management, request moderation |

> **Note:** Demo mode is read-only. Create, edit, and delete actions are safely blocked to protect existing data.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 7, React Router 7, Tailwind CSS 4, DaisyUI 5 |
| **Backend** | Node.js, Express.js (hosted on Vercel) |
| **Database** | MongoDB Atlas |
| **Auth** | Firebase Authentication (Email/Password + Google SSO) |
| **Payments** | Stripe API |
| **Email** | EmailJS SDK |
| **Image Hosting** | ImgBB API |
| **UI Libraries** | Lucide React, React Icons, SweetAlert2, React-Toastify |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** v9+
- Firebase, EmailJS, and ImgBB accounts

### Installation

```bash
git clone https://github.com/SiratimMChy/Hemovia-Frontend.git
cd Hemovia-Frontend
npm install
```

Create a `.env.local` in the root:

```env
# Firebase
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id

# EmailJS
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# ImgBB
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set the **Framework Preset** to `Vite`
4. Add all environment variables from `.env.local` under **Settings → Environment Variables**
5. Click **Deploy**

> SPA routing rewrites are pre-configured in `vercel.json`. Every push to `main` triggers an automatic redeployment.

---

## 📐 Architecture

For detailed technical documentation covering software architecture, component hierarchy, project structure, auth flow, and database schema, see **[ARCHITECTURE.md](ARCHITECTURE.md)**.

---

## 📄 License

This project is protected under the [License & Usage Guidelines](LICENSE).

- Please ask for permission from **Siratim Mustakim Chowdhury** before hosting or deploying this project.
- If permitted, always credit the author and link back to this repository.
- Do not modify, rebrand, or extract parts without prior approval.

For permission requests, message the author on [LinkedIn](https://www.linkedin.com/in/siratim-mustakim-chowdhury/) or check the [LICENSE](LICENSE) file.

*Copyright © 2026 Siratim Mustakim Chowdhury. All rights reserved.*

<div align="center">

**Created by Siratim Mustakim Chowdhury**

[![Repository](https://img.shields.io/badge/Repository-SiratimMChy%2FHemovia--Frontend-181717?style=flat&logo=github)](https://github.com/SiratimMChy/Hemovia-Frontend)
[![GitHub Profile](https://img.shields.io/badge/GitHub-SiratimMChy-181717?style=flat&logo=github)](https://github.com/SiratimMChy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Siratim%20Mustakim-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/siratim-mustakim-chowdhury/)

</div>
