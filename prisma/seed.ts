import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    price: 2499,
    mrp: 4999,
    category: "Electronics",
    brand: "SoundMax",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    rating: 4.5,
    reviews: 1245,
    stock: 25,
    description: "Premium wireless headphones with deep bass and long battery life.",
  },
  {
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    price: 3999,
    mrp: 7999,
    category: "Electronics",
    brand: "FitCore",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    rating: 4.3,
    reviews: 2198,
    stock: 40,
    description: "Smartwatch with heart rate tracking, workout modes, and notifications.",
  },
  {
    name: "Classic White Sneakers",
    slug: "classic-white-sneakers",
    price: 2299,
    mrp: 3999,
    category: "Fashion",
    brand: "UrbanStep",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    rating: 4.2,
    reviews: 876,
    stock: 55,
    description: "Comfortable everyday sneakers with clean modern styling.",
  },
  {
    name: "Leather Office Backpack",
    slug: "leather-office-backpack",
    price: 3499,
    mrp: 5999,
    category: "Bags",
    brand: "CarryPro",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    rating: 4.6,
    reviews: 542,
    stock: 32,
    description: "Stylish backpack for office, college, and travel.",
  },
  {
    name: "Cotton Casual Hoodie",
    slug: "cotton-casual-hoodie",
    price: 1799,
    mrp: 2999,
    category: "Fashion",
    brand: "StreetWear",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    rating: 4.1,
    reviews: 678,
    stock: 70,
    description: "Soft hoodie for comfort, layering, and casual daily outfits.",
  },
  {
    name: "Modern Desk Lamp",
    slug: "modern-desk-lamp",
    price: 1299,
    mrp: 2499,
    category: "Home",
    brand: "BrightHome",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    rating: 4.4,
    reviews: 319,
    stock: 44,
    description: "Minimal LED desk lamp for work, study, and night reading.",
  },
  {
    name: "Ceramic Coffee Mug Set",
    slug: "ceramic-coffee-mug-set",
    price: 899,
    mrp: 1499,
    category: "Kitchen",
    brand: "HomeServe",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    rating: 4.2,
    reviews: 428,
    stock: 80,
    description: "Elegant ceramic mugs for coffee, tea, and hot chocolate.",
  },
  {
    name: "Portable Bluetooth Speaker",
    slug: "portable-bluetooth-speaker",
    price: 1999,
    mrp: 3999,
    category: "Electronics",
    brand: "BassBox",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    rating: 4.4,
    reviews: 1540,
    stock: 36,
    description: "Compact speaker with loud sound and wireless connectivity.",
  },
  {
    name: "Wooden Study Table",
    slug: "wooden-study-table",
    price: 6999,
    mrp: 9999,
    category: "Home",
    brand: "WoodCraft",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
    rating: 4.0,
    reviews: 231,
    stock: 15,
    description: "Strong wooden desk for home office, study, and productivity.",
  },
  {
    name: "Stainless Steel Cookware Set",
    slug: "stainless-steel-cookware-set",
    price: 2999,
    mrp: 5499,
    category: "Kitchen",
    brand: "ChefMate",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    rating: 4.5,
    reviews: 950,
    stock: 28,
    description: "Daily-use cookware set for modern kitchens.",
  },
];

const extraNames = [
  ["Gaming Mouse", "Electronics", "ClickPro", "https://images.unsplash.com/photo-1527814050087-3793815479db"],
  ["Mechanical Keyboard", "Electronics", "KeyNova", "https://images.unsplash.com/photo-1587829741301-dc798b83add3"],
  ["USB-C Fast Charger", "Electronics", "VoltEdge", "https://images.unsplash.com/photo-1583863788434-e58a36330cf0"],
  ["Laptop Stand", "Electronics", "DeskMate", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46"],
  ["Wireless Earbuds", "Electronics", "SoundMax", "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"],
  ["Denim Jacket", "Fashion", "UrbanStep", "https://images.unsplash.com/photo-1544022613-e87ca75a784a"],
  ["Men Casual Shirt", "Fashion", "StreetWear", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"],
  ["Women Handbag", "Bags", "CarryPro", "https://images.unsplash.com/photo-1594223274512-ad4803739b7c"],
  ["Travel Trolley Bag", "Bags", "TravelGo", "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87"],
  ["Sofa Cushion Set", "Home", "HomeNest", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"],
  ["Wall Clock", "Home", "BrightHome", "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c"],
  ["Bedsheet Set", "Home", "HomeNest", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"],
  ["Non Stick Fry Pan", "Kitchen", "ChefMate", "https://images.unsplash.com/photo-1584990347449-a156b90f8d15"],
  ["Glass Water Bottle", "Kitchen", "HomeServe", "https://images.unsplash.com/photo-1602143407151-7111542de6e8"],
  ["Dinner Plate Set", "Kitchen", "HomeServe", "https://images.unsplash.com/photo-1610701596007-11502861dcfa"],
  ["Yoga Mat", "Fitness", "FitCore", "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f"],
  ["Dumbbell Set", "Fitness", "PowerGym", "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"],
  ["Running Shoes", "Fitness", "UrbanStep", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2"],
  ["Face Moisturizer", "Beauty", "GlowUp", "https://images.unsplash.com/photo-1556228720-195a672e8a03"],
  ["Perfume Spray", "Beauty", "Aura", "https://images.unsplash.com/photo-1541643600914-78b084683601"],
  ["Hair Dryer", "Beauty", "StylePro", "https://images.unsplash.com/photo-1522338140262-f46f5913618a"],
  ["Notebook Pack", "Stationery", "Paperly", "https://images.unsplash.com/photo-1517842645767-c639042777db"],
  ["Office Chair", "Home", "WorkWell", "https://images.unsplash.com/photo-1580480055273-228ff5388ef8"],
  ["Table Organizer", "Stationery", "DeskMate", "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"],
  ["Sunglasses", "Fashion", "UrbanStep", "https://images.unsplash.com/photo-1511499767150-a48a237f0083"],
  ["Analog Watch", "Fashion", "TimeLux", "https://images.unsplash.com/photo-1524592094714-0f0654e20314"],
  ["Kids School Bag", "Bags", "CarryPro", "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3"],
  ["Air Fryer", "Kitchen", "ChefMate", "https://images.unsplash.com/photo-1640790371529-5f0e8c054de9"],
  ["Electric Kettle", "Kitchen", "ChefMate", "https://images.unsplash.com/photo-1594213114663-d94db9b17125"],
  ["Cotton T-Shirt", "Fashion", "StreetWear", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
];

for (let i = 0; products.length < 100; i++) {
  const item = extraNames[i % extraNames.length];
  const number = Math.floor(i / extraNames.length) + 1;
  const name = `${item[0]} ${number > 1 ? `Model ${number}` : "Premium"}`;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  products.push({
    name,
    slug,
    price: 499 + ((i * 337) % 9500),
    mrp: 999 + ((i * 499) % 12000),
    category: item[1],
    brand: item[2],
    image: item[3],
    rating: Number((3.8 + ((i % 12) * 0.1)).toFixed(1)),
    reviews: 120 + ((i * 173) % 8000),
    stock: 8 + ((i * 7) % 90),
    description: `${name} from ${item[2]} with reliable quality, useful features, and everyday value.`,
  });
}

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: products,
  });

  console.log(`Seeded ${products.length} products successfully`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });