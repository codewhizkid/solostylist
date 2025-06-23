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
- Node.js w/ Express OR Python Flask (REST API)
- Supabase (PostgreSQL + auth)
- Prisma ORM (if Node.js)

Database Schema:
- stylists, services, clients, appointments, availability, settings

File Storage:
- Supabase or Cloudinary

Deployment:
- Vercel/Netlify for frontend
- Supabase backend
- Stripe for payments (Phase 2)

Next Steps:
- Dashboard logic
- Client flow
- Add-on architecture
- API routes

