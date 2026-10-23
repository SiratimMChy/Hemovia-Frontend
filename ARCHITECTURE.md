# Hemovia - Technical Architecture

Detailed technical documentation for the Hemovia platform. For project overview, setup, and deployment, see [README.md](README.md).

---

## Architecture Overview

Hemovia follows a **Component-Based Architecture** with clear separation of concerns, built on modern React patterns.

<img width="1440" height="1240" alt="image" src="https://github.com/user-attachments/assets/92ae2606-2e1d-441d-b583-38d68778e101" />

### Key Data Flows

#### Donation Request Lifecycle Flow
```
Donor submits request form
    ↓
useAxiosSecure - injects JWT Bearer token
    ↓
POST /requests → MongoDB
    ↓
Request visible in public directory (status: pending)
    ↓
Donor accepts → status: inprogress → done / canceled
```

#### Demo Action Restriction Flow
```
Any write action (POST / PUT / DELETE)
    ↓
useDemoRestriction hook checks user email
    ↓
Demo account? → SweetAlert2 restriction warning shown
    ↓
Real account? → Action proceeds normally
```

---

## Component Hierarchy

```
App
├── RootLayout
│   ├── Navbar (NavbarNavLinks, NavbarUserMenu, ThemeToggle)
│   ├── Public Routes
│   │   ├── Home (HeroBanner, HowItWorks, FeaturedCenters, LiveImpact, WhyDonateBlood, ContactSection)
│   │   ├── Login (LoginForm, DemoLoginBox)
│   │   ├── Register (RegisterForm, RegisterAvatarUpload)
│   │   ├── ForgetPassword (Password reset view)
│   │   ├── Search (SearchForm, SearchResultsGrid)
│   │   ├── DonationRequests (DonationRequestCard)
│   │   ├── ViewRequest (RequestDetailsCard, DonateModal)
│   │   ├── EditRequest (EditRequestForm)
│   │   ├── DonationCentersPage (DonationCentersGrid, Search, Stats, CTA)
│   │   ├── CenterDetails (CenterHeader, CenterInfoCards, CenterMapPlaceholder)
│   │   ├── BloodCompatibilitySection (CompatibilityMatches, CompatibilityChart)
│   │   ├── FAQPage (FAQAccordion, FAQContactBox)
│   │   ├── About (AboutImpactStats, AboutTeamSection, AboutValuesGrid)
│   │   ├── Donate (Stripe Checkout Form + Public Ledger)
│   │   ├── PaymentSuccess (Stripe confirmation)
│   │   └── PaymentCancelled (Stripe cancellation)
│   └── Footer
└── PrivateRoute
    └── DashboardLayout
        ├── Aside (Collapsible Sidebar, asideConfig, ThemeToggle)
        ├── DemoUserBadge (Floating overlay)
        └── Dashboard Routes
            ├── AdminDashboard (AdminStatCards, AdminAnalytics, AdminRecentActivities)
            ├── DonorDashboard (DonorStatCards, DonorAnalytics, DonorRecentRequests)
            ├── VolunteerDashboard (VolunteerStatCards, VolunteerAnalytics, VolunteerRecentActivity)
            ├── AddRequest (AddRequestForm)
            ├── MyRequest (MyRequestHeader, MyRequestStatCards, MyRequestDesktopTable, MyRequestMobileCards, MyRequestPagination)
            ├── AllRequest (RequestHeader, RequestDesktopTable, RequestMobileCards, RequestPagination)
            ├── AllUsers (UserDesktopTable, UserMobileCards, UserPagination, UserRoleModal)
            ├── Profile (ProfileHeader, ProfileFormFields)
            └── utils (requestHelpers for status badges and modal actions)
```

### Design Patterns

| Pattern | Usage |
|---|---|
| **Context Provider** | `AuthProvider` manages global auth state and role |
| **Higher-Order Component** | `PrivateRoute` wraps protected dashboard routes |
| **Custom Hook** | `useAxiosSecure` injects JWT; `useDemoRestriction` blocks writes |
| **Controlled Components** | All forms use controlled state with `useState` |
| **Compound Components** | Admin Dashboard composed of independent stat card units |

---

## Project Structure

