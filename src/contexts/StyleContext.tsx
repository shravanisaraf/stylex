
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClothingItem {
  id: number;
  name: string;
  imageUrl: string;
  brand: string;
  price: string;
}

interface Outfit {
  id: string;
  top: ClothingItem;
  bottom: ClothingItem;
  createdAt: Date;
  isFavorite?: boolean;
}

interface StyleContextType {
  favoriteItems: number[];
  favoriteOutfits: string[];
  outfitHistory: Outfit[];
  toggleItemFavorite: (itemId: number) => void;
  toggleOutfitFavorite: (outfitId: string) => void;
  addToHistory: (top: ClothingItem, bottom: ClothingItem) => void;
  shareOutfit: (top: ClothingItem, bottom: ClothingItem) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteItems, setFavoriteItems] = useState<number[]>([]);
  const [favoriteOutfits, setFavoriteOutfits] = useState<string[]>([]);
  const [outfitHistory, setOutfitHistory] = useState<Outfit[]>([]);

  const toggleItemFavorite = (itemId: number) => {
    setFavoriteItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleOutfitFavorite = (outfitId: string) => {
    setFavoriteOutfits(prev => 
      prev.includes(outfitId) 
        ? prev.filter(id => id !== outfitId)
        : [...prev, outfitId]
    );
  };

  const addToHistory = (top: ClothingItem, bottom: ClothingItem) => {
    const outfitId = `${top.id}-${bottom.id}-${Date.now()}`;
    const newOutfit: Outfit = {
      id: outfitId,
      top,
      bottom,
      createdAt: new Date()
    };
    
    setOutfitHistory(prev => [newOutfit, ...prev.slice(0, 9)]); // Keep last 10
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
      favoriteOutfits,
      outfitHistory,
      toggleItemFavorite,
      toggleOutfitFavorite,
      addToHistory,
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
