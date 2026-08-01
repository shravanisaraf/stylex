
import React from 'react';
import { Separator } from './ui/separator';
import FilterPanel, { FilterState } from './FilterPanel';
import CategorySection from './CategorySection';
import RandomMixButton from './RandomMixButton';
import OutfitDisplay from './OutfitDisplay';
import ColorAnalysisSection from './ColorAnalysisSection';
import { ClothingItem as ClothingItemType } from '../contexts/StyleContext';

interface WardrobeSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableBrands: string[];
  filteredItems: ClothingItemType[];
  itemsByCategory: { [key: string]: ClothingItemType[] };
  currentIndices: { [key: string]: number };
  onNavigateCategory: (category: string, direction: 'next' | 'prev') => void;
  onRandomMix: () => void;
  currentOutfitItems: ClothingItemType[];
  onOpenColorQuiz: () => void;
  onOpenTutorial: () => void;
  focusCategory?: 'tops' | 'bottoms';
}

const WardrobeSection: React.FC<WardrobeSectionProps> = ({
  filters,
  onFiltersChange,
  itemsByCategory,
  currentIndices,
  onNavigateCategory,
  onRandomMix,
  currentOutfitItems,
  onOpenColorQuiz,
  onOpenTutorial,
  focusCategory = 'tops'
}) => {
  const getCurrentItem = (category: string) => {
    const items = itemsByCategory[category] || [];
    if (items.length === 0) return null;
    const index = currentIndices[category] || 0;
    return items[Math.min(index, items.length - 1)];
  };

  const categories: ('tops' | 'bottoms')[] =
    focusCategory === 'bottoms' ? ['bottoms', 'tops'] : ['tops', 'bottoms'];

  const hasItems = Object.keys(itemsByCategory).length > 0;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Color Analysis Section */}
        <ColorAnalysisSection 
          onOpenColorQuiz={onOpenColorQuiz}
          onOpenTutorial={onOpenTutorial}
        />

        {/* Subtle Divider */}
        <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-16" />

        <div className="text-center mb-12">
          <h3 className="text-3xl font-light text-black mb-6 tracking-wide">Curate your style</h3>
          <p className="text-gray-600 font-light text-lg">Mix and match pieces to build your look</p>
        </div>

        {/* Filters: colour + search */}
        <FilterPanel filters={filters} onFiltersChange={onFiltersChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map(category => (
            <CategorySection
              key={category}
              category={category}
              items={itemsByCategory[category] || []}
              currentItem={getCurrentItem(category)}
              currentIndex={currentIndices[category] || 0}
              onNavigate={onNavigateCategory}
            />
          ))}
        </div>

        <div className="space-y-16 mt-16">
          {/* Random Mix Button */}
          {hasItems && (
            <div className="flex justify-center pt-8">
              <RandomMixButton onRandomMix={onRandomMix} />
            </div>
          )}

          {/* Outfit Display */}
          {currentOutfitItems.length > 0 && (
            <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl border border-gray-200 p-12 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <div className="text-center mb-12">
                <h4 className="text-xl font-light text-white tracking-[0.15em] mb-3 uppercase">Your Curated Look</h4>
                <p className="text-gray-300 font-light">Complete look ready to shop</p>
              </div>
              <OutfitDisplay items={currentOutfitItems} />
            </div>
          )}

          {!hasItems && (
            <div className="text-center py-16">
              <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
              <p className="text-xl text-gray-500 font-light">
                No pieces match your search. Try a different colour or keyword.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WardrobeSection;
