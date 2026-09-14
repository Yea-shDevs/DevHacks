# SOLVO — Work Without Barriers

An interactive MVP for a Ghaziabad / Delhi NCR work platform connecting customers, workers, and admins through four access paths: smartphone/web, voice, basic-phone IVR/SMS, and assisted onboarding.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
solvo-app/
├─ index.html
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
└─ src/
   ├─ main.jsx      # React entry point
   ├─ index.css     # Tailwind directives
   └─ App.jsx       # The entire SOLVO app (landing, customer, worker,
                     # admin, IVR/SMS/voice access demo, demo journey)
```

## What's inside

- **Landing page** — hero, service categories, how-it-works, access methods, trust badges
- **Customer flow** — dashboard, job creation (category → work type → description → locality → pricing), worker matching, booking tracking, ratings
- **Worker app** — high-contrast, large-tap-target mobile UI, availability toggle, accept/decline job cards, earnings, work identity/reputation, voice assistant, EN/HI/Hinglish switching
- **Admin dashboard** — platform stats, worker management, job monitoring, local partner management
- **SOLVO Access** — simulated IVR call and SMS thread for basic-phone workers
- **Demo Journey** — a guided end-to-end walkthrough (Priya Sharma books an electrician; Rahul Kumar accepts and completes the job)

All screens share one in-memory job list, so actions in one role's view (e.g. a worker accepting a job) are reflected in the others.

## Notes

- No backend — state lives in React (`useState`) for this MVP. Swap in a real API/database to persist beyond a browser session.
- Voice and IVR/SMS interactions are simulated (scripted responses), not connected to real speech or telephony services.
- Icons via `lucide-react`; styling via Tailwind CSS utility classes only (no custom plugins).
