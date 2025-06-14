
import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Palette } from 'lucide-react';
import ClothingItem from '../components/ClothingItem';
import OutfitDisplay from '../components/OutfitDisplay';
import RandomMixButton from '../components/RandomMixButton';
import FilterPanel, { FilterState } from '../components/FilterPanel';
import UserProfile from '../components/UserProfile';
import SignOutButton from '../components/SignOutButton';
import ColorAnalysisQuiz from '../components/ColorAnalysisQuiz';
import HamburgerMenu from '../components/HamburgerMenu';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { useStyle } from '../contexts/StyleContext';
import { ClothingItem as ClothingItemType } from '../contexts/StyleContext';
import { clothingItems } from '../data/clothingData';

const Index = () => {
  // Use the clothing data from our separate file
  const allClothingItems: ClothingItemType[] = clothingItems;
  const [showColorQuiz, setShowColorQuiz] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    selectedCategories: ['tops', 'bottoms'],
    colors: []
  });
  const [currentIndices, setCurrentIndices] = useState<{
    [key: string]: number;
  }>({});

  // Filter items based on current filters and selected categories
  const filteredItems = useMemo(() => {
    return allClothingItems.filter(item => {
      // First filter by selected categories
      if (!filters.selectedCategories.includes(item.category)) {
        return false;
      }

      // Color filter
      if (filters.colors.length > 0 && !filters.colors.includes(item.color)) {
        return false;
      }

      return true;
    });
  }, [allClothingItems, filters]);

  // Group filtered items by category, but only show selected categories
  const itemsByCategory = useMemo(() => {
    const grouped: {
      [key: string]: ClothingItemType[];
    } = {};
    filteredItems.forEach(item => {
      if (filters.selectedCategories.includes(item.category)) {
        if (!grouped[item.category]) {
          grouped[item.category] = [];
        }
        grouped[item.category].push(item);
      }
    });
    return grouped;
  }, [filteredItems, filters.selectedCategories]);

  // Get available brands for filter (keeping the prop even though we don't use it now)
  const availableBrands = useMemo(() => {
    return [...new Set(allClothingItems.map(item => item.brand))].sort();
  }, [allClothingItems]);

  const getCurrentItem = (category: string) => {
    const items = itemsByCategory[category] || [];
    if (items.length === 0) return null;
    const index = currentIndices[category] || 0;
    return items[Math.min(index, items.length - 1)];
  };

  const navigateCategory = (category: string, direction: 'next' | 'prev') => {
    const items = itemsByCategory[category] || [];
    if (items.length === 0) return;
    const currentIndex = currentIndices[category] || 0;
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % items.length;
    } else {
      newIndex = (currentIndex - 1 + items.length) % items.length;
    }
    setCurrentIndices(prev => ({
      ...prev,
      [category]: newIndex
    }));
  };

  const handleRandomMix = () => {
    const newIndices: {
      [key: string]: number;
    } = {};
    Object.keys(itemsByCategory).forEach(category => {
      const items = itemsByCategory[category];
      if (items.length > 0) {
        newIndices[category] = Math.floor(Math.random() * items.length);
      }
    });
    setCurrentIndices(newIndices);
  };

  // Get current outfit items for display
  const currentOutfitItems = Object.keys(itemsByCategory).map(category => getCurrentItem(category)).filter(item => item !== null) as ClothingItemType[];

  const handleApplyColorAnalysis = (colors: string[]) => {
    setFilters(prev => ({
      ...prev,
      colors: colors
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header with subtle shadow */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <HamburgerMenu />
            </div>
            <h1 className="text-3xl font-extralight tracking-[0.2em] text-black">chér</h1>
            <div className="flex-1 flex justify-end">
              <UserProfile />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with refined typography */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-extralight text-black mb-8 leading-[1.1] tracking-tight">
            The <em className="italic font-light">one-stop</em> digital wardrobe app
          </h2>
          <p className="text-xl text-gray-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            <em className="italic">unlocking the potential</em> of what you already own
          </p>
          <div className="w-24 h-px bg-black mx-auto"></div>
        </div>
      </section>

      {/* Divider */}
      <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Wardrobe Section with improved spacing */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          {/* Color Analysis Section */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-light text-black mb-4 tracking-wide">Discover Your Perfect Colors</h3>
            <p className="text-gray-600 font-light text-lg mb-8">Take our color analysis quiz to find the colors that make you shine</p>
            <Button 
              onClick={() => setShowColorQuiz(true)}
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg font-light tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl border-0"
            >
              <Palette className="w-5 h-5 mr-2" />
              Take Color Analysis Quiz
            </Button>
          </div>

          {/* Subtle Divider */}
          <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-16" />

          <div className="text-center mb-16">
            <h3 className="text-3xl font-light text-black mb-6 tracking-wide">Curate your style</h3>
            <p className="text-gray-600 font-light text-lg">Organize your wardrobe and discover new combinations</p>
          </div>

          {/* Filter Panel */}
          <FilterPanel filters={filters} onFiltersChange={setFilters} availableBrands={availableBrands} />

          <div className="space-y-16">
            {/* Category Sections - Enhanced design */}
            {filters.selectedCategories.map(category => {
            const items = itemsByCategory[category] || [];
            const currentItem = getCurrentItem(category);
            const currentIndex = currentIndices[category] || 0;
            if (items.length === 0) return null;
            return <div key={category} className="bg-white rounded-2xl border border-gray-100 p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-12">
                    <h4 className="text-xl font-light text-black tracking-[0.15em] uppercase">
                      {category}
                    </h4>
                    <div className="flex items-center space-x-6">
                      <button onClick={() => navigateCategory(category, 'prev')} className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group" aria-label={`Previous ${category}`}>
                        <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
                      </button>
                      <span className="text-sm text-gray-500 font-light min-w-[4rem] text-center">
                        {currentIndex + 1} / {items.length}
                      </span>
                      <button onClick={() => navigateCategory(category, 'next')} className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group" aria-label={`Next ${category}`}>
                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-12">
                    <button onClick={() => navigateCategory(category, 'prev')} className="p-6 hover:bg-gray-50 transition-all duration-200 rounded-full group" aria-label={`Previous ${category}`}>
                      <ArrowLeft className="w-10 h-10 text-gray-300 group-hover:text-gray-600 transition-colors" />
                    </button>
                    
                    <div className="flex-1 max-w-md">
                      <ClothingItem item={currentItem} type={category as any} />
                      <div className="text-center mt-8">
                        <h3 className="text-2xl font-light text-black mb-3 tracking-wide">{currentItem.name}</h3>
                        <p className="text-lg text-gray-500 mb-4 font-light">{currentItem.brand}</p>
                        <p className="text-2xl font-medium text-black tracking-wide">{currentItem.price}</p>
                      </div>
                    </div>
                    
                    <button onClick={() => navigateCategory(category, 'next')} className="p-6 hover:bg-gray-50 transition-all duration-200 rounded-full group" aria-label={`Next ${category}`}>
                      <ArrowRight className="w-10 h-10 text-gray-300 group-hover:text-gray-600 transition-colors" />
                    </button>
                  </div>
                </div>;
          })}

            {/* Random Mix Button - Enhanced style */}
            {Object.keys(itemsByCategory).length > 0 && <div className="flex justify-center pt-8">
                <RandomMixButton onRandomMix={handleRandomMix} />
              </div>}

            {/* Outfit Display - Enhanced container */}
            {currentOutfitItems.length > 0 && <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl border border-gray-200 p-12 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <div className="text-center mb-12">
                  <h4 className="text-xl font-light text-white tracking-[0.15em] mb-3 uppercase">Your Curated Look</h4>
                  <p className="text-gray-300 font-light">Complete look ready to wear</p>
                </div>
                <OutfitDisplay items={currentOutfitItems} />
              </div>}

            {/* No items message - Enhanced styling */}
            {filters.selectedCategories.length === 0 && <div className="text-center py-16">
                <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
                <p className="text-xl text-gray-500 font-light">
                  Please select at least one clothing category to get started.
                </p>
              </div>}

            {filters.selectedCategories.length > 0 && Object.keys(itemsByCategory).length === 0 && <div className="text-center py-16">
                <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
                <p className="text-xl text-gray-500 font-light">
                  No items match your current selection. Try adjusting your categories or filters.
                </p>
              </div>}
          </div>
        </div>
      </section>

      {/* Footer CTA - Enhanced with gradient */}
      <section className="bg-gradient-to-r from-black to-gray-900 py-24 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-light text-white mb-6 tracking-wide">
            Know what you own, <em className="italic">love</em> what you wear
          </h3>
          <p className="text-gray-300 mb-12 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Discover endless styling possibilities with pieces you already have
          </p>
          <div className="w-24 h-px bg-white/30 mx-auto"></div>
          
          {/* Made by credit */}
          <p className="text-gray-500 text-xs mt-8 font-light">
            Made by Shravani Saraf
          </p>
        </div>
        
        {/* Sign Out Button positioned at bottom right */}
        <div className="absolute bottom-6 right-6">
          <SignOutButton />
        </div>
      </section>

      {/* Color Analysis Quiz Modal */}
      <ColorAnalysisQuiz 
        isOpen={showColorQuiz} 
        onClose={() => setShowColorQuiz(false)} 
        onApplyToWardrobe={handleApplyColorAnalysis}
      />
    </div>
  );
};

export default Index;
