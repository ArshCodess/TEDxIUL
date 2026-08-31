# TEDxIntegralUniversity — Frontend (Next.js)

Official frontend repository for the TEDxIntegralUniversity event website.

This repository contains **frontend-only** code (Next.js + React).  
The backend (API, database, payment gateway, admin dashboard) is developed in a **separate forked repository** maintained by the backend team. The backend repository syncs UI updates from this repository and deploys the full-stack application to the official domain.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or pnpm
- Git

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

### Start production server locally

```bash
npm run start
```

---

## 🏗 Architecture

- **Frontend**: Next.js 15 (App Router), React 19, CSS.
- **Backend**: Separate repository (forked from this one) that:
  - Syncs frontend updates from this repository.
  - Implements API routes, database, authentication, payment gateway, and admin dashboard.
  - Deploys the full-stack application to the official domain.

### Repository relationship

```text
[Frontend Repo]  --(sync)-->  [Backend Fork Repo]  --(deploy)-->  [Official Domain]
```

The backend team is responsible for:
- Keeping their fork in sync with this repository.
- Integrating backend services.
- Managing environment variables and secrets.
- Deploying the production website.

---

## 📁 Project Structure

```text
TEDxIUL/
├── 📦 PROJECT ROOT FILES
│   ├── package.json                    │ npm dependencies: Next.js 15, React 19, Embla Carousel react-hot-toast
│   ├── package-lock.json               │ Locked versions for reproducible installs
│   ├── next.config.mjs                 │ Next.js configuration (currently empty as it's not in use)
│   ├── netlify.toml                    │ Build command "npm run build" → publish ".next"
│   ├── README.md                       │ ⚠️ Old Vite
│   ├── CHANGELOG.md                    │ Empty placeholder for version history
│   ├── .gitignore                      │ Excludes node_modules, .next, .vscode, .DS_Store
│   ├── .git/                           │ Git repository metadata
│   └── .vscode/                        │ VS Code workspace settings
│
├── 🌐 DEPLOYMENT & BUILD OUTPUTS (ignore in development)
│   ├── .next/                          │ Next.js production build output (gitignored)
│   ├── dist/                           │ Legacy Vite output (gitignored)
│   ├── out.html                        │ Generated HTML snapshot
│   ├── backup-rebase-conflicts.patch   │ Git conflict resolution reference
│   └── node_modules/                   │ Installed dependencies
│
├── 📄 LEGACY PROTOTYPE FILES (reference only, not active)
│   ├── tedx-integral_1.html            │ Original HTML5 prototype with canvas, GSAP animations
│   ├── assets/                         │ Legacy CSS, JS, images from prototype
│   │   ├── css/styles.css
│   │   ├── js/main.js
│   │   └── images/
│   └── RegistrationPage.md             │ Old Vite registration page component reference
│
├── 🎯 PUBLIC ASSETS (served at /)
│   └── public/
│       ├── assets/images/              │ Legacy image folder
│       └── _redirects                  │ Netlify redirect configuration
│
└── 💻 ACTIVE APPLICATION SOURCE (src/)
    ├── 🎨 GLOBAL STYLING
    │   └── index.css                   │ Design tokens (--red, --white, --black, --gray, etc.)
    │                                   │ Base element styles, animations, responsive breakpoints
    │                                   │ Z-index hierarchy, section-level defaults
    │
    ├── 🔀 NEXT.JS APP ROUTER (src/app)
    │   ├── layout.jsx                  │ Root layout: global navbar, metadata, font imports
    │   ├── page.jsx                    │ Homepage route (/)
    │   ├── about/                      │ About section routes
    │   │   ├── tedx/page.jsx           │ /about/tedx → AboutTEDxPage
    │   │   ├── tedxiul/page.jsx        │ /about/tedxiul → AboutTEDxIULPage
    │   │   └── iul/page.jsx            │ /about/iul → AboutIULPage (Integral University)
    │   ├── contact/page.jsx            │ /contact → ContactPage
    │   ├── faq/page.jsx                │ /faq → FAQPage (standalone FAQ with back button)
    │   ├── register/                   │ Registration routes
    │   │   ├── page.jsx                │ /register → RegisterPage (pass selection + carousel)
    │   │   └── form/page.jsx           │ /register/form → RegistrationForm (collect attendee info)
    │   ├── schedule/page.jsx           │ /schedule → SchedulePage (full event timeline)
    │   ├── speakers/page.jsx           │ /speakers → SpeakersPage (TBA placeholder cards)
    │   ├── sponsors/page.jsx           │ /sponsors → SponsorsPage (Integral Univ + TBA boxes)
    │   ├── team/page.jsx               │ /team → TeamPage (leadership, organizers, core committee)
    │   └── venue/page.jsx              │ /venue → VenuePage (map, travel modes, local tips)
    │
    ├── 🧩 REUSABLE COMPONENTS (src/components)
    │   │
    │   ├── Navigation & Layout
    │   │   ├── Navbar.jsx / Navbar.css            │ Fixed top nav with About dropdown, mobile menu
    │   │   ├── Footer.jsx / Footer.css            │ TEDx license text, footer links
    │   │   └── Theme.jsx / Theme.css              │ TODO: Empty placeholder section
    │   │
    │   ├── Hero & Branding
    │   │   ├── Hero.jsx / Hero.css                │ Main hero with TEDx + IUL logos, theme, CTA
    │   │   └── Tickets.jsx / Tickets.css          │ Ticket CTA section (text-based, not interactive)
    │   │
    │   ├── Event Information
    │   │   ├── About.jsx / About.css              │ About TEDxIntegralUniversity section
    │   │   ├── AboutTed.jsx / AboutTed.css        │ About TEDx program with external TED links
    │   │   ├── Countdown.jsx / Countdown.css      │ Live countdown to Sept 26, 2026 @ 9 AM
    │   │   ├── Schedule.jsx / Schedule.css        │ Timeline with LED progress indicator
    │   │   ├── FAQ.jsx / FAQ.css                  │ 14-item accordion, shows 4 + "View More"
    │   │   ├── Venue.jsx / Venue.css              │ Embedded Google Map + venue details panel
    │   │   ├── Contact.jsx / Contact.css          │ Contact form UI (no backend) + email/socials
    │   │   ├── Speakers.jsx / Speakers.css        │ Placeholder speaker cards ("TBA")
    │   │   └── Sponsors.jsx / Sponsors.css        │ Integral University + sponsor TBA boxes
    │
    ├── 📄 PAGE COMPOSITIONS (src/views)
    │   │   // Each view composes components into full-page layouts
    │   │
    │   ├── HomePage.jsx                │ Main homepage: Hero → Countdown → all sections → Footer
    │   ├── RegisterPage.jsx            │ Embla carousel for pass selection, magnetic button effects
    │   ├── RegistrationForm.jsx        │ Form inputs, client-side validation, success toast
    │   ├── SchedulePage.jsx            │ Schedule component + footer (standalone route)
    │   ├── SpeakersPage.jsx            │ Speakers component + footer + back link
    │   ├── SponsorsPage.jsx            │ Sponsors component + footer + back link
    │   ├── TeamPage.jsx                │ Team photos & metadata by role + stats
    │   ├── VenuePage.jsx               │ Extended venue: map, travel guides, local tips
    │   ├── ContactPage.jsx             │ Contact form + footer + back link
    │   ├── FAQPage.jsx                 │ FAQ component + footer + back link
    │   ├── AboutTEDxPage.jsx           │ About TEDx program + footer + back link
    │   ├── AboutTEDxIULPage.jsx        │ About the event + theme explanation + footer
    │   ├── AboutIULPage.jsx            │ About Integral University + campus imagery + footer
    │   ├── MotionReveal.jsx            │ Scroll animation utility component (used sparingly)
    │   ├── pages.css                   │ Shared styles for all view pages (hero, back link, grid)
    │   └── RegisterPage.css            │ Standalone register page styles (animations, ticket cards)
    │
    ├── 📊 STATIC DATA (src/data)
    │   ├── passesData.js               │ Active data source: 4 pass tiers (General, Gold, Platinum, Faculty)
    │   │                               │ Features, prices, codes, eligibility for each tier
    │   │                               │ ✓ Connected to registration form
    │   │
    │   └── eventData.js                │ Empty exports: timelineEvents[], speakers[], faqs[], tickets[]
    │
    ├── 🖼️ VISUAL ASSETS (src/assets)
    │   │   // All images imported directly into components
    │   ├── Logo & Branding
    │   ├── Hero & Backgrounds
    │   ├── Venue & Location
    │   └── Team Photography (src/assets/team-photos/)
```

