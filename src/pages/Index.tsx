
import React, { useState, useMemo, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import WardrobeSection from '../components/WardrobeSection';
import FooterSection from '../components/FooterSection';
import UserProfile from '../components/UserProfile';
import ColorAnalysisQuiz from '../components/ColorAnalysisQuiz';
import HamburgerMenu from '../components/HamburgerMenu';
import Tutorial from '../components/Tutorial';
import { FilterState } from '../components/FilterPanel';
import { useStyle } from '../contexts/StyleContext';
import { ClothingItem as ClothingItemType } from '../contexts/StyleContext';
import { clothingItems } from '../data/clothingData';

const Index = () => {
  // Use the clothing data from our separate file
  const allClothingItems: ClothingItemType[] = clothingItems;
  const [showColorQuiz, setShowColorQuiz] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Show tutorial on first visit
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  const [filters, setFilters] = useState<FilterState>({
    selectedCategories: ['womens-tops', 'womens-bottoms', 'mens-tops', 'mens-bottoms'],
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

  // Get available brands for filter
  const availableBrands = useMemo(() => {
    return [...new Set(allClothingItems.map(item => item.brand))].sort();
  }, [allClothingItems]);

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
  const getCurrentItem = (category: string) => {
    const items = itemsByCategory[category] || [];
    if (items.length === 0) return null;
    const index = currentIndices[category] || 0;
    return items[Math.min(index, items.length - 1)];
  };

  const currentOutfitItems = Object.keys(itemsByCategory)
    .map(category => getCurrentItem(category))
    .filter(item => item !== null) as ClothingItemType[];

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

      <HeroSection />

      <WardrobeSection
        filters={filters}
        onFiltersChange={setFilters}
        availableBrands={availableBrands}
        filteredItems={filteredItems}
        itemsByCategory={itemsByCategory}
        currentIndices={currentIndices}
        onNavigateCategory={navigateCategory}
        onRandomMix={handleRandomMix}
        currentOutfitItems={currentOutfitItems}
        onOpenColorQuiz={() => setShowColorQuiz(true)}
        onOpenTutorial={() => setShowTutorial(true)}
      />

      <FooterSection />

      {/* Tutorial Modal */}
      <Tutorial isOpen={showTutorial} onClose={handleCloseTutorial} />

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
