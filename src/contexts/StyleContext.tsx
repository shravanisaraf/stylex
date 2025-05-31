
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClothingItem {
  id: number;
  name: string;
  imageUrl: string;
  brand: string;
  price: string;
}

interface StyleContextType {
  favoriteItems: number[];
  toggleItemFavorite: (itemId: number) => void;
  shareOutfit: (top: ClothingItem, bottom: ClothingItem) => void;
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

  const shareOutfit = (top: ClothingItem, bottom: ClothingItem) => {
    const shareText = `Check out this outfit combo: ${top.name} + ${bottom.name} from STYLEX!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'STYLEX Outfit',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Outfit link copied to clipboard!');
    }
  };

  return (
    <StyleContext.Provider value={{
      favoriteItems,
      toggleItemFavorite,
      shareOutfit
    }}>
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
