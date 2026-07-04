export const RESTAURANT_INFO = {
  name: 'MyWay',
  tagline: 'A Symphony of Luxury and Taste',
  address: 'Molyko, UB Junction, Lacave Building, Buea, Cameroon',
  phone: '+237 6 51 37 18 00',
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

/**
 * Localized Fallback Menu Items Catalog
 * 
 * NOTE FOR IMAGES:
 * The 'image' field corresponds directly to the Cloudinary asset's Public ID.
 * When you upload new food photos to Cloudinary, simply replace these string
 * values (e.g. 'fine_plating') with the public IDs of your uploaded images.
 * If you leave it empty or delete it, the card automatically falls back to your logo.
 */
export const FALLBACK_MENU: MenuItem[] = [
  // Starters & Appetizers
  {
    id: 'starter-1',
    nameEn: 'Shrimp Tempura',
    nameFr: 'Tempura de Crevettes',
    descriptionEn: 'Crispy seasoned shrimps served with home-style spicy dipping sauce.',
    descriptionFr: 'Crevettes croustillantes assaisonnées servies avec une sauce piquante maison.',
    price: 3000,
    category: 'starters',
    image: 'fine_plating',
    dietary: ['Seafood'],
    featured: true,
  },
  {
    id: 'starter-2',
    nameEn: 'Onion Rings',
    nameFr: 'Rondelles d’Oignon',
    descriptionEn: 'Crispy golden onion rings to serve as a starter or a bite on the go.',
    descriptionFr: 'Rondelles d’oignons dorées et croustillantes pour commencer ou grignoter.',
    price: 1000,
    category: 'starters',
    image: 'cocktail_mix',
  },
  // Salads
  {
    id: 'salad-1',
    nameEn: 'Vegetable Salad',
    nameFr: 'Salade de Légumes',
    descriptionEn: 'Raw seasonal vegetables tossed with vinegar, mustard dressing, and herbs.',
    descriptionFr: 'Légumes crus de saison assaisonnés de vinaigre, moutarde et fines herbes.',
    price: 2000,
    category: 'salads',
    image: 'interior_lounge',
    dietary: ['Vegetarian', 'Vegan'],
  },
  {
    id: 'salad-2',
    nameEn: 'Avocado Salad',
    nameFr: 'Salade d’Avocat',
    descriptionEn: 'Fresh avocado cubes, cherry tomatoes, cucumbers, mixed greens with vinaigrette.',
    descriptionFr: 'Avocats frais, tomates cerises, concombres, salades vertes avec vinaigrette.',
    price: 3000,
    category: 'salads',
    image: 'wine_cellar',
    dietary: ['Vegetarian', 'Gluten-Free'],
  },
  // Burgers
  {
    id: 'burger-1',
    nameEn: 'MyWay Signature Burger',
    nameFr: 'Burger Signature MyWay',
    descriptionEn: 'Flame-grilled prime beef patty, melted cheddar, caramelised onions, signature sauce.',
    descriptionFr: 'Steak de bœuf grillé, cheddar fondu, oignons caramélisés, sauce signature.',
    price: 4500,
    category: 'burgers',
    image: 'steak',
    featured: true,
  },
  // Pizzas
  {
    id: 'pizza-1',
    nameEn: 'Margherita Pizza',
    nameFr: 'Pizza Margherita',
    descriptionEn: 'Italian tomato base, fresh mozzarella cheese, organic basil leaves, olive oil drizzle.',
    descriptionFr: 'Base tomate italienne, mozzarella fraîche, feuilles de basilic bio, filet d’huile d’olive.',
    price: 4000,
    category: 'pizzas',
    image: 'interior3',
    dietary: ['Vegetarian'],
  },
  // Pasta & Rice
  {
    id: 'pasta-1',
    nameEn: 'Seafood Alfredo',
    nameFr: 'Alfredo aux Fruits de Mer',
    descriptionEn: 'Creamy fettuccine Alfredo tossed with sautéed prawns and scallops.',
    descriptionFr: 'Fettuccine Alfredo crémeux mélangé avec des crevettes et des pétoncles sautés.',
    price: 5500,
    category: 'pasta_rice',
    image: 'salmon',
    dietary: ['Seafood'],
  },
  // Chicken Dishes
  {
    id: 'chicken-1',
    nameEn: 'Crispy Fried Chicken',
    nameFr: 'Poulet Frit Croustillant',
    descriptionEn: 'Deep-fried golden chicken thighs marinated in house buttermilk spices.',
    descriptionFr: 'Cuisses de poulet dorées frites, marinées dans notre lait de beurre épicé.',
    price: 3500,
    category: 'chicken',
    image: 'chef',
  },
  // Beef, Pork & Lamb
  {
    id: 'beef-1',
    nameEn: 'Wagyu Ribeye Steak',
    nameFr: 'Steak de Wagyu Ribeye',
    descriptionEn: '10oz Japanese Wagyu served with truffle salt, garlic butter, and red wine reduction.',
    descriptionFr: 'Steak Wagyu de 300g servi avec sel de truffe, beurre d’ail et réduction de vin rouge.',
    price: 15000,
    category: 'beef_lamb',
    image: 'steak',
    featured: true,
  },
  // Seafood
  {
    id: 'seafood-1',
    nameEn: 'Grilled Chilean Seabass',
    nameFr: 'Bar du Chili Grillé',
    descriptionEn: 'Herb-crusted Chilean seabass, baby spinach, citrus-butter emulsion.',
    descriptionFr: 'Bar du Chili en croûte d’herbes, pousses d’épinards, émulsion citron-beurre.',
    price: 8000,
    category: 'seafood',
    image: 'salmon',
    dietary: ['Seafood', 'Gluten-Free'],
  },
  // Local Specialities
  {
    id: 'local-1',
    nameEn: 'Cameroonian Ndole with Fish',
    nameFr: 'Ndolè Camerounais au Poisson',
    descriptionEn: 'Traditional bitterleaf dish cooked with crushed peanuts, spices, served with fried fish.',
    descriptionFr: 'Plat traditionnel de feuilles amères aux arachides écrasées, servi avec du poisson frit.',
    price: 5000,
    category: 'local',
    image: 'masterchef',
    dietary: ['Cameroonian Classic'],
    featured: true,
  },
  // Desserts
  {
    id: 'dessert-1',
    nameEn: 'Golden Chocolate Sphere',
    nameFr: 'Sphère de Chocolat Dorée',
    descriptionEn: 'Valrhona dark chocolate dome, warm salted caramel, edible gold leaf flake.',
    descriptionFr: 'Dôme de chocolat noir Valrhona, caramel au beurre salé chaud, feuille d’or comestible.',
    price: 2500,
    category: 'desserts',
    image: 'desert1',
  },
  // Ice Cream
  {
    id: 'ice-cream-1',
    nameEn: 'Vanilla Bean Gelato',
    nameFr: 'Gelato à la Vanille de Madagascar',
    descriptionEn: 'Rich, creamy Madagascar vanilla bean gelato served with a gold-dusted waffle crisp.',
    descriptionFr: 'Gelato crémeux à la gousse de vanille de Madagascar, servi avec une gaufrette dorée.',
    price: 2000,
    category: 'ice_cream',
    image: 'desert2',
    dietary: ['Vegetarian'],
  },
  // Natural Fruit Juice
  {
    id: 'fruit-juice-1',
    nameEn: 'Fresh Tropical Elixir',
    nameFr: 'Élixir Tropical Frais',
    descriptionEn: 'Cold-pressed local pineapple, passionfruit, and mango blend with fresh mint juice.',
    descriptionFr: 'Mélange d’ananas local pressé à froid, fruits de la passion et mangue avec jus de menthe.',
    price: 1500,
    category: 'fruit_juice',
    image: 'cocktail_mix',
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
  },
  // Cocktails & Shakes
  {
    id: 'cocktails-shakes-1',
    nameEn: 'Buea Sunset Mojito (Alcoholic)',
    nameFr: 'Mojito Coucher de Soleil de Buea (Alcoolisé)',
    descriptionEn: 'Wild rum, fresh mint, local brown sugar, sparkling soda, and passion fruit splash.',
    descriptionFr: 'Rhum sauvage, menthe fraîche, sucre roux local, soda pétillant, et fruit de la passion.',
    price: 3500,
    category: 'cocktails_shakes',
    image: 'twin_cocktail',
  },
  {
    id: 'cocktails-shakes-2',
    nameEn: 'Virgin Coconut Colada (Mocktail)',
    nameFr: 'Colada Vierge à la Noix de Coco (Mocktail)',
    descriptionEn: 'Creamy coconut milk, pineapple juice, double blended with crushed ice and cherry.',
    descriptionFr: 'Lait de coco crémeux, jus d’ananas, doublement mixé avec de la glace pilée et cerise.',
    price: 2500,
    category: 'cocktails_shakes',
    image: 'cocktail_mix',
    dietary: ['Vegetarian'],
  },
  // Wines & Champagne
  {
    id: 'wines-champagne-1',
    nameEn: 'Dom Pérignon Vintage Champagne',
    nameFr: 'Champagne Dom Pérignon Millésimé',
    descriptionEn: 'Prestigious dry French champagne with toast, apricot, and rich brioche notes.',
    descriptionFr: 'Prestigieux champagne sec français aux notes de pain grillé, abricot et brioche.',
    price: 120000,
    category: 'wines_champagne',
    image: 'wine_cellar',
  },
  // Non-Alcoholic Beverages
  {
    id: 'non-alcoholic-1',
    nameEn: 'San Pellegrino Sparkling Water',
    nameFr: 'Eau Pétillante San Pellegrino',
    descriptionEn: 'Premium sparkling natural mineral water imported from Italy.',
    descriptionFr: 'Eau minérale naturelle pétillante haut de gamme importée d’Italie.',
    price: 1500,
    category: 'non_alcoholic_beverages',
    image: 'cocktail_mix',
  },
  // Beers
  {
    id: 'beers-1',
    nameEn: 'Guinness Foreign Extra Stout',
    nameFr: 'Guinness Foreign Extra Stout',
    descriptionEn: 'Traditional dark, rich stout beer brewed with high hops for a bold local taste.',
    descriptionFr: 'Bière stout noire riche et traditionnelle, brassée avec beaucoup de houblon.',
    price: 1500,
    category: 'beers',
    image: 'wine_cellar',
  },
  // Spirits & Liqueurs
  {
    id: 'spirits-1',
    nameEn: 'Hennessy V.S.O.P Cognac',
    nameFr: 'Cognac Hennessy V.S.O.P',
    descriptionEn: 'A balanced, elegant blend of cognac spirits, aged in French oak barrels.',
    descriptionFr: 'Un mélange équilibré et élégant d’eaux-de-vie de cognac, vieilli en fûts de chêne.',
    price: 80000,
    category: 'spirits_liqueurs',
    image: 'wine_cellar',
  },
  // Drinks & Cocktails
  {
    id: 'drink-1',
    nameEn: 'Signature Twin Cocktail',
    nameFr: 'Cocktail Twin Signature',
    descriptionEn: 'Refreshing blend of wild berries, lime, fresh mint leaves, and white rum.',
    descriptionFr: 'Mélange rafraîchissant de baies sauvages, citron vert, menthe et rhum blanc.',
    price: 2500,
    category: 'drinks',
    image: 'twin_cocktail',
  },
];
