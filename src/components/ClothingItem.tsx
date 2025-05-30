
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
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <div className="space-y-4">
          {/* Image Container */}
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-slate-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-slate-500 text-2xl">👕</span>
                </div>
                <p className="text-slate-500 text-sm">
                  {/* PASTE {type.toUpperCase()} IMAGE URL IN THE DATA ABOVE */}
                  {type === 'top' ? 'Top Image Here' : 'Bottom Image Here'}
                </p>
              </div>
            )}
          </div>
          
          {/* Item Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-800">{item.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{item.brand}</span>
              <span className="font-medium text-blue-600">{item.price}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClothingItem;