---

## 🎨 Features

### Event Information
- Home, About, Venue, Schedule, Speakers, Sponsors, Team, FAQ, Contact pages.
- Responsive design for mobile, tablet, and desktop.

### Ticket Selection
- Four pass types: General, Gold, Platinum, Faculty.
- Interactive card selection with Embla Carousel.

### Registration Form
- Client-side validation.
- Collects attendee details.
- Success feedback (mock-only in frontend).

### Interactive Elements
- Countdown timer.
- FAQ accordion.
- Schedule timeline with LED progress indicator.
- Scroll animations and hover effects.

---

## ⚠️ Important Notes

### Frontend-only repository

This repository **does not include**:
- Backend API routes.
- Database connections.
- Payment gateway integration.
- Authentication or user accounts.
- Admin dashboard.
- Email/SMS notifications.

The registration form is **mock-only** in this repository. Real registration, payment, and data persistence are handled in the backend repository.

### Backend synchronization

The backend team maintains a fork of this repository. They:
- Sync UI updates from this repository.
- Add backend functionality.
- Deploy the full application.

To keep the backend fork in sync, the backend team uses:
- GitHub’s “Fetch upstream” / “Sync fork” feature.
- Or automated GitHub Actions workflows.

### Environment variables

Frontend environment variables (if any) should be prefixed with `NEXT_PUBLIC_`.  
Backend environment variables (API keys, database URLs, payment secrets) are managed in the backend repository and **must not** be committed to this repository.

