export const RESTAURANT_INFO = {
  name: 'MyWay',
  tagline: 'A Symphony of Luxury and Taste',
  address: 'Molyko, UB Junction, Lacave Building, Buea, Cameroon',
  phone: '+237 6 51 37 18 00',
  // email: 'contact@myway-restaurant.com',
  email: 'emperordante123@gmail.com',
  whatsapp: 'https://wa.me/237651371800',
  hours: {
    weekdays: '12:00 PM - 11:00 PM',
    weekends: '12:00 PM - 12:00 AM',
  },
  socials: {
    instagram: 'https://instagram.com/myway_restaurant',
    facebook: 'https://facebook.com/myway_restaurant',
    tiktok: 'https://www.tiktok.com/@myway.restaurant',
    tripadvisor: 'https://tripadvisor.com/myway_restaurant',
  },
};

export const RESERVATION_SLOTS = [
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'drinks' | 'wines';
  dietary?: string[];
  featured?: boolean;
}

export const FALLBACK_MENU: MenuItem[] = [
  // Starters
  {
    id: 'starter-1',
    name: 'Beluga Caviar',
    description: 'Traditional service with blinis, chopped egg yolks, shallots, and crème fraîche.',
    price: 180,
    category: 'starters',
    dietary: ['Gluten-Free Available'],
    featured: true,
  },
  {
    id: 'starter-2',
    name: 'Truffle Butter Scallops',
    description: 'Pan-seared Hokkaido scallops with white truffle butter, parsnip purée, and microgreens.',
    price: 42,
    category: 'starters',
    dietary: ['Gluten-Free'],
    featured: true,
  },
  // Mains
  {
    id: 'main-1',
    name: 'Wagyu Ribeye A5',
    description: '10oz Japanese A5 Wagyu served with roasted garlic, truffle salt, and red wine reduction.',
    price: 240,
    category: 'mains',
    featured: true,
  },
  {
    id: 'main-2',
    name: 'Glazed Chilean Seabass',
    description: 'Pan-roasted seabass with ginger-soy glaze, baby bok choy, and shiitake broth.',
    price: 65,
    category: 'mains',
    dietary: ['Gluten-Free'],
  },
  // Desserts
  {
    id: 'dessert-1',
    name: 'Golden Chocolate Sphere',
    description: 'Valrhona dark chocolate sphere, warm caramel pour-over, gold leaf decoration.',
    price: 28,
    category: 'desserts',
    featured: true,
  },
  // Wines & Drinks
  {
    id: 'wine-1',
    name: 'Dom Pérignon Vintage',
    description: 'Exquisite French champagne with notes of stone fruit and toasted brioche.',
    price: 450,
    category: 'wines',
  },
];
