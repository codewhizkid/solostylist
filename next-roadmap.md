# 🔮 Simply Independent – Roadmap

This roadmap outlines the next key development phases for building out the Simply Independent platform.

---

## 🧭 Phase 1: Dashboard Logic (Stylist Admin Panel)

**Goals:** Build the day-to-day interface for stylists to manage their business.

### Features
- [ ] Appointment calendar (Day/Week view)
- [ ] Create/edit/delete appointments
- [ ] Block time / add breaks
- [ ] Appointment detail view
- [ ] Status tags (pending, confirmed, canceled, completed)
- [ ] Today’s overview (revenue, # of clients, upcoming)

### Backend Endpoints
- `GET /appointments`
- `POST /appointments`
- `PUT /appointments/:id`
- `DELETE /appointments/:id`

---

## 🌱 Phase 2: Client Flow

**Goals:** Allow clients to book, view, reschedule, or cancel appointments.

### Booking Page Flow
- [ ] Select service → date/time → fill info
- [ ] Confirmation screen + email
- [ ] Reschedule/cancel link in email

### Client Profile Logic
- [ ] Client info + intake form
- [ ] View past appointments in dashboard

### Backend Endpoints
- `POST /book`
- `GET /availability`
- `GET /services`
- `PATCH /appointments/:id`
- `DELETE /appointments/:id`

---

## 🔌 Phase 3: Add-On Architecture

**Goals:** Enable optional features per stylist using modular flags.

### Features
- [ ] Google Calendar sync
- [ ] SMS reminders
- [ ] Stripe deposits
- [ ] Custom domain mapping
- [ ] AI chatbot assistant

### Structure
- Settings stored in `settings` table
- UI toggles to enable/disable
- Backend checks flags before triggering features

---

## 🌐 Phase 4: API Routes & Dev Setup

**Goals:** Structure API for frontend/backend teams or future contributors.

### API Structure
```
/api
  /auth
  /stylists
  /clients
  /appointments
  /services
  /availability
  /settings
```

### Dev Considerations
- Auth middleware (JWT/Supabase)
- Role protection (future team support)
- Swagger/Postman docs
- Unit tests for booking & calendar logic

---

## 🗓️ Suggested Timeline

| Phase | Time Estimate | Priority |
|-------|---------------|----------|
| Dashboard Logic | 2–3 weeks | ⭐️⭐️⭐️ |
| Client Flow | 2–3 weeks | ⭐️⭐️⭐️ |
| Add-Ons | 1–2 weeks | ⭐️⭐️ |
| API + Docs | 1 week | ⭐️⭐️ |

---

_Stay focused, keep it beautiful, and build it for the people who need it most._ 💇‍♂️💻
