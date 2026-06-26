LOCAL DEV
  → next dev, Prisma + local PostgreSQL or Neon dev branch

STAGING
  → Vercel Preview Deployments (auto per PR)
  → Neon database branch per preview

PRODUCTION
  → Vercel (automatic, main branch)
  → Neon PostgreSQL (production branch)
  → Cloudinary (image CDN)
  → Resend (email delivery)
  → Environment variables in Vercel dashboard

DOMAIN
  → mywayrestaurantbuea.com (suggested)
  → or myway-buea.com