```
Blood Donation/
├── .firebase/                    # Local Firebase configuration cache
├── .firebaserc                   # Firebase project mapping
├── firebase.json                 # Firebase Hosting config (SPA rewrites)
├── vite.config.js                # Vite + Tailwind CSS v4 plugin settings
├── eslint.config.js              # ESLint rules
├── package.json                  # Dependencies and npm scripts
├── public/                       # Static assets (served directly)
│   ├── district.json             # Bangladesh districts data
│   └── upazila.json              # Bangladesh upazilas data
└── src/
    ├── assets/                   # Local image and brand assets
    ├── Components/               # Reusable UI component modules
    │   ├── Aside/                # Collapsible dashboard sidebar (Aside.jsx, asideConfig.js)
    │   ├── BloodCompatibility/   # Compatibility matrix (Matches, Chart, Data)
    │   ├── DemoUserBadge/        # Floating demo session indicator
    │   ├── Footer/               # Shared site footer
    │   ├── Home/                 # Modular home sections (Hero, HowItWorks, Centers, Impact, Contact)
    │   ├── Navbar/               # Responsive top navigation (NavLinks, UserMenu, ThemeToggle)
    │   ├── SkeletonLoader/       # Loading state card placeholders
    │   └── UI/                   # Design system atoms (Button, Card, Input, Badge)
    ├── config/
    │   └── emailjs.js            # EmailJS config wrapper and validator
    ├── Dashboard/                # Protected dashboard modules (< 200 lines each)
    │   ├── AddRequest/           # Blood request creation form (AddRequest, AddRequestForm)
    │   ├── AdminDashboard/       # System stats, charts, recent activities (Stats, Analytics, Activity)
    │   ├── AllRequest/           # Platform requests directory (Header, DesktopTable, MobileCards, Pagination)
    │   ├── AllUsers/             # User management (DesktopTable, MobileCards, Pagination, RoleModal)
    │   ├── DonorDashboard/       # Donor personal stats and requests (StatCards, Analytics, RecentRequests)
    │   ├── MyRequest/            # Personal request logs (Header, Stats, Table, Cards, Pagination, EmptyState)
    │   ├── Profile/              # Profile editor with ImgBB upload (Profile, Header, FormFields)
    │   ├── VolunteerDashboard/   # Volunteer platform coordination (StatCards, Analytics, Activity)
    │   └── utils/                # Shared dashboard helpers (requestHelpers.jsx)
    ├── DashboardLayout/          # Protected dashboard layout wrapper
    ├── Donate/                   # Stripe checkout form + public payment ledger
    ├── Firebase/
    │   └── firebase.config.js    # Firebase SDK initialization
    ├── Hooks/
    │   ├── useAxios.jsx          # Base Axios instance
    │   ├── useAxiosSecure.jsx    # JWT-injecting secure Axios instance
    │   └── useDemoRestriction.js # Demo user write-block interceptor
    ├── Pages/                    # Modular public-facing feature modules
    │   ├── About/                # Platform mission and stats (About, ImpactStats, Team, Values)
    │   ├── BloodCompatibilitySection.jsx # Blood type compatibility matrix
    │   ├── CenterDetails/        # Individual center details (CenterDetails, Header, InfoCards, Map)
    │   ├── DonationCenters/      # Blood bank directory (Page, Grid, Search, Stats, CTA)
    │   ├── DonationRequests/     # Paginated public requests list (Page, RequestCard)
    │   ├── EditRequest/          # Request editing form (EditRequest, EditRequestForm)
    │   ├── FAQ/                  # Accordion FAQ (FAQPage, FAQAccordion, FAQContactBox)
    │   ├── ForgetPassword.jsx    # Password reset view with email prefill
    │   ├── Home.jsx              # Landing page root
    │   ├── Login/                # Auth form + Demo auto-fill (Login, LoginForm, DemoLoginBox)
    │   ├── PaymentCancelled/     # Stripe payment cancellation view
    │   ├── PaymentSuccess/       # Stripe payment success confirmation
    │   ├── Register/             # Registration + avatar upload (Register, Form, AvatarUpload)
    │   ├── Search/               # Donor search engine (Search, SearchForm, ResultsGrid)
    │   ├── ViewRequest/          # Request detail + donation modal (ViewRequest, DetailsCard, DonateModal)
    │   └── utils/                # Shared page helpers (centerHelpers.js, faqData.js)
    ├── Provider/
    │   └── AuthProvider.jsx      # Global auth state + role fetching
    ├── RootLayout/               # App shell (Navbar, Footer, theme init)
    ├── Routes/
    │   ├── PrivateRoute.jsx      # Auth guard for protected routes
    │   └── router.jsx            # React Router v7 route config
    ├── styles/
    │   ├── designSystem.js       # Color, spacing, typography, layout tokens
    │   └── globals.css           # Base CSS variables and design tokens
    ├── index.css                 # Tailwind CSS v4 & DaisyUI v5 styling entry point
    └── main.jsx                  # React DOM root mounting & RouterProvider
```

