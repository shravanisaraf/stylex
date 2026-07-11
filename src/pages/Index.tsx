
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
  const [gender, setGender] = useState<'women' | 'men' | null>(null);
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
    selectedCategories: ['tops', 'bottoms'],
    colors: []
  });
  const [currentIndices, setCurrentIndices] = useState<{
    [key: string]: number;
  }>({});

  // Filter items based on current filters and selected categories
  const filteredItems = useMemo(() => {
    return allClothingItems.filter(item => {
      if (gender && item.gender !== gender) return false;
      if (!filters.selectedCategories.includes(item.category)) return false;
      if (filters.colors.length > 0 && !filters.colors.includes(item.color)) return false;
      return true;
    });
  }, [allClothingItems, filters, gender]);

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

  if (!gender) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white px-6">
        <h1 className="text-5xl font-extralight tracking-[0.2em] text-black mb-4">chér</h1>
        <p className="text-gray-500 font-light mb-16 tracking-wide">Choose your section to begin</p>
        <div className="flex gap-6 w-full max-w-2xl">
          <button
            onClick={() => setGender('women')}
            className="flex-1 aspect-square border border-black bg-white hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center text-2xl font-light tracking-[0.3em] uppercase"
          >
            Women
          </button>
          <button
            onClick={() => setGender('men')}
            className="flex-1 aspect-square border border-black bg-white hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center text-2xl font-light tracking-[0.3em] uppercase"
          >
            Men
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center gap-3">
              <HamburgerMenu />
              <div className="hidden sm:flex items-center border border-gray-200 rounded-full overflow-hidden text-xs tracking-[0.2em] uppercase">
                <button onClick={() => setGender('women')} className={`px-4 py-1.5 transition ${gender==='women' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Women</button>
                <button onClick={() => setGender('men')} className={`px-4 py-1.5 transition ${gender==='men' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Men</button>
              </div>
            </div>
            <h1 className="text-3xl font-extralight tracking-[0.2em] text-black">chér</h1>
            <div className="flex-1 flex justify-end">
              <UserProfile />
            </div>
          </div>
        </div>
      </header>


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
