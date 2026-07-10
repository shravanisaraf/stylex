import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Gender = 'women' | 'men';
export type Category = 'womens-tops' | 'womens-bottoms' | 'mens-tops' | 'mens-bottoms';

export interface ClothingItem {
  id: number;
  productId: string;          // e.g. W-T-001
  name: string;
  imageUrl: string;
  brand: string;
  price: string;
  category: Category;
  gender: Gender;
  color: string;
  secondaryColor?: string;
  material?: string;
  fit?: string;
  pattern?: string;
  style?: string;
  occasion?: string;
  season: string[];
  searchKeywords?: string;
  referenceUrl?: string;
  shopLink: string;           // placeholder for future affiliate links
  buyUrl: string;             // legacy — kept for compatibility
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
      navigator.share({
        title: 'chér Outfit',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Outfit link copied to clipboard!');
    }
  };

  return (
    <StyleContext.Provider
      value={{
        favoriteItems,
        toggleItemFavorite,
        shareOutfit,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  'womens-tops': "Women's Tops",
  'womens-bottoms': "Women's Bottoms",
  'mens-tops': "Men's Tops",
  'mens-bottoms': "Men's Bottoms",
};
