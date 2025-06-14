import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ClothingItem from '../components/ClothingItem';
import OutfitDisplay from '../components/OutfitDisplay';
import RandomMixButton from '../components/RandomMixButton';
import FilterPanel, { FilterState } from '../components/FilterPanel';
import { useStyle } from '../contexts/StyleContext';
import { ClothingItem as ClothingItemType } from '../contexts/StyleContext';
import { clothingItems } from '../data/clothingData';

const Index = () => {
  // Use the clothing data from our separate file
  const allClothingItems: ClothingItemType[] = clothingItems;

  const [filters, setFilters] = useState<FilterState>({
    selectedCategories: ['tops', 'bottoms'],
    // Default to just tops and bottoms
    categories: [],
    colors: [],
    brands: [],
    priceRange: {
      min: 0,
      max: 10000
    },
    seasons: []
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

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }

      // Color filter
      if (filters.colors.length > 0 && !filters.colors.includes(item.color)) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(item.brand)) {
        return false;
      }

      // Price filter
      const price = parseInt(item.price.replace('Rs.', ''));
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false;
      }

      // Season filter
      if (filters.seasons.length > 0 && !filters.seasons.some(season => item.season.includes(season))) {
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

  // Get available brands for filter
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

  return <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-light tracking-wide text-neutral-900">chér</h1>
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
        </div>
      </section>

      {/* Wardrobe Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light text-neutral-900 mb-4">Curate your style</h3>
            <p className="text-neutral-600 font-light">Organize your wardrobe and discover new combinations</p>
          </div>

          {/* Filter Panel */}
          <FilterPanel filters={filters} onFiltersChange={setFilters} availableBrands={availableBrands} />

          <div className="space-y-12">
            {/* Category Sections - Only show selected categories */}
            {filters.selectedCategories.map(category => {
            const items = itemsByCategory[category] || [];
            const currentItem = getCurrentItem(category);
            const currentIndex = currentIndices[category] || 0;
            if (items.length === 0) return null;
            return <div key={category} className="bg-white rounded-lg border border-neutral-200 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-medium text-neutral-900 tracking-wide uppercase">
                      {category}
                    </h4>
                    <div className="flex items-center space-x-4">
                      <button onClick={() => navigateCategory(category, 'prev')} className="p-2 border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors" aria-label={`Previous ${category}`}>
                        <ArrowLeft className="w-4 h-4 text-neutral-600" />
                      </button>
                      <span className="text-sm text-neutral-500 font-light">
                        {currentIndex + 1} / {items.length}
                      </span>
                      <button onClick={() => navigateCategory(category, 'next')} className="p-2 border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors" aria-label={`Next ${category}`}>
                        <ArrowRight className="w-4 h-4 text-neutral-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-8">
                    <button onClick={() => navigateCategory(category, 'prev')} className="p-4 hover:bg-neutral-50 transition-colors rounded-full" aria-label={`Previous ${category}`}>
                      <ArrowLeft className="w-8 h-8 text-neutral-400" />
                    </button>
                    
                    <div className="flex-1 max-w-md">
                      <ClothingItem item={currentItem} type={category as any} />
                      <div className="text-center mt-6">
                        <h3 className="text-xl font-medium text-neutral-900 mb-2">{currentItem.name}</h3>
                        <p className="text-base text-neutral-600 mb-3 font-light">{currentItem.brand}</p>
                        <p className="text-xl font-medium text-neutral-900">{currentItem.price}</p>
                      </div>
                    </div>
                    
                    <button onClick={() => navigateCategory(category, 'next')} className="p-4 hover:bg-neutral-50 transition-colors rounded-full" aria-label={`Next ${category}`}>
                      <ArrowRight className="w-8 h-8 text-neutral-400" />
                    </button>
                  </div>
                </div>;
          })}

            {/* Random Mix Button */}
            {Object.keys(itemsByCategory).length > 0 && <div className="flex justify-center pt-6">
                <RandomMixButton onRandomMix={handleRandomMix} />
              </div>}

            {/* Outfit Display */}
            {currentOutfitItems.length > 0 && <div className="bg-white rounded-lg border border-neutral-200 p-8">
                <div className="text-center mb-8">
                  <h4 className="text-lg font-medium text-neutral-900 tracking-wide mb-2">YOUR CURATED LOOK</h4>
                  <p className="text-neutral-600 font-light text-sm">Complete look ready to wear</p>
                </div>
                <OutfitDisplay items={currentOutfitItems} />
              </div>}

            {/* No items message */}
            {filters.selectedCategories.length === 0 && <div className="text-center py-12">
                <p className="text-lg text-neutral-600 font-light">
                  Please select at least one clothing category to get started.
                </p>
              </div>}

            {filters.selectedCategories.length > 0 && Object.keys(itemsByCategory).length === 0 && <div className="text-center py-12">
                <p className="text-lg text-neutral-600 font-light">
                  No items match your current selection. Try adjusting your categories or filters.
                </p>
              </div>}
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
        </div>
      </section>
    </div>;
};

export default Index;
