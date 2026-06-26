Method          |          Endpoint            |         What it does
GET             |       /api/menu              |    Fetch all menu items, filterable by category
GET             |       /api/menu/featured     |    Fetch featured dishes for homepage
POST            |       /api/reservations      |    Create new reservation + send email
GET             |       /api/reservations      |    Admin: list all reservations
PATCH           |       /api/reservations/[id] |    Admin: confirm or cancel
GET             |       /api/reviews           |    Get approved testimonials
POST            |       /api/reviews           |    Submit a new review (pending approval)
GET             |       /api/gallery           |    Get gallery images by category
POST            |       /api/newsletter        |    Subscribe an email
POST            |       /api/contact           |    Send contact form → email

All POST routes are validated with Zod before hitting the database. All admin routes are protected by middleware (JWT or NextAuth session check).