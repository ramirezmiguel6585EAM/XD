export const initialSellers = [
  {
    id: "alex_r",
    name: "Alex R.",
    rating: 4.9,
    reviewsCount: 124,
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60",
    responseTime: "Typically responds in 10 mins",
    bio: "Hey there! I frequently sell high-quality office furniture and electronics. I am based in Brooklyn and prefer public meetups near subway stations.",
    reviews: [
      {
        id: "rev_101",
        reviewer: "Marcus T.",
        rating: 5,
        comment: "Excellent seller! The chair was exactly as described and he was right on time for the meetup.",
        date: "June 14, 2026"
      },
      {
        id: "rev_102",
        reviewer: "Emily W.",
        rating: 4,
        comment: "Very polite and helpful. The office desk was clean and sturdy.",
        date: "May 29, 2026"
      }
    ]
  },
  {
    id: "sarah_m",
    name: "Sarah M.",
    rating: 4.8,
    reviewsCount: 42,
    isVerified: false,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
    responseTime: "Typically responds in 1 hour",
    bio: "Fashion enthusiast and vintage collector. Selling my curated wardrobe of pre-loved items.",
    reviews: [
      {
        id: "rev_201",
        reviewer: "Jessica L.",
        rating: 5,
        comment: "Beautiful leather jacket! Clean zips and fit perfectly. Sarah was super easy to coordinate with.",
        date: "June 05, 2026"
      }
    ]
  },
  {
    id: "dan_k",
    name: "Daniel K.",
    rating: 5.0,
    reviewsCount: 15,
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
    responseTime: "Typically responds in 5 mins",
    bio: "Freelance photographer downsizing some of my backup lenses and mirrorless systems.",
    reviews: [
      {
        id: "rev_301",
        reviewer: "Robert J.",
        rating: 5,
        comment: "Camera body is in pristine condition. Highly professional transaction.",
        date: "June 18, 2026"
      }
    ]
  },
  {
    id: "chris_p",
    name: "Chris P.",
    rating: 4.6,
    reviewsCount: 78,
    isVerified: false,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
    responseTime: "Typically responds in 4 hours",
    bio: "Biker, hiker, and outdoor adventurer. Always clearing out gear I no longer use.",
    reviews: [
      {
        id: "rev_401",
        reviewer: "Kevin D.",
        rating: 4,
        comment: "Specialized bike frame had some minor scratches, but mechanically robust. Good communication.",
        date: "May 10, 2026"
      }
    ]
  }
];

