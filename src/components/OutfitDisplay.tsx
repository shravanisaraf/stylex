
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from 'lucide-react';

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
    <Card className="bg-white/80 backdrop-blur-md shadow-2xl border border-white/50 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 p-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-t-lg p-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <h3 className="text-lg font-light tracking-wider text-gray-800">SIGNATURE ENSEMBLE</h3>
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Curated for you</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Combined Outfit Display */}
            <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl p-8 min-h-[400px] flex flex-col items-center justify-center border border-gray-100/50 shadow-inner">
              
              {/* Top Image */}
              <div className="w-36 h-36 mb-6 bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden border border-gray-100/50 transform hover:scale-105 transition-transform duration-300">
                {top.imageUrl ? (
                  <img
                    src={top.imageUrl}
                    alt={top.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <span className="text-4xl mb-2 block">👕</span>
                    <p className="text-xs text-gray-400 font-light">Top</p>
                    {/* PASTE TOP IMAGE URL */}
                  </div>
                )}
              </div>

              {/* Connection Line */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400 mb-6"></div>

              {/* Bottom Image */}
              <div className="w-36 h-36 bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden border border-gray-100/50 transform hover:scale-105 transition-transform duration-300">
                {bottom.imageUrl ? (
                  <img
                    src={bottom.imageUrl}
                    alt={bottom.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <span className="text-4xl mb-2 block">👖</span>
                    <p className="text-xs text-gray-400 font-light">Bottom</p>
                    {/* PASTE BOTTOM IMAGE URL */}
                  </div>
                )}
              </div>

              {/* Price Overlay */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-100/50">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-light">Total Investment</p>
                <p className="text-xl font-light bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                  Rs.{totalPrice.toLocaleString()}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-rose-300 rounded-full opacity-60"></div>
              <div className="absolute bottom-4 left-6 w-2 h-2 bg-amber-300 rounded-full opacity-60"></div>
              <div className="absolute top-8 right-20 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-60"></div>
            </div>

            {/* Outfit Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 p-4 bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl border border-rose-100/50">
                  <p className="font-light text-gray-800 text-lg">{top.name}</p>
                  <p className="text-gray-600 text-sm font-light">{top.brand}</p>
                  <p className="text-rose-600 font-medium">{top.price}</p>
                </div>
                <div className="space-y-2 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100/50">
                  <p className="font-light text-gray-800 text-lg">{bottom.name}</p>
                  <p className="text-gray-600 text-sm font-light">{bottom.brand}</p>
                  <p className="text-purple-600 font-medium">{bottom.price}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <button className="group w-full bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 text-white py-4 rounded-2xl font-light text-lg tracking-wide hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    <Heart className="w-5 h-5" />
                    <span>Save to Favorites</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutfitDisplay;
