import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function img(id: string) {
  return `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`;
}

const categories = [
  { slug: "electronics", name: "Electronics" },
  { slug: "home-kitchen", name: "Home & Kitchen" },
  { slug: "fashion", name: "Fashion" },
  { slug: "beauty", name: "Beauty & Personal Care" },
  { slug: "toys-games", name: "Toys & Games" },
  { slug: "sports-outdoors", name: "Sports & Outdoors" },
];

type Seed = {
  slug: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  listPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  bullets: string[];
};

const products: Seed[] = [
  {
    slug: "aurawave-anc-headphones",
    title: "AuraWave Hybrid Active Noise Cancelling Over-Ear Headphones",
    brand: "AuraWave",
    category: "electronics",
    price: 7999,
    listPrice: 12999,
    rating: 4.5,
    reviewCount: 18420,
    images: [img("1505740420928-5e560c06d30e"), img("1546868871-7041f2a55e12")],
    description:
      "Hybrid active noise cancellation with 40 hours of playtime, memory-foam ear cushions, and a companion app for custom EQ.",
    bullets: [
      "Hybrid ANC blocks up to 98% of ambient noise",
      "40-hour battery life, 5-min quick charge = 4 hours playback",
      "Hi-Res Audio certified with Big Bass mode",
      "Foldable design with premium carrying case",
    ],
  },
  {
    slug: "pulseband-fitness-smartwatch",
    title: "PulseBand Fitness Smartwatch with Heart Rate & GPS",
    brand: "PulseBand",
    category: "electronics",
    price: 5499,
    listPrice: 7999,
    rating: 4.3,
    reviewCount: 9241,
    images: [img("1546868871-7041f2a55e12"), img("1508685096489-7aacd43bd3b1")],
    description:
      "Track workouts, sleep, and heart rate with built-in GPS and a 14-day battery life. Water resistant to 50m.",
    bullets: [
      "Built-in GPS, no phone required for runs",
      "14-day battery life on a single charge",
      "5 ATM water resistance",
      "100+ sport modes with auto-detection",
    ],
  },
  {
    slug: "flexbook-14-ultralight-laptop",
    title: 'FlexBook 14" Ultralight Laptop, 16GB RAM, 512GB SSD',
    brand: "FlexBook",
    category: "electronics",
    price: 68999,
    listPrice: 84999,
    rating: 4.6,
    reviewCount: 3120,
    images: [img("1517336714731-489689fd1ca8"), img("1496181133206-80ce9b88a853")],
    description:
      "A thin, light 14-inch laptop built for all-day productivity with a crisp 2K display and all-day battery life.",
    bullets: [
      "2K IPS display, 100% sRGB",
      "16GB RAM / 512GB NVMe SSD",
      "Up to 18 hours of battery life",
      "1.2kg aluminum unibody chassis",
    ],
  },
  {
    slug: "snapshot-x2-mirrorless-camera",
    title: "SnapShot X2 Mirrorless Camera with 18-55mm Lens",
    brand: "SnapShot",
    category: "electronics",
    price: 54999,
    rating: 4.7,
    reviewCount: 1542,
    images: [img("1526170375885-4d8ecf77b99f"), img("1502920917128-1aa500764cbd")],
    description:
      "24MP APS-C sensor mirrorless camera with in-body stabilization and 4K video recording.",
    bullets: [
      "24.2MP APS-C CMOS sensor",
      "4K/30p video, 1080p/120p slow motion",
      "5-axis in-body image stabilization",
      "Includes 18-55mm kit lens",
    ],
  },
  {
    slug: "boomcast-portable-speaker",
    title: "BoomCast Portable Bluetooth Speaker, Waterproof",
    brand: "BoomCast",
    category: "electronics",
    price: 3299,
    listPrice: 4499,
    rating: 4.4,
    reviewCount: 22190,
    images: [img("1608043152269-423dbba4e7e1"), img("1608043152269-423dbba4e7e1")],
    description:
      "Rich 360° sound in a rugged, fully waterproof body. 20-hour battery life and pair two for stereo sound.",
    bullets: [
      "IPX7 fully waterproof",
      "20-hour battery life",
      "360° sound with deep bass",
      "Pair two speakers for stereo",
    ],
  },
  {
    slug: "dotbuds-pro-earbuds",
    title: "DotBuds Pro True Wireless Earbuds with ANC",
    brand: "DotBuds",
    category: "electronics",
    price: 4999,
    listPrice: 6999,
    rating: 4.2,
    reviewCount: 15003,
    images: [img("1590658268037-6bf12165a8df"), img("1590658268037-6bf12165a8df")],
    description:
      "Active noise cancellation, wireless charging case, and up to 30 hours of combined battery life.",
    bullets: [
      "Active noise cancellation + transparency mode",
      "30 hours total battery with charging case",
      "Wireless (Qi) charging case",
      "IPX5 sweat and water resistant",
    ],
  },
  {
    slug: "brewmaster-drip-coffee-maker",
    title: "BrewMaster 12-Cup Programmable Drip Coffee Maker",
    brand: "BrewMaster",
    category: "home-kitchen",
    price: 4299,
    rating: 4.5,
    reviewCount: 8720,
    images: [img("1495474472287-4d71bcdd2085"), img("1495474472287-4d71bcdd2085")],
    description:
      "Programmable 12-cup coffee maker with a reusable filter, auto shut-off, and a keep-warm plate.",
    bullets: [
      "24-hour programmable timer",
      "Reusable gold-tone filter included",
      "Auto shut-off & keep-warm plate",
      "12-cup glass carafe",
    ],
  },
  {
    slug: "veloprep-blender-1000w",
    title: "VeloPrep 1000W High-Speed Blender",
    brand: "VeloPrep",
    category: "home-kitchen",
    price: 5999,
    listPrice: 7499,
    rating: 4.6,
    reviewCount: 6410,
    images: [img("1570222094114-d054a817e56b"), img("1570222094114-d054a817e56b")],
    description:
      "1000W motor crushes ice and blends smoothies in seconds. Includes a 64oz BPA-free pitcher.",
    bullets: [
      "1000W peak motor power",
      "64oz BPA-free pitcher",
      "6 pre-programmed settings",
      "Dishwasher-safe parts",
    ],
  },
  {
    slug: "castiron-5pc-cookware-set",
    title: "Heritage 5-Piece Enameled Cast Iron Cookware Set",
    brand: "Heritage",
    category: "home-kitchen",
    price: 18999,
    listPrice: 24999,
    rating: 4.8,
    reviewCount: 2890,
    images: [img("1556910103-1c02745aae4d"), img("1556910103-1c02745aae4d")],
    description:
      "Oven-safe enameled cast iron set that goes from stovetop to table. Even heat retention for years of cooking.",
    bullets: [
      "5-piece set: dutch oven, skillet, grill pan, and lids",
      "Oven safe up to 500°F",
      "Even heat distribution and retention",
      "Compatible with all cooktops including induction",
    ],
  },
  {
    slug: "glowlamp-smart-led-desk-lamp",
    title: "GlowLamp Smart LED Desk Lamp with Wireless Charging",
    brand: "GlowLamp",
    category: "home-kitchen",
    price: 3499,
    rating: 4.3,
    reviewCount: 4110,
    images: [img("1507473885765-e6ed057f782c"), img("1507473885765-e6ed057f782c")],
    description:
      "Eye-caring LED desk lamp with 5 color temperatures, a built-in wireless charging pad, and USB port.",
    bullets: [
      "5 color temperatures, 10 brightness levels",
      "Built-in 10W wireless charging pad",
      "USB charging port",
      "Touch controls with memory function",
    ],
  },
  {
    slug: "cyclonemax-cordless-vacuum",
    title: "CycloneMax Cordless Stick Vacuum, 60-Min Runtime",
    brand: "CycloneMax",
    category: "home-kitchen",
    price: 15999,
    listPrice: 19999,
    rating: 4.4,
    reviewCount: 5330,
    images: [img("1558618666-fcd25c85cd64"), img("1558618666-fcd25c85cd64")],
    description:
      "Powerful cordless vacuum with 60 minutes of runtime, a detachable handheld unit, and HEPA filtration.",
    bullets: [
      "Up to 60 minutes of runtime",
      "Converts to a handheld vacuum",
      "HEPA filtration traps 99.97% of particles",
      "Wall-mounted charging dock included",
    ],
  },
  {
    slug: "strideforge-running-sneakers",
    title: "StrideForge Men's Running Sneakers, Lightweight Mesh",
    brand: "StrideForge",
    category: "fashion",
    price: 2999,
    listPrice: 4999,
    rating: 4.4,
    reviewCount: 11230,
    images: [img("1542291026-7eec264c27ff"), img("1542291026-7eec264c27ff")],
    description:
      "Breathable mesh upper with responsive cushioning for everyday runs and all-day comfort.",
    bullets: [
      "Breathable engineered mesh upper",
      "Responsive foam midsole cushioning",
      "Rubber outsole for durable traction",
      "Available in half sizes",
    ],
  },
  {
    slug: "traveler-pro-travel-backpack",
    title: "Traveler Pro 40L Carry-On Travel Backpack",
    brand: "Traveler",
    category: "fashion",
    price: 4499,
    rating: 4.7,
    reviewCount: 7650,
    images: [img("1553062407-98eeb64c6a62"), img("1553062407-98eeb64c6a62")],
    description:
      "Airline carry-on sized backpack with a dedicated laptop sleeve, shoe compartment, and USB charging port.",
    bullets: [
      "Fits most airline carry-on size limits",
      "Padded 17-inch laptop sleeve",
      "Separate shoe/dirty laundry compartment",
      "External USB charging port",
    ],
  },
  {
    slug: "solarshade-polarized-sunglasses",
    title: "SolarShade Polarized Sunglasses, UV400 Protection",
    brand: "SolarShade",
    category: "fashion",
    price: 1499,
    listPrice: 2499,
    rating: 4.5,
    reviewCount: 9880,
    images: [img("1511499767150-a48a237f0083"), img("1511499767150-a48a237f0083")],
    description:
      "Classic polarized sunglasses that block 100% of UVA/UVB rays with a lightweight, durable frame.",
    bullets: [
      "Polarized lenses reduce glare",
      "100% UVA/UVB protection",
      "Lightweight TR90 frame",
      "Includes hard case and cleaning cloth",
    ],
  },
  {
    slug: "chronotime-classic-watch",
    title: "ChronoTime Classic Automatic Watch, Leather Strap",
    brand: "ChronoTime",
    category: "fashion",
    price: 8999,
    listPrice: 12999,
    rating: 4.6,
    reviewCount: 2210,
    images: [img("1524805444758-089113d48a6d"), img("1524805444758-089113d48a6d")],
    description:
      "A timeless automatic watch with a genuine leather strap and a sapphire-coated crystal face.",
    bullets: [
      "Automatic movement, no battery needed",
      "Genuine leather strap",
      "Sapphire-coated scratch-resistant crystal",
      "Water resistant to 30m",
    ],
  },
  {
    slug: "duneweather-packable-jacket",
    title: "DuneWeather Packable Rain Jacket, Unisex",
    brand: "DuneWeather",
    category: "fashion",
    price: 3999,
    rating: 4.3,
    reviewCount: 4030,
    images: [img("1551028719-00167b16eac5"), img("1551028719-00167b16eac5")],
    description:
      "A fully waterproof, windproof shell that packs into its own pocket for travel and hiking.",
    bullets: [
      "100% waterproof, seam-sealed",
      "Packs into its own chest pocket",
      "Adjustable hood and cuffs",
      "Unisex sizing, XS-3XL",
    ],
  },
  {
    slug: "purebloom-skincare-set",
    title: "PureBloom 5-Step Skincare Gift Set",
    brand: "PureBloom",
    category: "beauty",
    price: 3299,
    listPrice: 4799,
    rating: 4.6,
    reviewCount: 6120,
    images: [img("1596462502278-27bfdc403348"), img("1596462502278-27bfdc403348")],
    description:
      "A complete 5-step skincare routine with cleanser, toner, serum, moisturizer, and eye cream.",
    bullets: [
      "Cleanser, toner, serum, moisturizer, eye cream",
      "Fragrance-free, dermatologist tested",
      "Cruelty-free and vegan",
      "Suitable for all skin types",
    ],
  },
  {
    slug: "velvetnote-eau-de-parfum",
    title: "VelvetNote Eau de Parfum, 50ml",
    brand: "VelvetNote",
    category: "beauty",
    price: 5499,
    rating: 4.4,
    reviewCount: 3340,
    images: [img("1541643600914-78b084683601"), img("1541643600914-78b084683601")],
    description:
      "A warm, woody fragrance with notes of amber, vanilla, and sandalwood that lasts all day.",
    bullets: [
      "Long-lasting 8+ hour wear",
      "Notes of amber, vanilla, and sandalwood",
      "50ml glass bottle",
      "Cruelty-free",
    ],
  },
  {
    slug: "brushcraft-makeup-brush-set",
    title: "BrushCraft 12-Piece Professional Makeup Brush Set",
    brand: "BrushCraft",
    category: "beauty",
    price: 1999,
    listPrice: 2999,
    rating: 4.5,
    reviewCount: 8900,
    images: [img("1526947425960-945c6e72858f"), img("1526947425960-945c6e72858f")],
    description:
      "Soft, synthetic bristle brushes for flawless foundation, powder, and eye makeup application.",
    bullets: [
      "12 brushes for face and eyes",
      "Ultra-soft synthetic bristles, cruelty-free",
      "Includes travel case",
      "Easy to clean and quick-drying",
    ],
  },
  {
    slug: "buildblox-500pc-building-set",
    title: "BuildBlox 500-Piece Creative Building Block Set",
    brand: "BuildBlox",
    category: "toys-games",
    price: 2499,
    rating: 4.7,
    reviewCount: 12400,
    images: [img("1587654780291-39c9404d746b"), img("1587654780291-39c9404d746b")],
    description:
      "500 compatible building blocks for open-ended creative play, plus an idea booklet for young builders.",
    bullets: [
      "500 pieces, compatible with major brands",
      "Includes idea booklet with 10 builds",
      "Storage tub included",
      "Ages 6+",
    ],
  },
  {
    slug: "strategos-family-board-game",
    title: "Strategos Family Strategy Board Game",
    brand: "Strategos",
    category: "toys-games",
    price: 1799,
    rating: 4.8,
    reviewCount: 5540,
    images: [img("1610890716171-6b1bb98ffd09"), img("1610890716171-6b1bb98ffd09")],
    description:
      "A fast-playing strategy game for 2-6 players, ages 10+. Average playtime 45 minutes.",
    bullets: [
      "2-6 players, ages 10+",
      "Average playtime: 45 minutes",
      "Easy to learn, hard to master",
      "Compact box for travel",
    ],
  },
  {
    slug: "skyhover-mini-camera-drone",
    title: "SkyHover Mini Camera Drone with 1080p Camera",
    brand: "SkyHover",
    category: "toys-games",
    price: 3999,
    listPrice: 5499,
    rating: 4.2,
    reviewCount: 3010,
    images: [img("1473968512647-3e447244af8f"), img("1473968512647-3e447244af8f")],
    description:
      "A beginner-friendly mini drone with a 1080p camera, altitude hold, and one-key takeoff/landing.",
    bullets: [
      "1080p FPV camera with live app view",
      "Altitude hold for stable flight",
      "One-key takeoff and landing",
      "Two batteries for extended flight time",
    ],
  },
  {
    slug: "cuddlefam-plush-bear",
    title: "CuddleFam Giant Plush Teddy Bear, 36-inch",
    brand: "CuddleFam",
    category: "toys-games",
    price: 2299,
    rating: 4.9,
    reviewCount: 4210,
    images: [img("1559454403-b8fb88521f11"), img("1559454403-b8fb88521f11")],
    description:
      "An extra-soft, huggable 36-inch teddy bear made from hypoallergenic materials.",
    bullets: [
      "36 inches tall",
      "Ultra-soft hypoallergenic plush",
      "Surface washable",
      "Great for kids of all ages",
    ],
  },
  {
    slug: "zenflow-premium-yoga-mat",
    title: "ZenFlow Premium Non-Slip Yoga Mat, 6mm",
    brand: "ZenFlow",
    category: "sports-outdoors",
    price: 1999,
    listPrice: 2999,
    rating: 4.6,
    reviewCount: 10230,
    images: [img("1518611012118-696072aa579a"), img("1518611012118-696072aa579a")],
    description:
      "Extra-thick 6mm mat with a non-slip surface for yoga, pilates, and general fitness.",
    bullets: [
      "6mm thick for extra joint cushioning",
      "Non-slip textured surface",
      "Includes carrying strap",
      "Free of phthalates and latex",
    ],
  },
  {
    slug: "ironcore-adjustable-dumbbells",
    title: "IronCore Adjustable Dumbbell Set, 5-52.5 lbs (Pair)",
    brand: "IronCore",
    category: "sports-outdoors",
    price: 24999,
    rating: 4.7,
    reviewCount: 6780,
    images: [img("1517836357463-d25dfeac3438"), img("1517836357463-d25dfeac3438")],
    description:
      "Space-saving adjustable dumbbells that replace 15 sets of weights, from 5 to 52.5 lbs per dumbbell.",
    bullets: [
      "Adjusts from 5 to 52.5 lbs per dumbbell",
      "Replaces 15 pairs of traditional dumbbells",
      "Quick-select dial system",
      "Durable, space-saving tray included",
    ],
  },
  {
    slug: "basecamp-2-person-tent",
    title: "BaseCamp 2-Person Waterproof Camping Tent",
    brand: "BaseCamp",
    category: "sports-outdoors",
    price: 6999,
    listPrice: 8999,
    rating: 4.5,
    reviewCount: 4990,
    images: [img("1504280390367-361c6d9f38f4"), img("1504280390367-361c6d9f38f4")],
    description:
      "Lightweight, easy-to-pitch 2-person tent with a waterproof rainfly, perfect for backpacking trips.",
    bullets: [
      "Sets up in under 5 minutes",
      "Fully waterproof rainfly and floor",
      "Fits 2 people plus gear",
      "Weighs just 3.2kg",
    ],
  },
  {
    slug: "trailguard-bike-helmet",
    title: "TrailGuard Adult Bike Helmet with LED Light",
    brand: "TrailGuard",
    category: "sports-outdoors",
    price: 2799,
    rating: 4.4,
    reviewCount: 3650,
    images: [img("1558981806-ec527fa84c39"), img("1558981806-ec527fa84c39")],
    description:
      "A lightweight, well-ventilated helmet with an integrated rear LED light for road and trail riding.",
    bullets: [
      "14 vents for airflow",
      "Integrated rechargeable rear LED",
      "Adjustable fit dial",
      "Meets CPSC safety standards",
    ],
  },
];

async function main() {
  const categoryMap = new Map<string, string>();
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
    categoryMap.set(c.slug, cat.id);
  }

  for (const p of products) {
    const categoryId = categoryMap.get(p.category);
    if (!categoryId) throw new Error(`Unknown category ${p.category}`);
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        brand: p.brand,
        description: p.description,
        bullets: JSON.stringify(p.bullets),
        priceCents: p.price,
        listPriceCents: p.listPrice ?? null,
        images: JSON.stringify(p.images),
        rating: p.rating,
        reviewCount: p.reviewCount,
        categoryId,
      },
    });
  }

  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
