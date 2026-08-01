
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import FindSimilarDialog from './FindSimilarDialog';
import { useStyle } from '../contexts/StyleContext';
import { ClothingItem as ClothingItemType } from '../contexts/StyleContext';

interface ClothingItemProps {
  item: ClothingItemType;
  type: string;
}

const ClothingItem: React.FC<ClothingItemProps> = ({ item, type }) => {
  const { favoriteItems, toggleItemFavorite } = useStyle();
  const isFavorite = favoriteItems.includes(item.id);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getEmojiForCategory = (category: string) => {
    switch (category) {
      case 'tops': return '👕';
      case 'bottoms': return '👖';
      case 'jackets': return '🧥';
      case 'dresses': return '👗';
      case 'accessories': return '👜';
      case 'shoes': return '👟';
      default: return '👕';
    }
  };

  const handleImageClick = () => setDialogOpen(true);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative w-full max-w-[260px] aspect-square bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center group">
        {item.imageUrl ? (
          <div 
            className="relative w-full h-full cursor-pointer overflow-hidden rounded-lg"
            onClick={handleImageClick}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-contain rounded-lg transition-transform group-hover:scale-105"
            />
            {/* Overlay with shop icon */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white rounded-full p-3">
                <ExternalLink className="w-6 h-6 text-neutral-900" />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="text-center p-8 cursor-pointer w-full h-full flex flex-col items-center justify-center hover:bg-neutral-200 transition-colors rounded-lg"
            onClick={handleImageClick}
          >
            <div className="text-8xl text-neutral-400 mb-4">
              {getEmojiForCategory(item.category)}
            </div>
            <p className="text-sm text-neutral-500 font-light tracking-wide uppercase">
              Tap to shop
            </p>
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <FavoriteButton 
            isFavorite={isFavorite}
            onToggle={() => toggleItemFavorite(item.id)}
          />
        </div>
      </div>
      <FindSimilarDialog item={item} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
};

export default ClothingItem;