export const initialProducts = [
  {
    id: "1",
    title: "Premium Ergonomic Office Chair",
    price: 299,
    originalPrice: 450,
    discount: "33% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "home",
    categoryLabel: "Home & Garden",
    quantity: 3,
    description: "Selling my premium ergonomic office chair. It's in fantastic condition, practically like new. Only used for about 3 months before my company supplied a different one. It provides excellent lumbar support and is fully adjustable.",
    details: [
      "Breathable mesh back for airflow",
      "Adjustable lumbar support depth and height",
      "4D adjustable armrests",
      "Synchronous tilt mechanism with lock",
      "Weight capacity: 300 lbs"
    ],
    meetupInfo: "Public meetup preferred. Willing to meet at the local coffee shop near the subway station.",
    location: "Brooklyn, NY",
    zipCode: "11201",
    timeListed: "Listed 2 hours ago",
    views: 42,
    images: [
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1589384267710-7a259678a59a?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=60",
    seller: {
      id: "alex_r",
      name: "Alex R.",
      rating: 4.9,
      reviewsCount: 124,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 10 mins"
    }
  },
  {
    id: "2",
    title: "Vintage Leather Biker Jacket",
    price: 89,
    originalPrice: 150,
    discount: "40% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "fashion",
    categoryLabel: "Fashion",
    quantity: 1,
    description: "Classic black leather motorcycle jacket. Distressed look with genuine cowhide leather. All zippers work perfectly. Fits like a men's medium.",
    details: [
      "100% Genuine cowhide leather",
      "Heavy-duty silver zippers",
      "Quilted polyester lining",
      "Classic collar snaps"
    ],
    meetupInfo: "Can meet at any public park in Manhattan, preferably Union Square.",
    location: "New York, NY",
    zipCode: "10003",
    timeListed: "Listed 5 hours ago",
    views: 18,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "sarah_m",
      name: "Sarah M.",
      rating: 4.8,
      reviewsCount: 42,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 1 hour"
    }
  },
  {
    id: "3",
    title: "Fujifilm X-T30 Mirrorless Camera",
    price: 650,
    originalPrice: 900,
    discount: "27% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "electronics",
    categoryLabel: "Electronics",
    quantity: 2,
    description: "Beautiful silver Fujifilm X-T30 camera body. Used sparingly as a secondary camera. No scratches or signs of wear. Comes with original box, strap, and 2 batteries.",
    details: [
      "26.1MP APS-C X-Trans BSI CMOS 4 Sensor",
      "4K30 video recording capability",
      "Tilting 3.0\" touchscreen LCD",
      "Wi-Fi and Bluetooth connectivity"
    ],
    meetupInfo: "Willing to ship or do local pickup in Queens. Cash or Venmo accepted.",
    location: "Queens, NY",
    zipCode: "11101",
    timeListed: "Listed yesterday",
    views: 89,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "dan_k",
      name: "Daniel K.",
      rating: 5.0,
      reviewsCount: 15,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 5 mins"
    }
  },
  {
    id: "4",
    title: "Specialized Rockhopper Mountain Bike",
    price: 320,
    originalPrice: 650,
    discount: "50% OFF",
    condition: "Fair",
    conditionValue: "fair",
    category: "motors",
    categoryLabel: "Motors",
    quantity: 1,
    description: "Well-loved mountain bike. Needs a minor tune-up on the gears but rolls great. Front suspension is smooth. 29-inch wheels, medium frame size.",
    details: [
      "A1 Premium Aluminum Frame",
      "SR Suntour XCE suspension fork",
      "Shimano 2x8 speed drivetrain",
      "Mechanical disc brakes"
    ],
    meetupInfo: "Must pick up from my garage in Hoboken. Bring a bike rack or ride it home.",
    location: "Hoboken, NJ",
    zipCode: "07030",
    timeListed: "Listed 3 days ago",
    views: 112,
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "chris_p",
      name: "Chris P.",
      rating: 4.6,
      reviewsCount: 78,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 4 hours"
    }
  },
  {
    id: "5",
    title: "PlayStation 5 Console (Disc Edition)",
    price: 380,
    originalPrice: 499,
    discount: "24% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "videogames",
    categoryLabel: "Video Games",
    quantity: 1,
    description: "Disc edition PS5. Extremely clean, works perfectly. Comes with 1 DualSense controller, power cord, and HDMI cable. No box included.",
    details: [
      "825GB High-Speed SSD",
      "Includes 1 White DualSense Controller",
      "Supporting 4K TV gaming",
      "Model CFI-1200A"
    ],
    meetupInfo: "Public meeting at Union Square Park. Cash or Venmo only.",
    location: "New York, NY",
    zipCode: "10003",
    timeListed: "Listed 1 hour ago",
    views: 64,
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "dan_k",
      name: "Daniel K.",
      rating: 5.0,
      reviewsCount: 15,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 5 mins"
    }
  },
  {
    id: "6",
    title: "Nintendo Switch OLED Model (White)",
    price: 240,
    originalPrice: 349,
    discount: "31% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "videogames",
    categoryLabel: "Video Games",
    quantity: 2,
    description: "Selling my Nintendo Switch OLED. The screen is perfect (always had a glass screen protector on). Joy-cons have some minor wear but no drift. Comes with the original dock and charger.",
    details: [
      "7-inch OLED Screen",
      "64GB Internal Storage",
      "White Joy-Con controllers",
      "Comes with dock, grip, and AC adapter"
    ],
    meetupInfo: "Can meet at coffee shops in Brooklyn Heights.",
    location: "Brooklyn, NY",
    zipCode: "11201",
    timeListed: "Listed 3 hours ago",
    views: 45,
    images: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "alex_r",
      name: "Alex R.",
      rating: 4.9,
      reviewsCount: 124,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 10 mins"
    }
  },
  {
    id: "7",
    title: "Game Boy Color - Atomic Purple",
    price: 85,
    originalPrice: 120,
    discount: "29% OFF",
    condition: "Fair",
    conditionValue: "fair",
    category: "videogames",
    categoryLabel: "Video Games",
    quantity: 1,
    description: "Classic atomic purple Game Boy Color. Has standard scratches on the lens from regular play, but screen and speaker work perfectly. Battery terminal is clean, no corrosion.",
    details: [
      "Original atomic purple translucent shell",
      "Tested and fully functional",
      "Uses 2 AA batteries (not included)",
      "Back sticker has some fading"
    ],
    meetupInfo: "Hoboken garage pickup or local public library.",
    location: "Hoboken, NJ",
    zipCode: "07030",
    timeListed: "Listed yesterday",
    views: 112,
    images: [
      "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "chris_p",
      name: "Chris P.",
      rating: 4.6,
      reviewsCount: 78,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 4 hours"
    }
  },
  {
    id: "8",
    title: "Zelda: Tears of the Kingdom (Switch)",
    price: 45,
    originalPrice: 69,
    discount: "35% OFF",
    condition: "New",
    conditionValue: "new",
    category: "videogames",
    categoryLabel: "Video Games",
    quantity: 5,
    description: "Brand new, factory sealed physical copy of Zelda: Tears of the Kingdom for Nintendo Switch. Firm price, multiple units available.",
    details: [
      "Nintendo Switch Physical Cartridge",
      "Factory sealed",
      "Region free",
      "Released in 2023"
    ],
    meetupInfo: "Meetup near Central Park West or Union Square.",
    location: "New York, NY",
    zipCode: "10024",
    timeListed: "Listed 2 days ago",
    views: 156,
    images: [
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "sarah_m",
      name: "Sarah M.",
      rating: 4.8,
      reviewsCount: 42,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 1 hour"
    }
  },
  {
    id: "9",
    title: "Xbox Series X Console (1TB)",
    price: 399,
    originalPrice: 499,
    discount: "20% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "videogames",
    categoryLabel: "Video Games",
    quantity: 1,
    description: "Xbox Series X in pristine condition. Barely used, sat on a shelf in a dust-free home. Includes original box, black controller, and all cables.",
    details: [
      "True 4K Gaming Capability",
      "1TB Custom NVMe SSD",
      "Includes original box & packaging",
      "Up to 120 FPS support"
    ],
    meetupInfo: "Public meeting at a bank lobby in Queens.",
    location: "Queens, NY",
    zipCode: "11101",
    timeListed: "Listed 5 hours ago",
    views: 52,
    images: [
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "dan_k",
      name: "Daniel K.",
      rating: 5.0,
      reviewsCount: 15,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 5 mins"
    }
  },
  {
    id: "10",
    title: "Apple iPad Pro 11\" (M1, 128GB, Wi-Fi)",
    price: 520,
    originalPrice: 799,
    discount: "35% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "electronics",
    categoryLabel: "Electronics",
    quantity: 1,
    description: "Space gray iPad Pro 11-inch. Powered by the incredibly fast M1 chip. Screen is completely scratch-free. Always used with a magnetic folio case, which is included.",
    details: [
      "Apple M1 Silicon Processor",
      "11-inch Liquid Retina Display",
      "128GB Storage, Wi-Fi connectivity",
      "Includes charging brick and USB-C cable"
    ],
    meetupInfo: "Public Starbucks meetup in Long Island City.",
    location: "Queens, NY",
    zipCode: "11101",
    timeListed: "Listed yesterday",
    views: 74,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "dan_k",
      name: "Daniel K.",
      rating: 5.0,
      reviewsCount: 15,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 5 mins"
    }
  },
  {
    id: "11",
    title: "Bose QuietComfort 45 Headphones",
    price: 175,
    originalPrice: 329,
    discount: "46% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "electronics",
    categoryLabel: "Electronics",
    quantity: 3,
    description: "Selling comfortable Bose active noise-cancelling headphones. Earpads are in clean, excellent shape. Wireless battery lasts up to 22 hours. Comes with carrying case and AUX wire.",
    details: [
      "Industry-leading active noise cancellation",
      "TriPort acoustic architecture",
      "Up to 22 hours battery charge",
      "Includes protective carry case"
    ],
    meetupInfo: "Local pickup at Brooklyn Heights or Downtown Brooklyn.",
    location: "Brooklyn, NY",
    zipCode: "11201",
    timeListed: "Listed 4 hours ago",
    views: 31,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "alex_r",
      name: "Alex R.",
      rating: 4.9,
      reviewsCount: 124,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 10 mins"
    }
  },
  {
    id: "12",
    title: "Dell 27-inch 4K USB-C Monitor",
    price: 230,
    originalPrice: 380,
    discount: "39% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "electronics",
    categoryLabel: "Electronics",
    quantity: 2,
    description: "Dell S2722QC 27-inch 4K monitor. One USB-C cable supplies video and 65W power to charge your laptop. Integrated speakers. IPS panel with beautiful color accuracy.",
    details: [
      "4K UHD (3840 x 2160) Resolution",
      "USB-C Connectivity with 65W Power Delivery",
      "Two built-in 3W speakers",
      "Height adjustable stand"
    ],
    meetupInfo: "Public meeting. Heavy item, pickup from local lobby preferred.",
    location: "Brooklyn, NY",
    zipCode: "11215",
    timeListed: "Listed 3 days ago",
    views: 94,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "alex_r",
      name: "Alex R.",
      rating: 4.9,
      reviewsCount: 124,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 10 mins"
    }
  },
  {
    id: "13",
    title: "Logitech MX Master 3S Mouse",
    price: 60,
    originalPrice: 99,
    discount: "39% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "electronics",
    categoryLabel: "Electronics",
    quantity: 4,
    description: "Highly rated ergonomic productivity mouse. Silent clicks feel tactile, and the MagSpeed electromagnetic wheel scrolls 1000 lines per second. Charging with USB-C.",
    details: [
      "8,000 DPI track-anywhere optical sensor",
      "MagSpeed scroll wheel",
      "Ergonomic palm grip design",
      "Connects up to 3 devices via Bluetooth"
    ],
    meetupInfo: "Willing to meet near Queens Plaza subway station.",
    location: "Queens, NY",
    zipCode: "11101",
    timeListed: "Listed yesterday",
    views: 29,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "dan_k",
      name: "Daniel K.",
      rating: 5.0,
      reviewsCount: 15,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 5 mins"
    }
  },
  {
    id: "14",
    title: "Levi's 501 Original Fit Jeans",
    price: 28,
    originalPrice: 59,
    discount: "52% OFF",
    condition: "New",
    conditionValue: "new",
    category: "fashion",
    categoryLabel: "Fashion",
    quantity: 3,
    description: "Brand new Levi's 501 jeans with tags. Dark wash denim, classic straight leg. Waist size 32, length 30.",
    details: [
      "100% Cotton non-stretch denim",
      "Button fly style",
      "Original rivets and stitching",
      "Size: 32W x 30L"
    ],
    meetupInfo: "Meetup near Columbus Circle or Lincoln Center.",
    location: "New York, NY",
    zipCode: "10023",
    timeListed: "Listed 2 hours ago",
    views: 19,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "sarah_m",
      name: "Sarah M.",
      rating: 4.8,
      reviewsCount: 42,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 1 hour"
    }
  },
  {
    id: "15",
    title: "Vintage Patagonia Synchilla Fleece",
    price: 55,
    originalPrice: 119,
    discount: "53% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "fashion",
    categoryLabel: "Fashion",
    quantity: 1,
    description: "Classic snap-T fleece pullover from Patagonia. Beautiful teal and purple pattern. Warm and fuzzy midweight fleece, perfect for camping. Size: Men's Large.",
    details: [
      "Synchilla double-sided fleece",
      "Classic snap front neck design",
      "Spandex binding at cuffs and hem",
      "Retro pattern design"
    ],
    meetupInfo: "Hoboken public library or transit terminal.",
    location: "Hoboken, NJ",
    zipCode: "07030",
    timeListed: "Listed 3 days ago",
    views: 88,
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "chris_p",
      name: "Chris P.",
      rating: 4.6,
      reviewsCount: 78,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 4 hours"
    }
  },
  {
    id: "16",
    title: "Ray-Ban Classic Wayfarer Sunglasses",
    price: 70,
    originalPrice: 160,
    discount: "56% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "fashion",
    categoryLabel: "Fashion",
    quantity: 2,
    description: "Ray-Ban Original Wayfarer RB2140 sunglasses. Shiny black acetate frame with green G-15 glass lenses. Practically zero scratches, worn only twice.",
    details: [
      "Black Acetate frame",
      "Green G-15 glass lenses",
      "100% UV Protection",
      "Includes leather case and cleaning cloth"
    ],
    meetupInfo: "Public subway station entrances in Lower Manhattan.",
    location: "New York, NY",
    zipCode: "10002",
    timeListed: "Listed yesterday",
    views: 41,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "sarah_m",
      name: "Sarah M.",
      rating: 4.8,
      reviewsCount: 42,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 1 hour"
    }
  },
  {
    id: "17",
    title: "Dr. Martens 1460 Leather Boots",
    price: 85,
    originalPrice: 170,
    discount: "50% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "fashion",
    categoryLabel: "Fashion",
    quantity: 1,
    description: "Classic black 1460 Dr. Martens boots. Yellow welt stitching, air-cushioned sole. Minor scuffs on toes, but leather is in solid, conditioned shape. Size: US Men's 9 / Women's 10.",
    details: [
      "Classic smooth black leather",
      "AirWair air-cushioned rubber sole",
      "8-eye laces",
      "Distinctive yellow stitching"
    ],
    meetupInfo: "Public park pickup in Greenwich Village.",
    location: "New York, NY",
    zipCode: "10012",
    timeListed: "Listed 2 days ago",
    views: 67,
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "sarah_m",
      name: "Sarah M.",
      rating: 4.8,
      reviewsCount: 42,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 1 hour"
    }
  },
  {
    id: "18",
    title: "Dyson V10 Animal Cordless Vacuum",
    price: 260,
    originalPrice: 499,
    discount: "48% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "home",
    categoryLabel: "Home & Garden",
    quantity: 1,
    description: "Works like a charm. Selling since we moved to a home with central vacuums. Clean filters and fully sanitized. Battery runs for about 40 minutes on standard power. Includes charger and crevice tools.",
    details: [
      "Torque drive cleaner head deep-cleans",
      "Fully sealed filtration system traps dust",
      "Cordless stick vacuum design",
      "Comes with wall mount dock & charger"
    ],
    meetupInfo: "Pickup at local apartment lobby near Prospect Park.",
    location: "Brooklyn, NY",
    zipCode: "11215",
    timeListed: "Listed 5 hours ago",
    views: 120,
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "alex_r",
      name: "Alex R.",
      rating: 4.9,
      reviewsCount: 124,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 10 mins"
    }
  },
  {
    id: "19",
    title: "Instant Pot Duo 7-in-1 Cooker",
    price: 35,
    originalPrice: 89,
    discount: "60% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "home",
    categoryLabel: "Home & Garden",
    quantity: 2,
    description: "Popular 7-in-1 multi-cooker. Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer. Inner stainless pot is clean and in great shape.",
    details: [
      "6-quart stainless steel inner pot",
      "13 smart customizable programs",
      "Over 10 safety features built-in",
      "Dishwasher safe lid and insert"
    ],
    meetupInfo: "Public meeting at local supermarket parking lot.",
    location: "Brooklyn, NY",
    zipCode: "11209",
    timeListed: "Listed yesterday",
    views: 39,
    images: [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "alex_r",
      name: "Alex R.",
      rating: 4.9,
      reviewsCount: 124,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 10 mins"
    }
  },
  {
    id: "20",
    title: "Mid-Century Modern Coffee Table",
    price: 110,
    originalPrice: 220,
    discount: "50% OFF",
    condition: "Fair",
    conditionValue: "fair",
    category: "home",
    categoryLabel: "Home & Garden",
    quantity: 1,
    description: "Solid wood coffee table with tapered legs and open storage shelf. Has some heat rings and coffee rings on the surface, but structurally perfect and beautiful retro shape.",
    details: [
      "Solid acacia wood construction",
      "Classic retro tapered legs",
      "Open shelf for books and magazines",
      "Dimensions: 42\"W x 20\"D x 18\"H"
    ],
    meetupInfo: "Must pick up from my driveway, will help you load it.",
    location: "Hoboken, NJ",
    zipCode: "07030",
    timeListed: "Listed 4 days ago",
    views: 145,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "chris_p",
      name: "Chris P.",
      rating: 4.6,
      reviewsCount: 78,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 4 hours"
    }
  },
  {
    id: "21",
    title: "Philips Hue Color Starter Kit",
    price: 80,
    originalPrice: 150,
    discount: "47% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "home",
    categoryLabel: "Home & Garden",
    quantity: 2,
    description: "Start your smart lighting setup. Includes 3 A19 color changing LED bulbs and the Philips Hue Bridge controller. Works with Alexa, Apple HomeKit, and Google Assistant.",
    details: [
      "3 Smart A19 Color Bulbs (E26)",
      "Includes 1 Philips Hue Bridge controller",
      "Millions of colors and warm-to-cool whites",
      "Works with major smart assistants"
    ],
    meetupInfo: "Meetup in LIC or Midtown Manhattan.",
    location: "Queens, NY",
    zipCode: "11101",
    timeListed: "Listed 2 days ago",
    views: 40,
    images: [
      "https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "dan_k",
      name: "Daniel K.",
      rating: 5.0,
      reviewsCount: 15,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 5 mins"
    }
  },
  {
    id: "22",
    title: "Thule Motion XT Cargo Roof Box",
    price: 430,
    originalPrice: 799,
    discount: "46% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "motors",
    categoryLabel: "Motors",
    quantity: 1,
    description: "Large Thule roof rack carrier. Dual-side opening makes it super easy to load gear. Universal mounting system fits most factory crossbars. Minor scuffs on the outside shell, hinges work perfectly.",
    details: [
      "16 cubic feet cargo capacity",
      "Dual-side opening convenience",
      "PowerClick quick-mount system",
      "Includes 2 locking keys"
    ],
    meetupInfo: "Must pick up at my garage in Hoboken. Crossbars not included.",
    location: "Hoboken, NJ",
    zipCode: "07030",
    timeListed: "Listed 5 days ago",
    views: 201,
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "chris_p",
      name: "Chris P.",
      rating: 4.6,
      reviewsCount: 78,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 4 hours"
    }
  },
  {
    id: "23",
    title: "Garmin DriveSmart 65 GPS Navigator",
    price: 85,
    originalPrice: 199,
    discount: "57% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "motors",
    categoryLabel: "Motors",
    quantity: 1,
    description: "Large 6.95-inch high resolution GPS navigator for your car. Includes lifetime map updates of North America, Wi-Fi for updates, and Bluetooth hands-free calling. Works perfectly.",
    details: [
      "6.95\" Edge-to-edge touch screen display",
      "Lifetime maps of US and Canada",
      "Built-in Wi-Fi and Bluetooth",
      "Includes car charger power cord and suction mount"
    ],
    meetupInfo: "Can meet near local shopping center in Queens.",
    location: "Queens, NY",
    zipCode: "11354",
    timeListed: "Listed yesterday",
    views: 18,
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "dan_k",
      name: "Daniel K.",
      rating: 5.0,
      reviewsCount: 15,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 5 mins"
    }
  },
  {
    id: "24",
    title: "Holographic Charizard Base Set 2 (PSA 7)",
    price: 240,
    originalPrice: 350,
    discount: "31% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "collectibles",
    categoryLabel: "Collectibles",
    quantity: 1,
    description: "PSA 7 graded Base Set 2 Charizard holographic card (4/130). Graded slab is in scratch-free sleeve. Perfect collectible item for Pokémon collectors.",
    details: [
      "Charizard 4/130 Base Set 2 Holographic",
      "PSA Graded 7 (Near Mint)",
      "Secured in PSA protective plastic case",
      "Verified certification number"
    ],
    meetupInfo: "Will meet at a secure public location or police station lobby in LIC.",
    location: "Queens, NY",
    zipCode: "11101",
    timeListed: "Listed 3 days ago",
    views: 312,
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=60"
    ],
    mapUrl: "",
    seller: {
      id: "dan_k",
      name: "Daniel K.",
      rating: 5.0,
      reviewsCount: 15,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      responseTime: "Typically responds in 5 mins"
    }
  },

  {
    id: "27",
    title: "Levi's Vintage Denim Jacket",
    price: 65,
    originalPrice: 110,
    discount: "41% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "fashion",
    categoryLabel: "Fashion",
    quantity: 2,
    description: "Authentic vintage Levi's denim jacket, slightly faded, fits size Medium.",
    details: ["100% cotton denim", "Button front", "Classic five-pocket design"],
    meetupInfo: "Meet at Union Square park.",
    location: "New York, NY",
    zipCode: "10003",
    timeListed: "Listed 1 hour ago",
    views: 8,
    images: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=60"],
    mapUrl: "",
    seller: {id: "alex_r", name: "Alex R.", rating: 4.9, reviewsCount: 124, isVerified: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60", responseTime: "Typically responds in 10 mins"}
  },
  {
    id: "28",
    title: "Nintendo Switch Carrying Case",
    price: 25,
    originalPrice: 45,
    discount: "44% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "videogames",
    categoryLabel: "Video Games",
    quantity: 5,
    description: "Durable hard-shell case for Nintendo Switch, includes screen protector.",
    details: ["Water-resistant", "Shock absorbent", "Fits console, Joy‑Cons, and dock"],
    meetupInfo: "Public meetup near Brooklyn Bridge Park.",
    location: "Brooklyn, NY",
    zipCode: "11201",
    timeListed: "Listed 2 hours ago",
    views: 5,
    images: ["https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=600&auto=format&fit=crop&q=60"],
    mapUrl: "",
    seller: {id: "chris_p", name: "Chris P.", rating: 4.6, reviewsCount: 78, isVerified: false, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60", responseTime: "Typically responds in 4 hours"}
  },
  {
    id: "29",
    title: "Mountain Bike Helmet",
    price: 45,
    originalPrice: 80,
    discount: "44% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "motors",
    categoryLabel: "Motors",
    quantity: 3,
    description: "Lightweight carbon bike helmet with MIPS technology.",
    details: ["Carbon fiber shell", "MIPS safety system", "Adjustable ventilation"],
    meetupInfo: "Meet at a bike shop in Queens.",
    location: "Queens, NY",
    zipCode: "11101",
    timeListed: "Listed 3 hours ago",
    views: 7,
    images: ["https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=600&auto=format&fit=crop&q=60"],
    mapUrl: "",
    seller: {id: "alex_r", name: "Alex R.", rating: 4.9, reviewsCount: 124, isVerified: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60", responseTime: "Typically responds in 10 mins"}
  },

  {
    id: "33",
    title: "Gibson Les Paul Standard Guitar",
    price: 1200,
    originalPrice: 1500,
    discount: "20% OFF",
    condition: "Fair",
    conditionValue: "fair",
    category: "motors",
    categoryLabel: "Motors",
    quantity: 1,
    description: "Classic Gibson Les Paul electric guitar, some wear, still sounds great.",
    details: ["Mahogany body", "Rosewood fingerboard", "Dual humbucker pickups"],
    meetupInfo: "Pickup at a music store in Brooklyn.",
    location: "Brooklyn, NY",
    zipCode: "11205",
    timeListed: "Listed 3 hours ago",
    views: 4,
    images: ["https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=60"],
    mapUrl: "",
    seller: {id: "chris_p", name: "Chris P.", rating: 4.6, reviewsCount: 78, isVerified: false, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60", responseTime: "Typically responds in 4 hours"}
  },

  {
    id: "37",
    title: "Instant Pot Duo 7‑in‑1 (Black)",
    price: 35,
    originalPrice: 70,
    discount: "50% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "home",
    categoryLabel: "Home & Garden",
    quantity: 1,
    description: "Same Instant Pot model as existing listing but black color.",
    details: ["7‑in‑1 multifunction", "Stainless steel inner pot", "Easy to clean"],
    meetupInfo: "Pickup at my apartment lobby in Brooklyn.",
    location: "Brooklyn, NY",
    zipCode: "11209",
    timeListed: "Listed just now",
    views: 0,
    images: ["https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=60"],
    mapUrl: "",
    seller: {id: "sarah_m", name: "Sarah M.", rating: 4.8, reviewsCount: 42, isVerified: false, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60", responseTime: "Typically responds in 1 hour"}
  },
  {
    id: "38",
    title: "Dyson V11 Torque Drive Vacuum",
    price: 300,
    originalPrice: 550,
    discount: "45% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "home",
    categoryLabel: "Home & Garden",
    quantity: 1,
    description: "Dyson V11 cordless vacuum, lightly used, includes extra battery.",
    details: ["Digital motor", "High torque cleaner head", "Long battery life"],
    meetupInfo: "Pickup at my driveway in Hoboken.",
    location: "Hoboken, NJ",
    zipCode: "07030",
    timeListed: "Listed 30 mins ago",
    views: 2,
    images: ["https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=60"],
    mapUrl: "",
    seller: {id: "dan_k", name: "Daniel K.", rating: 5.0, reviewsCount: 15, isVerified: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60", responseTime: "Typically responds in 5 mins"}
  },
  {
    id: "39",
    title: "Bose SoundLink Bluetooth Speaker",
    price: 120,
    originalPrice: 199,
    discount: "40% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "electronics",
    categoryLabel: "Electronics",
    quantity: 2,
    description: "Portable Bluetooth speaker with deep bass, black color.",
    details: ["360° sound", "15‑hour battery", "Water resistant"],
    meetupInfo: "Meet at a coffee shop in Queens.",
    location: "Queens, NY",
    zipCode: "11354",
    timeListed: "Listed 1 hour ago",
    views: 4,
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=60"],
    mapUrl: "",
    seller: {id: "alex_r", name: "Alex R.", rating: 4.9, reviewsCount: 124, isVerified: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60", responseTime: "Typically responds in 10 mins"}
  },

  {
    id: "41",
    title: "Electric Kettle – Stainless Steel",
    price: 30,
    originalPrice: 55,
    discount: "45% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "home",
    categoryLabel: "Home & Garden",
    quantity: 2,
    description: "Fast‑boil stainless steel electric kettle, 1.7L capacity.",
    details: ["Auto shut‑off", "BPA‑free", "Cord‑free travel mug"],
    meetupInfo: "Pick up at my apartment building in Brooklyn.",
    location: "Brooklyn, NY",
    zipCode: "11215",
    timeListed: "Listed 30 mins ago",
    views: 1,
    images: ["https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=60"],
    mapUrl: "",
    seller: {id: "dan_k", name: "Daniel K.", rating: 5.0, reviewsCount: 15, isVerified: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60", responseTime: "Typically responds in 5 mins"}
  },
  {
    id: "42",
    title: "Board Game – Catan (2022 Edition)",
    price: 45,
    originalPrice: 70,
    discount: "36% OFF",
    condition: "Like New",
    conditionValue: "like-new",
    category: "collectibles",
    categoryLabel: "Collectibles",
    quantity: 1,
    description: "Catan board game, recent edition, all pieces included.",
    details: ["Base game and 5‑card expansion", "Dice, cards, and wooden pieces"],
    meetupInfo: "Meet at a cafe in Manhattan.",
    location: "New York, NY",
    zipCode: "10003",
    timeListed: "Listed just now",
    views: 0,
    images: ["https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=60"],
    mapUrl: "",
    seller: {id: "alex_r", name: "Alex R.", rating: 4.9, reviewsCount: 124, isVerified: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60", responseTime: "Typically responds in 10 mins"}
  },

  {
    id: "44",
    title: "Hiking Backpack – 30L",
    price: 55,
    originalPrice: 95,
    discount: "42% OFF",
    condition: "Good",
    conditionValue: "good",
    category: "motors",
    categoryLabel: "Motors",
    quantity: 1,
    description: "30‑liter hiking backpack, waterproof, with multiple compartments.",
    details: ["Adjustable straps", "Rain cover", "Hydration compatible"],
    meetupInfo: "Pickup at my garage in Hoboken.",
    location: "Hoboken, NJ",
    zipCode: "07030",
    timeListed: "Listed 3 hours ago",
    views: 4,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60"],
    mapUrl: "",
    seller: {id: "dan_k", name: "Daniel K.", rating: 5.0, reviewsCount: 15, isVerified: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60", responseTime: "Typically responds in 5 mins"}
  }
];

export const initialPurchases = [
  {
    id: "ord_1001",
    productId: "99",
    productTitle: "Mechanical Gaming Keyboard (RGB)",
    productImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&auto=format&fit=crop&q=60",
    price: 45,
    quantityPurchased: 1,
    purchaseDate: "June 12, 2026",
    status: "Delivered",
    sellerName: "Daniel K.",
    sellerId: "dan_k"
  },
  {
    id: "ord_1002",
    productId: "98",
    productTitle: "Wireless Noise Cancelling Headphones",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=60",
    price: 120,
    quantityPurchased: 1,
    purchaseDate: "May 28, 2026",
    status: "Completed",
    sellerName: "Sarah M.",
    sellerId: "sarah_m"
  }
];

export const initialChats = [
  {
    sellerId: "alex_r",
    sellerName: "Alex R.",
    sellerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60",
    productTitle: "Premium Ergonomic Office Chair",
    productId: "1",
    messages: [
      {
        id: "msg_1",
        sender: "seller",
        text: "Hi! Thanks for expressing interest. The chair is still available.",
        time: "3:00 PM"
      },
      {
        id: "msg_2",
        sender: "buyer",
        text: "Great! Is there any flexibility on the price?",
        time: "3:05 PM"
      },
      {
        id: "msg_3",
        sender: "seller",
        text: "I could do $280 if you can pick it up this evening.",
        time: "3:06 PM"
      }
    ]
  }
];
