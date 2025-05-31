
import React from 'react';
import FavoriteButton from './FavoriteButton';
import { useStyle } from '../contexts/StyleContext';

interface ClothingItemProps {
  item: {
    id: number;
    name: string;
    imageUrl: string;
    brand: string;
    price: string;
  };
  type: 'top' | 'bottom';
}

const ClothingItem: React.FC<ClothingItemProps> = ({ item, type }) => {
  const { favoriteItems, toggleItemFavorite } = useStyle();
  const isFavorite = favoriteItems.includes(item.id);

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-80 h-80 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-center p-8">
            <div className="text-8xl text-neutral-400 mb-4">
              {type === 'top' ? '👕' : '👖'}
            </div>
            <p className="text-lg text-neutral-400 font-light">
              Image required
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
    </div>
  );
};

export default ClothingItem;
