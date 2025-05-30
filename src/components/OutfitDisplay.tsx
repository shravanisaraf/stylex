
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface OutfitDisplayProps {
  top: {
    id: number;
    name: string;
    imageUrl: string;
    brand: string;
    price: string;
  };
  bottom: {
    id: number;
    name: string;
    imageUrl: string;
    brand: string;
    price: string;
  };
}

const OutfitDisplay: React.FC<OutfitDisplayProps> = ({ top, bottom }) => {
  const totalPrice = parseInt(top.price.replace('Rs.', '')) + parseInt(bottom.price.replace('Rs.', ''));

  return (
    <Card className="bg-white shadow-xl border-2 border-blue-100">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Combined Outfit Display */}
          <div className="relative bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center">
            
            {/* Top Image */}
            <div className="w-32 h-32 mb-4 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden">
              {top.imageUrl ? (
                <img
                  src={top.imageUrl}
                  alt={top.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <span className="text-3xl">👕</span>
                  <p className="text-xs text-slate-500 mt-1">Top</p>
                  {/* PASTE TOP IMAGE URL */}
                </div>
              )}
            </div>

            {/* Bottom Image */}
            <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden">
              {bottom.imageUrl ? (
                <img
                  src={bottom.imageUrl}
                  alt={bottom.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <span className="text-3xl">👖</span>
                  <p className="text-xs text-slate-500 mt-1">Bottom</p>
                  {/* PASTE BOTTOM IMAGE URL */}
                </div>
              )}
            </div>

            {/* Outfit Info Overlay */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
              <p className="text-xs text-slate-600 mb-1">Total Price</p>
              <p className="font-bold text-blue-600">Rs.{totalPrice}</p>
            </div>
          </div>

          {/* Outfit Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="font-medium text-slate-800">{top.name}</p>
                <p className="text-slate-600">{top.brand} • {top.price}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-slate-800">{bottom.name}</p>
                <p className="text-slate-600">{bottom.brand} • {bottom.price}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Save This Outfit
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutfitDisplay;
