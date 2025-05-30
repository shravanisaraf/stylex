
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">C</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-800">THE CLOSET APP</h1>
            </div>
          </div>
          <p className="text-center text-slate-600 mt-2">Mix & Match Your Perfect Outfit</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tops Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 text-center">Tops</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevTop}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  aria-label="Previous top"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <span className="text-sm text-slate-500">
                  {currentTopIndex + 1} of {tops.length}
                </span>
                <button
                  onClick={nextTop}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  aria-label="Next top"
                >
                  <ArrowRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <ClothingItem item={currentTop} type="top" />
            </div>
          </div>

          {/* Outfit Display */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 text-center">Your Outfit</h2>
            <OutfitDisplay top={currentTop} bottom={currentBottom} />
          </div>

          {/* Bottoms Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 text-center">Bottoms</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevBottom}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  aria-label="Previous bottom"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <span className="text-sm text-slate-500">
                  {currentBottomIndex + 1} of {bottoms.length}
                </span>
                <button
                  onClick={nextBottom}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  aria-label="Next bottom"
                >
                  <ArrowRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <ClothingItem item={currentBottom} type="bottom" />
            </div>
          </div>
        </div>

        {/* Browse Button */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-700">
            <span className="bg-blue-500 px-3 py-1 rounded-full text-xs mr-3">NEW</span>
            BROWSE MORE STYLES
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
