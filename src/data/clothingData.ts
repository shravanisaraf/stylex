
import { ClothingItem } from '../contexts/StyleContext';

// Easy to update clothing data - just add your store links here!
export const clothingItems: ClothingItem[] = [
  // TOPS - Add your actual store links here
  {
    id: 1,
    name: "Embroidered Ruffle Top",
    imageUrl: "https://static.zara.net/assets/public/a37f/4a39/16ae4420ae72/98a0bb77cfa0/05107004400-p/05107004400-p.jpg?ts=1749467895943&w=1500",
    brand: "Zara",
    price: "Rs.2990",
    category: "tops",
    color: "white",
    season: ["spring", "summer"],
    buyUrl: "https://www.zara.com/in/en/embroidered-ruffle-top-p05107004.html?v1=452717291&v2=2419940"
  },
  {
    id: 2,
    name: "Lemon Print Halter Tie Top",
    imageUrl: "https://static.zara.net/assets/public/d29f/4dee/a1d44ea2bc4c/a86d64afbe71/02552029119-e1/02552029119-e1.jpg?ts=1741024039636&w=1126",
    brand: "Zara",
    price: "Rs.1990",
    category: "tops",
    color: "yellow",
    season: ["spring", "summer"],
    buyUrl: "https://www.zara.com/in/en/lemon-print-halter-tie-top-p02552029.html?v1=435418861&v2=2419940"
  },
  {
    id: 3,
    name: "Red Sweater",
    imageUrl: "",
    brand: "H&M",
    price: "Rs.1200",
    category: "tops",
    color: "red",
    season: ["autumn", "winter"],
    buyUrl: "https://www2.hm.com/en_us/productpage.red-sweater-example.html" // REPLACE WITH YOUR ACTUAL LINK
  },
  {
    id: 3,
    name: "Blue Shirt",
    imageUrl: "",
    brand: "Uniqlo",
    price: "Rs.850",
    category: "tops",
    color: "blue",
    season: ["spring", "summer", "autumn"],
    buyUrl: "https://www.uniqlo.com/us/en/blue-shirt-example" // REPLACE WITH YOUR ACTUAL LINK
  },
  {
    id: 4,
    name: "Black Top",
    imageUrl: "",
    brand: "Mango",
    price: "Rs.1100",
    category: "tops",
    color: "black",
    season: ["spring", "summer", "autumn", "winter"],
    buyUrl: "https://shop.mango.com/us/black-top-example" // REPLACE WITH YOUR ACTUAL LINK
  },

  // BOTTOMS - Add your actual store links here
  {
    id: 5,
    name: "Dark Jeans",
    imageUrl: "",
    brand: "Levi's",
    price: "Rs.1750",
    category: "bottoms",
    color: "blue",
    season: ["spring", "autumn", "winter"],
    buyUrl: "https://www.levi.com/US/en_US/dark-jeans-example" // REPLACE WITH YOUR ACTUAL LINK
  },
  {
    id: 6,
    name: "Black Skirt",
    imageUrl: "",
    brand: "Zara",
    price: "Rs.1100",
    category: "bottoms",
    color: "black",
    season: ["spring", "summer"],
    buyUrl: "https://www.zara.com/us/en/black-skirt-example" // REPLACE WITH YOUR ACTUAL LINK
  },
  {
    id: 7,
    name: "Navy Pants",
    imageUrl: "",
    brand: "Uniqlo",
    price: "Rs.1400",
    category: "bottoms",
    color: "navy",
    season: ["autumn", "winter"],
    buyUrl: "https://www.uniqlo.com/us/en/navy-pants-example" // REPLACE WITH YOUR ACTUAL LINK
  },
  {
    id: 8,
    name: "Denim Skirt",
    imageUrl: "",
    brand: "H&M",
    price: "Rs.950",
    category: "bottoms",
    color: "blue",
    season: ["spring", "summer"],
    buyUrl: "https://www2.hm.com/en_us/productpage.denim-skirt-example.html" // REPLACE WITH YOUR ACTUAL LINK
  },

  // JACKETS - Add your actual store links here
  {
    id: 9,
    name: "Leather Jacket",
    imageUrl: "",
    brand: "Zara",
    price: "Rs.2500",
    category: "jackets",
    color: "black",
    season: ["autumn", "winter"],
    buyUrl: "https://www.zara.com/us/en/leather-jacket-example" // REPLACE WITH YOUR ACTUAL LINK
  },
  {
    id: 10,
    name: "Denim Jacket",
    imageUrl: "",
    brand: "Levi's",
    price: "Rs.1800",
    category: "jackets",
    color: "blue",
    season: ["spring", "autumn"],
    buyUrl: "https://www.levi.com/US/en_US/denim-jacket-example" // REPLACE WITH YOUR ACTUAL LINK
  },

  // DRESSES - Add your actual store links here
  {
    id: 11,
    name: "Summer Dress",
    imageUrl: "",
    brand: "Mango",
    price: "Rs.1600",
    category: "dresses",
    color: "white",
    season: ["spring", "summer"],
    buyUrl: "https://shop.mango.com/us/summer-dress-example" // REPLACE WITH YOUR ACTUAL LINK
  },
  {
    id: 12,
    name: "Evening Dress",
    imageUrl: "",
    brand: "Zara",
    price: "Rs.3200",
    category: "dresses",
    color: "black",
    season: ["spring", "summer", "autumn", "winter"],
    buyUrl: "https://www.zara.com/us/en/evening-dress-example" // REPLACE WITH YOUR ACTUAL LINK
  },

  // ACCESSORIES - Add your actual store links here
  {
    id: 13,
    name: "Gold Necklace",
    imageUrl: "",
    brand: "Pandora",
    price: "Rs.1500",
    category: "accessories",
    color: "gold",
    season: ["spring", "summer", "autumn", "winter"],
    buyUrl: "https://us.pandora.net/gold-necklace-example" // REPLACE WITH YOUR ACTUAL LINK
  },
  {
    id: 14,
    name: "Black Handbag",
    imageUrl: "",
    brand: "Michael Kors",
    price: "Rs.2200",
    category: "accessories",
    color: "black",
    season: ["spring", "summer", "autumn", "winter"],
    buyUrl: "https://www.michaelkors.com/black-handbag-example" // REPLACE WITH YOUR ACTUAL LINK
  },

  // SHOES - Add your actual store links here
  {
    id: 15,
    name: "White Sneakers",
    imageUrl: "",
    brand: "Nike",
    price: "Rs.1800",
    category: "shoes",
    color: "white",
    season: ["spring", "summer", "autumn"],
    buyUrl: "https://www.nike.com/us/en_us/white-sneakers-example" // REPLACE WITH YOUR ACTUAL LINK
  },
  {
    id: 16,
    name: "Black Heels",
    imageUrl: "",
    brand: "Zara",
    price: "Rs.2500",
    category: "shoes",
    color: "black",
    season: ["spring", "summer", "autumn", "winter"],
    buyUrl: "https://www.zara.com/us/en/black-heels-example" // REPLACE WITH YOUR ACTUAL LINK
  }
];

// Helper function to extract image URL from product page
export const extractImageFromUrl = (url: string): string => {
  // For now, return empty string - you can add actual image URLs here
  // or we can implement image extraction logic later
  return "";
};
