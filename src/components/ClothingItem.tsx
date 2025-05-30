
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="border-0 shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="space-y-6">
          {/* Image Container */}
          <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl overflow-hidden aspect-square flex items-center justify-center shadow-inner border border-gray-100/50">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <span className="text-gray-500 text-3xl">
                    {type === 'top' ? '👕' : '👖'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm font-light italic">
                  {type === 'top' ? 'Top Image Placeholder' : 'Bottom Image Placeholder'}
                </p>
                <p className="text-xs text-gray-300 mt-2 uppercase tracking-wider">
                  {/* PASTE {type.toUpperCase()} IMAGE URL IN THE DATA ABOVE */}
                  Image URL Required
                </p>
              </div>
            )}
            
            {/* Elegant overlay for image placeholder */}
            {!item.imageUrl && (
              <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent"></div>
            )}
          </div>
          
          {/* Item Info */}
          <div className="space-y-3 text-center">
            <h3 className="font-light text-xl text-gray-800 tracking-wide">{item.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-light tracking-wider uppercase">{item.brand}</span>
              <span className="font-medium text-lg bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                {item.price}
              </span>
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 mx-auto"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClothingItem;
