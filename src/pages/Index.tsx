
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Heart } from 'lucide-react';
import ClothingItem from '../components/ClothingItem';
import OutfitDisplay from '../components/OutfitDisplay';

const Index = () => {
  // Sample data - replace image URLs with actual clothing images
  const tops = [
    {
      id: 1,
      name: "White Blouse",
      imageUrl: "", // PASTE TOP IMAGE URL HERE
      brand: "Brand 1",
      price: "Rs.990"
    },
    {
      id: 2,
      name: "Red Sweater",
      imageUrl: "", // PASTE TOP IMAGE URL HERE
      brand: "Brand 2",
      price: "Rs.1200"
    },
    {
      id: 3,
      name: "Blue Shirt",
      imageUrl: "", // PASTE TOP IMAGE URL HERE
      brand: "Brand 3",
      price: "Rs.850"
    },
    {
      id: 4,
      name: "Black Top",
      imageUrl: "", // PASTE TOP IMAGE URL HERE
      brand: "Brand 4",
      price: "Rs.1100"
    }
  ];

  const bottoms = [
    {
      id: 1,
      name: "Dark Jeans",
      imageUrl: "", // PASTE BOTTOM IMAGE URL HERE
      brand: "Brand 1",
      price: "Rs.1750"
    },
    {
      id: 2,
      name: "Black Skirt",
      imageUrl: "", // PASTE BOTTOM IMAGE URL HERE
      brand: "Brand 2",
      price: "Rs.1100"
    },
    {
      id: 3,
      name: "Navy Pants",
      imageUrl: "", // PASTE BOTTOM IMAGE URL HERE
      brand: "Brand 3",
      price: "Rs.1400"
    },
    {
      id: 4,
      name: "Denim Skirt",
      imageUrl: "", // PASTE BOTTOM IMAGE URL HERE
      brand: "Brand 4",
      price: "Rs.950"
    }
  ];

  const [currentTopIndex, setCurrentTopIndex] = useState(0);
  const [currentBottomIndex, setCurrentBottomIndex] = useState(0);

  const nextTop = () => {
    setCurrentTopIndex((prev) => (prev + 1) % tops.length);
  };

  const prevTop = () => {
    setCurrentTopIndex((prev) => (prev - 1 + tops.length) % tops.length);
  };

  const nextBottom = () => {
    setCurrentBottomIndex((prev) => (prev + 1) % bottoms.length);
  };

  const prevBottom = () => {
    setCurrentBottomIndex((prev) => (prev - 1 + bottoms.length) % bottoms.length);
  };

  const currentTop = tops[currentTopIndex];
  const currentBottom = bottoms[currentBottomIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-rose-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg border-b border-rose-100/50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3">
                  <Sparkles className="text-white text-2xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
                  ATELIER
                </h1>
                <p className="text-sm font-medium text-gray-600 tracking-widest">DIGITAL CLOSET</p>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-600 font-light italic">Curate your perfect ensemble with timeless elegance</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-12">
          
          {/* Tops Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-800 mb-2">Tops</h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-rose-400 to-amber-400 mx-auto"></div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevTop}
                  className="group p-4 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 hover:from-rose-200 hover:to-amber-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="Previous top"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {tops.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentTopIndex 
                            ? 'bg-gradient-to-r from-rose-400 to-amber-400 w-6' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-3 font-light">
                    {currentTopIndex + 1} of {tops.length}
                  </span>
                </div>
                
                <button
                  onClick={nextTop}
                  className="group p-4 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 hover:from-rose-200 hover:to-amber-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="Next top"
                >
                  <ArrowRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
                </button>
              </div>
              <ClothingItem item={currentTop} type="top" />
            </div>
          </div>

          {/* Bottoms Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-800 mb-2">Bottoms</h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevBottom}
                  className="group p-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="Previous bottom"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {bottoms.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentBottomIndex 
                            ? 'bg-gradient-to-r from-purple-400 to-pink-400 w-6' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-3 font-light">
                    {currentBottomIndex + 1} of {bottoms.length}
                  </span>
                </div>
                
                <button
                  onClick={nextBottom}
                  className="group p-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="Next bottom"
                >
                  <ArrowRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
                </button>
              </div>
              <ClothingItem item={currentBottom} type="bottom" />
            </div>
          </div>

          {/* Outfit Display */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-800 mb-2">Your Curated Look</h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-rose-400 via-purple-400 to-amber-400 mx-auto"></div>
            </div>
            <OutfitDisplay top={currentTop} bottom={currentBottom} />
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 text-white px-10 py-4 rounded-full font-medium shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <Heart className="w-5 h-5 mr-3 animate-pulse" />
            <span className="bg-white/20 px-4 py-1 rounded-full text-xs mr-4 font-light tracking-wider">EXCLUSIVE</span>
            DISCOVER MORE COLLECTIONS
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
