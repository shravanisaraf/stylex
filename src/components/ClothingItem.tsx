
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
    <div className="flex items-center space-x-8">
      {/* Image Container - Made Bigger */}
      <div className="w-48 h-48 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center flex-shrink-0">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-center p-6">
            <div className="text-5xl text-neutral-400 mb-3">
              {type === 'top' ? '👕' : '👖'}
            </div>
            <p className="text-sm text-neutral-400 font-light">
              Image required
            </p>
          </div>
        )}
      </div>
      
      {/* Item Info */}
      <div className="flex-1">
        <h3 className="text-xl font-medium text-neutral-900 mb-2">{item.name}</h3>
        <p className="text-base text-neutral-600 mb-3 font-light">{item.brand}</p>
        <p className="text-xl font-medium text-neutral-900">{item.price}</p>
      </div>
    </div>
  );
};

export default ClothingItem;