> Modular structure where major features have isolated UI subcomponents and dedicated utility helpers.

---

## Authentication & Security

### Authentication Flow

```
[Client] → Firebase Auth (Email / Google SSO) → JWT Access Token
    ↓
AuthProvider fetches role from API → sets role in context
    ↓
PrivateRoute checks auth state → redirects unauthenticated users
    ↓
Role-specific dashboard and navigation rendered
```

### Security Layers

1. **Firebase Authentication** - Manages user credentials, session tokens, and Google OAuth
2. **JWT Bearer Tokens via Axios Interceptor** - `useAxiosSecure.jsx` attaches the Firebase access token to every protected API request:
   ```javascript
   config.headers.Authorization = `Bearer ${user?.accessToken}`;
   ```
3. **Role-Based Access Control (RBAC)** - Dashboard menus and routes dynamically render based on `donor`, `volunteer`, or `admin` role from context
4. **Demo User Write Guard** - `useDemoRestriction.js` intercepts all write actions for demo accounts and shows a SweetAlert2 block modal:
   ```javascript
   if (isDemoUser(user.email)) {
     Swal.fire({ title: "Demo User Restriction!", icon: "warning", ... });
     return true; // block the action
   }
   ```
5. **Environment Variable Isolation** - All sensitive keys are stored in `.env.local` and never committed to version control

---

## Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "donor",         // donor | volunteer | admin
  "status": "active",      // active | blocked
  "district": "Dhaka",
  "upazila": "Dhanmondi",
  "bloodGroup": "O+",
  "imageUrl": "https://i.ibb.co/avatar.jpg"
}
```

### Requests Collection
```json
{
  "_id": "ObjectId",
  "requesterName": "Jane Doe",
  "requesterEmail": "jane@example.com",
  "recipientName": "John Connor",
  "recipientDistrict": "Dhaka",
  "recipientUpazila": "Mirpur",
  "hospitalName": "Dhaka Medical College Hospital",
  "fullAddress": "Zahir Raihan Rd, Dhaka",
  "bloodGroup": "A+",
  "donationDate": "2026-06-15",
  "donationTime": "10:30",
  "requestMessage": "Urgent donor needed for cardiac surgery.",
  "mobile": "017XXXXXXXX",
  "donation_status": "pending",  // pending | inprogress | done | canceled
  "donorName": "John Doe",
  "donorEmail": "donor@example.com"
}
```

### Payments Collection
```json
{
  "_id": "ObjectId",
  "donorName": "Sarah Lee",
  "donorEmail": "sarah@example.com",
  "amount": 50.00,
  "paidAt": "2026-05-24T18:23:26Z",
  "transactionId": "pi_3MtwMQ2eZvKYlo2C1OBxxxxx"
}
```

---

## Performance & Responsive Design

### Performance Optimizations
- **Static Geographic Data Offloading**: `district.json` (12KB) and `upazila.json` (67KB) are served from the `public/` directory, eliminating redundant API calls for static reference data
- **Skeleton Loaders**: `SkeletonLoader.jsx` renders animated card placeholders across all data-loading views to reduce perceived latency and prevent layout shifts
- **Centralized Axios Instances**: Reusable `useAxios` and `useAxiosSecure` hooks prevent redundant client configurations and manage connection pooling
- **Server-Side Aggregation**: The `/public-stats` endpoint uses MongoDB aggregate pipelines, keeping response payloads minimal even at scale

### Responsive Design
- **Mobile-First Grid System**: Tailwind responsive breakpoints (sm / md / lg / xl) with fluid card grids
- **Collapsible Sidebar**: Dashboard aside collapses to icon-only mode on smaller screens
- **DaisyUI v5 Theme Engine**: Light/dark toggle persisted in localStorage and synchronized across components via custom `themeChange` events
- **Accessibility (a11y)**: Semantic HTML, labeled form controls, visible focus states, and WCAG AA color contrast ratios
