
import React, { useState, useMemo, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import WardrobeSection from '../components/WardrobeSection';
import FooterSection from '../components/FooterSection';
import UserProfile from '../components/UserProfile';
import ColorAnalysisQuiz from '../components/ColorAnalysisQuiz';
import HamburgerMenu from '../components/HamburgerMenu';
import Tutorial from '../components/Tutorial';
import { FilterState } from '../components/FilterPanel';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ClothingItem as ClothingItemType } from '../contexts/StyleContext';
import { clothingItems } from '../data/clothingData';

type Step = 'home' | 'gender' | 'builder';

const Index = () => {
  const allClothingItems: ClothingItemType[] = clothingItems;
  const [step, setStep] = useState<Step>('home');
  const [gender, setGender] = useState<'women' | 'men' | null>(null);
  const [focusCategory, setFocusCategory] = useState<'tops' | 'bottoms'>('tops');
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
    colors: [],
    search: ''
  });
  const [currentIndices, setCurrentIndices] = useState<{
    [key: string]: number;
  }>({});

  // MVP: only tops and bottoms are available
  const filteredItems = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return allClothingItems.filter(item => {
      if (item.category !== 'tops' && item.category !== 'bottoms') return false;
      if (gender && item.gender !== gender) return false;
      if (filters.colors.length > 0 && !filters.colors.some(c => item.color.toLowerCase().includes(c))) return false;
      if (query) {
        const haystack = `${item.name} ${item.color} ${item.description || ''} ${item.searchKeywords || ''}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [allClothingItems, filters, gender]);

  const itemsByCategory = useMemo(() => {
    const grouped: { [key: string]: ClothingItemType[] } = {};
    filteredItems.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });
    return grouped;
  }, [filteredItems]);

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
    setCurrentIndices(prev => ({ ...prev, [category]: newIndex }));
  };

  const handleRandomMix = () => {
    const newIndices: { [key: string]: number } = {};
    Object.keys(itemsByCategory).forEach(category => {
      const items = itemsByCategory[category];
      if (items.length > 0) {
        newIndices[category] = Math.floor(Math.random() * items.length);
      }
    });
    setCurrentIndices(newIndices);
  };

  const getCurrentItem = (category: string) => {
    const items = itemsByCategory[category] || [];
    if (items.length === 0) return null;
    const index = currentIndices[category] || 0;
    return items[Math.min(index, items.length - 1)];
  };

  const currentOutfitItems = ['tops', 'bottoms']
    .map(category => getCurrentItem(category))
    .filter(item => item !== null) as ClothingItemType[];

  const handleApplyColorAnalysis = (colors: string[]) => {
    setFilters(prev => ({ ...prev, colors }));
  };

  const header = (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center gap-3">
            <HamburgerMenu />
            {step === 'builder' && (
              <div className="hidden sm:flex items-center border border-gray-200 rounded-full overflow-hidden text-xs tracking-[0.2em] uppercase">
                <button onClick={() => setGender('women')} className={`px-4 py-1.5 transition ${gender === 'women' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Women</button>
                <button onClick={() => setGender('men')} className={`px-4 py-1.5 transition ${gender === 'men' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Men</button>
              </div>
            )}
          </div>
          <button onClick={() => setStep('home')} className="text-3xl font-extralight tracking-[0.2em] text-black">Almaree</button>
          <div className="flex-1 flex justify-end">
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );

  const modals = (
    <>
      <Tutorial isOpen={showTutorial} onClose={handleCloseTutorial} />
      <ColorAnalysisQuiz
        isOpen={showColorQuiz}
        onClose={() => setShowColorQuiz(false)}
        onApplyToWardrobe={handleApplyColorAnalysis}
      />
    </>
  );

  // Step: choose section (women / men)
  if (step === 'gender') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
        {header}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
          <button
            onClick={() => setStep('home')}
            className="mb-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <p className="text-gray-500 font-light mb-12 tracking-[0.2em] uppercase text-xs">
            Choose your section
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
            {[
              { label: 'Women', value: 'women' },
              { label: 'Men', value: 'men' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => {
                  setGender(option.value as 'women' | 'men');
                  setStep('builder');
                }}
                className="flex-1 aspect-square border border-black bg-white hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center text-xl sm:text-2xl font-light tracking-[0.25em] uppercase text-center px-4"
              >
                {option.label}
              </button>
            ))}
          </div>
        </main>
        {modals}
      </div>
    );
  }

  // Homepage
  if (step === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {header}
        <HeroSection />
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-light text-black mb-6 tracking-wide">Build your look</h3>
            <p className="text-gray-600 font-light text-lg mb-12">
              Mix and match curated pieces, save your favourite combinations, and shop the look.
            </p>
            <button
              onClick={() => setStep('gender')}
              className="group inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-sm tracking-[0.25em] uppercase font-light hover:bg-gray-900 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              Start Building Your Outfit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
        <FooterSection />
        {modals}
      </div>
    );
  }

  // Outfit builder
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {header}

      <div className="max-w-5xl mx-auto px-6 pt-6 flex items-center justify-between">
        <button
          onClick={() => setStep('gender')}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-black transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {gender === 'men' ? 'Men' : 'Women'}
        </p>
      </div>


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
        focusCategory={focusCategory}
      />

      <FooterSection />
      {modals}
    </div>
  );
};

export default Index;
