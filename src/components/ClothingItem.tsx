
import React from 'react';

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
  return (
    <div className="flex items-center justify-center">
      {/* Centered Large Image Container */}
      <div className="w-80 h-80 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center">
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
      </div>
    </div>
  );
};

export default ClothingItem;
