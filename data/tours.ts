// Mock tour data for Travel & Tours website
// 15 tours distributed across 4 regions

import { Tour } from "@/types/tour";

export const tours: Tour[] = [
  // EUROPE (4 tours)
  {
    id: "1",
    slug: "paris-adventure",
    name: "Paris Adventure",
    country: "France",
    region: "Europe",
    price: 1299,
    currency: "USD",
    duration: { days: 7, nights: 6 },
    description:
      "Explore the enchanting City of Light with visits to iconic landmarks including the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Experience authentic French cuisine and culture in the heart of Europe.",
    extendedDescription:
      "Day 1: Arrival in Paris and welcome dinner at a traditional bistro. Day 2: Eiffel Tower guided tour and Seine River cruise. Day 3: Louvre Museum skip-the-line access and Champs-Élysées shopping. Day 4: Full-day Versailles Palace excursion. Day 5: Montmartre walking tour and Sacré-Cœur Basilica. Day 6: Latin Quarter exploration and free time. Day 7: Departure with breakfast included.",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=600&fit=crop",
    ],
    featured: true,
    highlights: [
      "Eiffel Tower guided tour with summit access",
      "Louvre Museum skip-the-line tickets",
      "Seine River dinner cruise",
      "Versailles Palace day trip",
      "Professional local guide",
    ],
  },
  {
    id: "2",
    slug: "italian-romance",
    name: "Italian Romance",
    country: "Italy",
    region: "Europe",
    price: 1499,
    currency: "USD",
    duration: { days: 10, nights: 9 },
    description:
      "Journey through Italy's most romantic cities: Venice, Florence, and Rome. Experience Renaissance art, authentic Italian cuisine, and breathtaking architecture on this unforgettable tour.",
    extendedDescription:
      "Explore Venice's Grand Canal, Florence's Uffizi Gallery, and Rome's Colosseum. Enjoy gondola rides, wine tasting in Tuscany, and authentic pasta-making classes. This comprehensive tour covers Italy's cultural highlights with expert guides.",
    images: [
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    ],
    featured: true,
    highlights: [
      "Venice gondola ride",
      "Florence Uffizi Gallery tour",
      "Rome Colosseum access",
      "Tuscany wine tasting",
      "Cooking class included",
    ],
  },
  {
    id: "3",
    slug: "greek-islands-escape",
    name: "Greek Islands Escape",
    country: "Greece",
    region: "Europe",
    price: 1399,
    currency: "USD",
    duration: { days: 8, nights: 7 },
    description:
      "Discover the stunning beauty of Santorini and Mykonos. White-washed villages, crystal-clear waters, and unforgettable sunsets await you in this Mediterranean paradise.",
    extendedDescription:
      "Island-hop through Greece's most beautiful destinations. Visit ancient ruins, relax on pristine beaches, and enjoy traditional Greek tavernas. Includes ferry transfers and guided tours of archaeological sites.",
    images: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601581875039-76fa06a5aec9?w=800&h=600&fit=crop",
    ],
    featured: false,
    highlights: [
      "Santorini sunset viewing",
      "Mykonos beach day",
      "Archaeological site tours",
      "Traditional Greek dinner",
      "Ferry transfers included",
    ],
  },
  {
    id: "4",
    slug: "london-calling",
    name: "London Calling",
    country: "United Kingdom",
    region: "Europe",
    price: 999,
    currency: "USD",
    duration: { days: 5, nights: 4 },
    description:
      "Experience the best of London with visits to Buckingham Palace, Tower of London, British Museum, and more. Perfect blend of history, culture, and modern attractions.",
    extendedDescription:
      "Explore London's iconic landmarks including Big Ben, Westminster Abbey, and the London Eye. Enjoy afternoon tea, visit world-class museums, and experience the vibrant theater scene in the West End.",
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1529655683879-0028d0bb4026?w=800&h=600&fit=crop",
    ],
    featured: false,
    highlights: [
      "Tower of London tour",
      "Buckingham Palace viewing",
      "British Museum access",
      "Traditional afternoon tea",
      "Thames River cruise",
    ],
  },

  // ASIA (4 tours)
  {
    id: "5",
    slug: "tokyo-explorer",
    name: "Tokyo Explorer",
    country: "Japan",
    region: "Asia",
    price: 1599,
    currency: "USD",
    duration: { days: 9, nights: 8 },
    description:
      "Immerse yourself in Tokyo's perfect blend of ancient tradition and cutting-edge technology. Visit temples, experience sushi markets, and explore vibrant neighborhoods.",
    extendedDescription:
      "Discover Tokyo's diverse districts from the historic Senso-ji Temple to futuristic Shibuya. Experience Mount Fuji day trip, traditional tea ceremony, and authentic ramen making. Includes bullet train experience.",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop",
    ],
    featured: true,
    highlights: [
      "Mount Fuji day trip",
      "Traditional tea ceremony",
      "Tsukiji fish market tour",
      "Bullet train experience",
      "Ramen making class",
    ],
  },
  {
    id: "6",
    slug: "bali-paradise",
    name: "Bali Paradise",
    country: "Indonesia",
    region: "Asia",
    price: 1199,
    currency: "USD",
    duration: { days: 8, nights: 7 },
    description:
      "Discover Bali's stunning beaches, ancient temples, and lush rice terraces. Experience Balinese culture, yoga sessions, and tropical paradise in this relaxing getaway.",
    extendedDescription:
      "Explore Ubud's monkey forest, visit iconic Tanah Lot temple, relax on Seminyak beaches, and enjoy traditional Balinese massage. Includes cooking class and sunrise temple visit.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&h=600&fit=crop",
    ],
    featured: false,
    highlights: [
      "Ubud rice terraces",
      "Temple tours",
      "Balinese cooking class",
      "Beach relaxation",
      "Traditional massage",
    ],
  },
  {
    id: "7",
    slug: "thailand-adventure",
    name: "Thailand Adventure",
    country: "Thailand",
    region: "Asia",
    price: 1099,
    currency: "USD",
    duration: { days: 10, nights: 9 },
    description:
      "Experience the best of Thailand from Bangkok's bustling streets to Phuket's pristine beaches. Visit ancient temples, floating markets, and enjoy authentic Thai cuisine.",
    extendedDescription:
      "Comprehensive tour covering Bangkok's Grand Palace, Chiang Mai's elephant sanctuary, and Phuket's islands. Includes tuk-tuk rides, Thai cooking class, and island-hopping excursions.",
    images: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&h=600&fit=crop",
    ],
    featured: true,
    highlights: [
      "Grand Palace Bangkok",
      "Elephant sanctuary visit",
      "Island hopping in Phuket",
      "Thai cooking class",
      "Floating market tour",
    ],
  },
  {
    id: "8",
    slug: "dubai-luxury",
    name: "Dubai Luxury",
    country: "UAE",
    region: "Asia",
    price: 1899,
    currency: "USD",
    duration: { days: 6, nights: 5 },
    description:
      "Experience Dubai's opulence with visits to Burj Khalifa, luxury shopping, desert safari, and world-class dining. Modern marvel meets Arabian heritage.",
    extendedDescription:
      "Explore Dubai's architectural wonders, from the world's tallest building to the Palm Jumeirah. Enjoy desert safari with dune bashing, luxury yacht cruise, and fine dining experiences.",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop",
    ],
    featured: false,
    highlights: [
      "Burj Khalifa access",
      "Desert safari with dinner",
      "Dubai Marina cruise",
      "Gold Souk visit",
      "Luxury hotel stay",
    ],
  },

  // AMERICAS (4 tours)
  {
    id: "9",
    slug: "new-york-city-lights",
    name: "New York City Lights",
    country: "USA",
    region: "Americas",
    price: 1299,
    currency: "USD",
    duration: { days: 6, nights: 5 },
    description:
      "The city that never sleeps awaits! Visit Times Square, Central Park, Statue of Liberty, and experience Broadway shows in America's most iconic city.",
    extendedDescription:
      "Complete NYC experience including Empire State Building, 9/11 Memorial, Brooklyn Bridge, and world-class museums. Includes Broadway show tickets and food tour in multiple neighborhoods.",
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546436836-07a91091f160?w=800&h=600&fit=crop",
    ],
    featured: true,
    highlights: [
      "Statue of Liberty ferry",
      "Empire State Building",
      "Broadway show tickets",
      "Central Park tour",
      "Food tour included",
    ],
  },
  {
    id: "10",
    slug: "machu-picchu-journey",
    name: "Machu Picchu Journey",
    country: "Peru",
    region: "Americas",
    price: 1799,
    currency: "USD",
    duration: { days: 9, nights: 8 },
    description:
      "Trek to the ancient Incan citadel of Machu Picchu. Experience Lima's culinary scene, Cusco's colonial charm, and the mystical Sacred Valley.",
    extendedDescription:
      "Comprehensive Peru tour including Lima city tour, Sacred Valley exploration, and guided Machu Picchu experience. Optional Inca Trail trek or train journey available.",
    images: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
    ],
    featured: false,
    highlights: [
      "Machu Picchu guided tour",
      "Sacred Valley visit",
      "Cusco city exploration",
      "Lima food tour",
      "Train journey included",
    ],
  },
  {
    id: "11",
    slug: "cancun-beach-retreat",
    name: "Cancun Beach Retreat",
    country: "Mexico",
    region: "Americas",
    price: 999,
    currency: "USD",
    duration: { days: 7, nights: 6 },
    description:
      "Relax on pristine Caribbean beaches in Cancun. Visit Mayan ruins, snorkel in crystal-clear cenotes, and enjoy all-inclusive resort amenities.",
    extendedDescription:
      "Beach paradise with day trips to Chichen Itza and Tulum ruins. Includes snorkeling, beach activities, and authentic Mexican cuisine experiences.",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512813498716-3e640fed3f39?w=800&h=600&fit=crop",
    ],
    featured: false,
    highlights: [
      "All-inclusive resort",
      "Chichen Itza tour",
      "Cenote snorkeling",
      "Beach activities",
      "Mexican cooking class",
    ],
  },
  {
    id: "12",
    slug: "canadian-rockies",
    name: "Canadian Rockies",
    country: "Canada",
    region: "Americas",
    price: 1599,
    currency: "USD",
    duration: { days: 8, nights: 7 },
    description:
      "Experience the majestic Canadian Rockies with visits to Banff, Lake Louise, and Jasper. Stunning mountain scenery, wildlife viewing, and outdoor adventures.",
    extendedDescription:
      "Explore Canada's most beautiful national parks with guided hikes, wildlife tours, and scenic drives. Includes gondola rides and hot springs relaxation.",
    images: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
    ],
    featured: true,
    highlights: [
      "Banff gondola ride",
      "Lake Louise visit",
      "Wildlife viewing",
      "Hot springs access",
      "Guided mountain hikes",
    ],
  },

  // AFRICA (3 tours)
  {
    id: "13",
    slug: "kenya-safari",
    name: "Kenya Safari",
    country: "Kenya",
    region: "Africa",
    price: 2299,
    currency: "USD",
    duration: { days: 10, nights: 9 },
    description:
      "Witness the Great Migration and Big Five animals on an unforgettable African safari. Explore Maasai Mara, Amboseli, and Nairobi national parks.",
    extendedDescription:
      "Comprehensive safari experience with game drives, luxury lodges, and cultural visits to Maasai villages. Includes hot air balloon safari and wildlife photography opportunities.",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop",
    ],
    featured: true,
    highlights: [
      "Big Five game drives",
      "Hot air balloon safari",
      "Maasai village visit",
      "Luxury safari lodges",
      "Wildlife photography",
    ],
  },
  {
    id: "14",
    slug: "moroccan-magic",
    name: "Moroccan Magic",
    country: "Morocco",
    region: "Africa",
    price: 1399,
    currency: "USD",
    duration: { days: 9, nights: 8 },
    description:
      "Experience the enchantment of Morocco from Marrakech's bustling souks to Sahara's golden dunes. Visit imperial cities, kasbahs, and ride camels at sunset.",
    extendedDescription:
      "Journey through Morocco's diverse landscapes and rich culture. Explore Marrakech medina, Fes tanneries, Sahara desert camp, and coastal Essaouira.",
    images: [
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop",
    ],
    featured: false,
    highlights: [
      "Marrakech souk tours",
      "Sahara camel trek",
      "Desert camp overnight",
      "Fes medina exploration",
      "Moroccan cooking class",
    ],
  },
  {
    id: "15",
    slug: "south-african-discovery",
    name: "South African Discovery",
    country: "South Africa",
    region: "Africa",
    price: 1999,
    currency: "USD",
    duration: { days: 12, nights: 11 },
    description:
      "Discover South Africa's incredible diversity from Cape Town to Kruger National Park. Wine tasting, Table Mountain, Garden Route, and safari adventures.",
    extendedDescription:
      "Comprehensive tour covering Cape Town's iconic sites, winelands of Stellenbosch, scenic Garden Route, and Kruger safari. Includes whale watching and penguin colony visit.",
    images: [
      "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800&h=600&fit=crop",
    ],
    featured: false,
    highlights: [
      "Table Mountain cable car",
      "Kruger safari",
      "Cape Winelands tour",
      "Penguin colony visit",
      "Garden Route drive",
    ],
  },
];

/**
 * Get all tours
 */
export function getTours(): Tour[] {
  return tours;
}

/**
 * Get a single tour by slug
 */
export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

/**
 * Get all featured tours (for homepage)
 */
export function getFeaturedTours(): Tour[] {
  return tours.filter((tour) => tour.featured);
}

/**
 * Get tours by region
 */
export function getToursByRegion(region: string): Tour[] {
  return tours.filter((tour) => tour.region === region);
}

/**
 * Get all unique regions
 */
export function getRegions(): string[] {
  return Array.from(new Set(tours.map((tour) => tour.region)));
}

/**
 * Get price range (min, max)
 */
export function getPriceRange(): { min: number; max: number } {
  const prices = tours.map((tour) => tour.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

