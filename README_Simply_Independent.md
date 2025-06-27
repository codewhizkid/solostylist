# Simply Independent – Platform Guidebook

## Table of Contents
- [Chapter 1: Vision & Brand Promise](#chapter-1-vision--brand-promise)
- [Chapter 2: Target User Personas](#chapter-2-target-user-personas)
- [Chapter 3: Onboarding Flow (Brand Builder UX)](#chapter-3-onboarding-flow-brand-builder-ux)
- [Chapter 4: Technical Stack & Justification](#chapter-4-technical-stack--justification)

## Chapter 1: Vision & Brand Promise

"Build your brand. Book your clients. Be Simply Independent."

Simply Independent is an all-in-one booking and branding platform designed for independent stylists. It combines powerful appointment management tools with a personalized website creation flow, enabling stylists to become their own brand — with zero technical overhead.

The Problem It Solves:
- Stylists waste hours managing scattered tools.
- DIY website builders are overwhelming.
- Booking platforms feel generic, not personal.

Simply Independent provides:
- A beautiful client-facing booking page
- A stylist dashboard to manage bookings, clients, and services
- Branding tools (logo, colors, font, imagery) baked into onboarding

Our Voice: Modern. Confident. Empowering. Simple.

## Chapter 2: Target User Personas

🎯 Independent Stylist (Start-Up)
- Just left a commission salon
- Wants their own booking system
- Looking to look professional fast

🎯 Established Stylist (Freelancer)
- Has a loyal client base
- Needs a branded system
- Values simplicity and style

🎯 Mobile Barber or Colorist
- Works on the go
- Needs a responsive calendar
- Values clean booking over fancy sites

## Chapter 3: Onboarding Flow (Brand Builder UX)

Goal: Let stylists express their brand in under 10 minutes while we generate their backend automatically.

Step-by-Step Flow:
1. Welcome Page – Brief intro and call to action
2. Logo Upload + Brand Name – Upload logo, enter name and tagline
3. Pick Font & Colors – Select curated font + 3-color palette
4. About You – Short bio and headshot
5. Add Your Services – Name, price, time, description
6. Set Your Availability – Weekly hours, break times
7. Social Links – IG, FB, website
8. Auto-Generated Account – Dashboard + booking page ready to go

## Chapter 4: Technical Stack & Justification

Frontend:
- React.js (modern UI)
- Tailwind CSS (responsive themes)
- React Router (multi-step flow)

Backend:
- Node.js w/ Express (REST API)
- Supabase (PostgreSQL + auth)
- Prisma ORM

Database Schema:
- stylists, services, clients, appointments, availability, settings

File Storage:
- Supabase Storage

Deployment:
- Vercel/Netlify for frontend
- Supabase backend
- Stripe for payments (Phase 2)

Next Steps:
- Dashboard logic
- Client flow
- Add-on architecture
- API routes

## 🔮 Roadmap
See the full development roadmap [here](docs/next-roadmap.md).

Phase
What the stylist sees & does
What the platform does under the hood
1. Welcome
• Lands on a sleek “Build your brand. Book your clients” page.• Clicks Get Started.
Front-end router sends them to the first onboarding route (/).
2. Logo Upload + Brand Name
• Drags in a logo (or skips for now).• Types a brand name and optional tagline.
Stores logo file → Supabase Storage.Saves brandName, tagline, logoUrl to the in-memory StylistContext.
3. Pick Font & Colors
• Chooses a curated font (e.g. Modern Sans, Classic Serif, Elegant Script).• Clicks a color palette card (Indigo & Slate, Mint & Charcoal, etc.).
Updates font and colors in StylistContext so later pages can preview the brand style.
4. About You
• Uploads a head-shot.• Writes a short bio.
Saves bio and headshotUrl to context.
5. Add Services
• Fills a dynamic list (e.g., “Haircut – $50 – 45 min”).• Adds or removes rows until happy.
Maintains a local services[] array → persists to StylistContext.
6. Set Availability
• Sees a weekly grid (Mon–Sun).• Click-drags to mark working hours; adds breaks.
Builds an availability[] structure (weekday, start, end).
7. Social Links
• Drops in Instagram, Facebook, website URLs.
Adds socials{} to context.
8. Finish / Auto-Generate Account
• Hits Finish & Go to Dashboard.• Brief loader (“Creating your studio…”)
One POST → /api/stylistsjson  { brandName, font, colors, bio, services, availability, socials }Backend (Prisma) creates:• stylist row (core profile)• service rows (bulk create)• availability rows
9. First-Time Dashboard
• Redirected to /dashboard.• Sees a left nav and today’s empty calendar.• Brand logo, colors, and font already applied.
Dashboard fetches fresh data via:GET /api/appointments (none yet)GET /api/servicesGET /api/availability
10. Daily Usage
• Adds walk-in appointments directly on the calendar.• Clients who visit the public booking URL see the stylist’s brand and can self-schedule.• Stylist checks “Clients” tab to view history and notes.
Calendar CRUD hits /api/appointments.Public site validates slots against availability & existing bookings.Email (and later SMS) confirmations fire via server-side triggers.

