import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ShopLink {
  store: string;
  url: string;
  price: string;
}

export interface ClothingItem {
  id: number;
  name: string;
  imageUrl: string;
  brand: string;
  price: string;
  category: 'tops' | 'bottoms' | 'jackets' | 'dresses' | 'accessories' | 'shoes';
  color: string;
  season: string[];
  buyUrl: string;
  shopLinks?: ShopLink[]; // similar real products across partner stores
}

interface StyleContextType {
  favoriteItems: number[];
  toggleItemFavorite: (itemId: number) => void;
  shareOutfit: (items: ClothingItem[]) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteItems, setFavoriteItems] = useState<number[]>([]);

  const toggleItemFavorite = (itemId: number) => {
    setFavoriteItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const shareOutfit = (items: ClothingItem[]) => {
    const itemNames = items.map(item => item.name).join(' + ');
    const shareText = `Check out this outfit combo: ${itemNames} from chér!`;
    if (navigator.share) {
      navigator.share({ title: 'chér Outfit', text: shareText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Outfit link copied to clipboard!');
    }
  };

  return (
    <StyleContext.Provider value={{ favoriteItems, toggleItemFavorite, shareOutfit }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) throw new Error('useStyle must be used within a StyleProvider');
  return context;
};
