myway-restaurant/
│
├── app/                          ← Next.js App Router
│   ├── (site)/                   ← Public-facing routes (layout group)
│   │   ├── layout.tsx            ← Root layout (Navbar + Footer)
│   │   ├── page.tsx              ← Home
│   │   ├── menu/
│   │   │   └── page.tsx
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   ├── reservations/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── (admin)/                  ← Protected admin panel
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── menu/
│   │   ├── reservations/
│   │   ├── gallery/
│   │   └── reviews/
│   │
│   └── api/                      ← API Routes
│       ├── reservations/
│       │   ├── route.ts          ← POST: create reservation
│       │   └── [id]/route.ts     ← GET/PATCH: single reservation
│       ├── menu/
│       │   └── route.ts          ← GET: all menu items
│       ├── reviews/
│       │   └── route.ts          ← GET/POST: testimonials
│       ├── gallery/
│       │   └── route.ts
│       ├── newsletter/
│       │   └── route.ts
│       └── contact/
│           └── route.ts
│
├── components/
│   ├── ui/                       ← Primitives (Button, Input, Modal…)
        ├── GoldDivider.tsx
        ├── SectionLabel.tsx 
        └── WhatsappButton.tsx
│   ├── layout/                   ← Navbar, Footer, MobileMenu
│   ├── sections/                 ← Page sections (Hero, Featured, CTA…)
│   └── forms/                    ← ReservationForm, ContactForm, Newsletter
│
├── lib/
│   ├── db.ts                     ← Prisma client singleton
│   ├── utils.ts                  ← cn(), formatDate(), etc.
│   ├── validations.ts            ← Zod schemas
│   └── constants.ts              ← Menu data fallback, hours, contacts
│
├── public/
│   └── images/                   ← Static assets (logo, og-image)
│
├── types/
    └── index.ts                  ← Global TypeScript types