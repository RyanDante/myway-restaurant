import { FALLBACK_MENU } from "./fallback-menu";

export const RESTAURANT_INFO = {
  name: "MyWay",
  tagline: "A Symphony of Luxury and Taste",
  address: "Molyko, UB Junction, Lacave Building, Buea, Cameroon",
  phone: "+237 6 51 37 18 00",
  email: "emperordante123@gmail.com",
  whatsapp: "https://wa.me/237651371800",
  hours: {
    weekdays: "12:00 PM - 11:00 PM",
    weekends: "12:00 PM - 12:00 AM",
  },
  socials: {
    instagram: "https://instagram.com/myway_restaurant",
    facebook: "https://facebook.com/myway_restaurant",
    tiktok: "https://www.tiktok.com/@myway.restaurant",
    tripadvisor: "https://tripadvisor.com/myway_restaurant",
  },
};

export const RESERVATION_SLOTS = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

export interface MenuItem {
  id: string;
  nameEn: string;
  nameFr: string;
  descriptionEn: string;
  descriptionFr: string;
  price: number;
  category: string;
  image?: string; // Cloudinary public ID
  dietary?: string[];
  featured?: boolean;
}

export { FALLBACK_MENU };
