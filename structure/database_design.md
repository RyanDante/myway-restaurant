// prisma/schema.prisma

model Reservation {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String
  date        DateTime
  time        String
  guests      Int
  occasion    String?  // birthday, anniversary, business…
  notes       String?
  status      ReservationStatus @default(PENDING)
  createdAt   DateTime @default(now())
}

enum ReservationStatus {
  PENDING
  CONFIRMED
  CANCELLED
}

model MenuItem {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  category    MenuCategory
  imageUrl    String?
  available   Boolean  @default(true)
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
}

enum MenuCategory {
  PIZZA
  LOCAL
  INTERNATIONAL
  DESSERTS
  DRINKS
}

model Testimonial {
  id          String   @id @default(cuid())
  name        String
  review      String
  rating      Int      // 1–5
  approved    Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model GalleryItem {
  id          String   @id @default(cuid())
  imageUrl    String
  caption     String?
  category    GalleryCategory
  createdAt   DateTime @default(now())
}

enum GalleryCategory {
  FOOD
  AMBIANCE
  EVENTS
  DRINKS
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}