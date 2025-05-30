import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
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
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light tracking-wide text-neutral-900">STYLEX</h1>
            <button className="bg-neutral-900 text-white px-6 py-2 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors">
              GET THE APP →
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6 leading-tight">
            The <em className="italic">one-stop</em> digital wardrobe app
          </h2>
          <p className="text-lg text-neutral-600 mb-8 font-light">
            <em className="italic">unlocking the potential</em> of what you already own
          </p>
          <button className="bg-white border border-neutral-300 text-neutral-900 px-8 py-3 text-sm font-medium tracking-wide hover:bg-neutral-50 transition-colors">
            GET THE APP →
          </button>
        </div>
      </section>

      {/* Wardrobe Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light text-neutral-900 mb-4">Curate your style</h3>
            <p className="text-neutral-600 font-light">Organize your wardrobe and discover new combinations</p>
          </div>

          <div className="space-y-12">
            {/* Tops Section */}
            <div className="bg-white rounded-lg border border-neutral-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-medium text-neutral-900 tracking-wide">TOPS</h4>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={prevTop}
                    className="p-2 border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
                    aria-label="Previous top"
                  >
                    <ArrowLeft className="w-4 h-4 text-neutral-600" />
                  </button>
                  <span className="text-sm text-neutral-500 font-light">
                    {currentTopIndex + 1} / {tops.length}
                  </span>
                  <button
                    onClick={nextTop}
                    className="p-2 border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
                    aria-label="Next top"
                  >
                    <ArrowRight className="w-4 h-4 text-neutral-600" />
                  </button>
                </div>
              </div>
              <ClothingItem item={currentTop} type="top" />
            </div>

            {/* Bottoms Section */}
            <div className="bg-white rounded-lg border border-neutral-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-medium text-neutral-900 tracking-wide">BOTTOMS</h4>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={prevBottom}
                    className="p-2 border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
                    aria-label="Previous bottom"
                  >
                    <ArrowLeft className="w-4 h-4 text-neutral-600" />
                  </button>
                  <span className="text-sm text-neutral-500 font-light">
                    {currentBottomIndex + 1} / {bottoms.length}
                  </span>
                  <button
                    onClick={nextBottom}
                    className="p-2 border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
                    aria-label="Next bottom"
                  >
                    <ArrowRight className="w-4 h-4 text-neutral-600" />
                  </button>
                </div>
              </div>
              <ClothingItem item={currentBottom} type="bottom" />
            </div>

            {/* Outfit Display */}
            <div className="bg-white rounded-lg border border-neutral-200 p-8">
              <div className="text-center mb-8">
                <h4 className="text-lg font-medium text-neutral-900 tracking-wide mb-2">YOUR OUTFIT</h4>
                <p className="text-neutral-600 font-light text-sm">Complete look ready to wear</p>
              </div>
              <OutfitDisplay top={currentTop} bottom={currentBottom} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-light text-white mb-4">
            Know what you own, <em className="italic">love</em> what you wear
          </h3>
          <p className="text-neutral-400 mb-8 font-light">
            Discover endless styling possibilities with pieces you already have
          </p>
          <button className="bg-white text-neutral-900 px-8 py-3 text-sm font-medium tracking-wide hover:bg-neutral-100 transition-colors">
            START STYLING
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
