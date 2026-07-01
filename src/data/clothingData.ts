import { ClothingItem } from '../contexts/StyleContext';
import blackTee from '../assets/basics/black-tee.jpg';
import whiteTee from '../assets/basics/white-tee.jpg';
import blueJeans from '../assets/basics/blue-jeans.jpg';
import blackJeans from '../assets/basics/black-jeans.jpg';
import blackHoodie from '../assets/basics/black-hoodie.jpg';
import whiteSneakers from '../assets/basics/white-sneakers.jpg';

// AI-generated basics catalog. Each item lists real similar products
// across partner stores in `shopLinks` — that's what powers "Shop the Look".
export const clothingItems: ClothingItem[] = [
  // ===== TOPS =====
  {
    id: 101,
    name: 'Basic Black Tee',
    imageUrl: blackTee,
    brand: 'chér basics',
    price: '—',
    category: 'tops',
    color: 'black',
    season: ['spring', 'summer', 'autumn', 'winter'],
    buyUrl: 'https://www.myntra.com/tshirts?f=Color%3ABlack_000000&rawQuery=black%20crew%20neck%20tshirt',
    shopLinks: [
      { store: 'Myntra', url: 'https://www.myntra.com/tshirts?f=Color%3ABlack_000000&rawQuery=black%20crew%20neck%20tshirt', price: '₹499' },
      { store: 'AJIO', url: 'https://www.ajio.com/search/?text=black%20crew%20neck%20tshirt', price: '₹450' },
    ],
  },
  {
    id: 102,
    name: 'Basic White Tee',
    imageUrl: whiteTee,
    brand: 'chér basics',
    price: '—',
    category: 'tops',
    color: 'white',
    season: ['spring', 'summer', 'autumn', 'winter'],
    buyUrl: 'https://www.myntra.com/tshirts?rawQuery=white%20crew%20neck%20tshirt',
    shopLinks: [
      { store: 'Myntra', url: 'https://www.myntra.com/tshirts?rawQuery=white%20crew%20neck%20tshirt', price: '₹499' },
      { store: 'AJIO', url: 'https://www.ajio.com/search/?text=white%20crew%20neck%20tshirt', price: '₹450' },
    ],
  },
  {
    id: 103,
    name: 'Black Oversized Hoodie',
    imageUrl: blackHoodie,
    brand: 'chér basics',
    price: '—',
    category: 'tops',
    color: 'black',
    season: ['autumn', 'winter'],
    buyUrl: 'https://www.myntra.com/hoodies?f=Color%3ABlack_000000',
    shopLinks: [
      { store: 'Myntra', url: 'https://www.myntra.com/hoodies?f=Color%3ABlack_000000', price: '₹1,299' },
      { store: 'AJIO', url: 'https://www.ajio.com/search/?text=black%20oversized%20hoodie', price: '₹1,199' },
    ],
  },

  // ===== BOTTOMS =====
  {
    id: 201,
    name: 'Blue Straight Jeans',
    imageUrl: blueJeans,
    brand: 'chér basics',
    price: '—',
    category: 'bottoms',
    color: 'blue',
    season: ['spring', 'summer', 'autumn', 'winter'],
    buyUrl: 'https://www.myntra.com/jeans?rawQuery=blue%20straight%20jeans',
    shopLinks: [
      { store: 'Myntra', url: 'https://www.myntra.com/jeans?rawQuery=blue%20straight%20jeans', price: '₹1,299' },
      { store: "Levi's Official", url: 'https://www.levi.in/collections/mens-jeans', price: '₹2,499' },
    ],
  },
  {
    id: 202,
    name: 'Black Straight Jeans',
    imageUrl: blackJeans,
    brand: 'chér basics',
    price: '—',
    category: 'bottoms',
    color: 'black',
    season: ['spring', 'summer', 'autumn', 'winter'],
    buyUrl: 'https://www.myntra.com/jeans?f=Color%3ABlack_000000',
    shopLinks: [
      { store: 'Myntra', url: 'https://www.myntra.com/jeans?f=Color%3ABlack_000000', price: '₹1,399' },
      { store: 'AJIO', url: 'https://www.ajio.com/search/?text=black%20straight%20jeans', price: '₹1,199' },
    ],
  },

  // ===== SHOES =====
  {
    id: 301,
    name: 'White Sneakers',
    imageUrl: whiteSneakers,
    brand: 'chér basics',
    price: '—',
    category: 'shoes',
    color: 'white',
    season: ['spring', 'summer', 'autumn'],
    buyUrl: 'https://www.myntra.com/casual-shoes?rawQuery=white%20sneakers',
    shopLinks: [
      { store: 'Myntra', url: 'https://www.myntra.com/casual-shoes?rawQuery=white%20sneakers', price: '₹1,999' },
      { store: 'AJIO', url: 'https://www.ajio.com/search/?text=white%20sneakers', price: '₹1,799' },
    ],
  },
];