---

## 🛠 Development Workflow

### For frontend developers

1. Create a feature branch from `main`.
2. Make changes and test locally.
3. Push to your branch and create a pull request.
4. After review and approval, merge into `main`.
5. The backend team will sync your changes into their fork.

### For backend developers

1. Fork this repository.
2. Add backend functionality in your fork.
3. Regularly sync your fork with this repository:
   - Via GitHub UI: “Fetch upstream” → “Update branch”.
   - Or via CLI:
     ```bash
     git remote add upstream https://github.com/GPA95/TEDxIUL.git
     git fetch upstream
     git checkout main
     git merge upstream/main
     git push origin main
     ```
4. Deploy your fork to the official domain.

---

## 📦 Dependencies

### Core

- `next` — Next.js 15 framework.
- `react` — React 19.
- `react-dom` — React DOM.

### UI and Interaction

- `embla-carousel-react` — Ticket carousel.
- `react-hot-toast` — Toast notifications.

### Development

- `eslint` — Code quality.
- `@types/react`, `@types/react-dom` — TypeScript types (optional).

---

## 🚀 Deployment

### Frontend (static)

This repository can be deployed as a static site via:
- Netlify
- Vercel
- Other static hosting services

Build command: `npm run build`  
Output directory: `.next`

### Full-stack (with backend)

The backend repository deploys the full application (frontend + backend) to the official domain.  
Frontend updates are synced from this repository to the backend fork before deployment.

---

## 📝 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [GitHub Fork Sync Documentation](https://docs.github.com/articles/syncing-a-fork)

---

## Contributors

- **[Ammaar Ahmad Khan](https://github.com/GPA95)** – Repo owner, React structure, Venue page, Mutli-device responsiveness
- **[Abdul Malik](https://github.com/abdulmalik812)** – Original frontend prototype, Home page designer
- **[Mohammad Yazdaan Wali Khan](https://github.com/yazdaanwali)** – Content (About, Theme, FAQs, Schedule, Teams)
- **[Owais Raza](https://github.com/oraza7867)** – Vite to NextJs migration, Special Effects, NextJs architecture

## 📄 License

This project is part of TEDxIntegralUniversity.  
All rights reserved.

---

## 🙏 Acknowledgments

- TED and TEDx for the platform and guidelines.
- Integral University for support and venue.
- All team members and contributors.

---