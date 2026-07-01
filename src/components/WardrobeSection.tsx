import React from 'react';
import { Separator } from './ui/separator';
import ColorAnalysisSection from './ColorAnalysisSection';
import BasicsBuilder from './BasicsBuilder';
import { ClothingItem as ClothingItemType } from '../contexts/StyleContext';

interface WardrobeSectionProps {
  filters: { selectedCategories: string[]; colors: string[] };
  onFiltersChange: (filters: { selectedCategories: string[]; colors: string[] }) => void;
  availableBrands: string[];
  filteredItems: ClothingItemType[];
  itemsByCategory: { [key: string]: ClothingItemType[] };
  currentIndices: { [key: string]: number };
  onNavigateCategory: (category: string, direction: 'next' | 'prev') => void;
  onRandomMix: () => void;
  currentOutfitItems: ClothingItemType[];
  onOpenColorQuiz: () => void;
  onOpenTutorial: () => void;
  onSelectItem: (category: string, index: number) => void;
}

const WardrobeSection: React.FC<WardrobeSectionProps> = ({
  itemsByCategory,
  currentIndices,
  onRandomMix,
  currentOutfitItems,
  onOpenColorQuiz,
  onOpenTutorial,
  onSelectItem,
}) => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <ColorAnalysisSection
          onOpenColorQuiz={onOpenColorQuiz}
          onOpenTutorial={onOpenTutorial}
        />

        <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent my-10" />

        <BasicsBuilder
          itemsByCategory={itemsByCategory}
          currentIndices={currentIndices}
          onSelectItem={onSelectItem}
          currentOutfitItems={currentOutfitItems}
          onRandomMix={onRandomMix}
        />

        {/* Why this is smart */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-black uppercase mb-4">Why this works</h4>
            <ul className="space-y-2 text-sm text-gray-700 font-light">
              <li>✓ No copyright issues</li>
              <li>✓ Unique AI-generated visuals</li>
              <li>✓ Mix &amp; match freely</li>
              <li>✓ Fully safe &amp; scalable</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-black uppercase mb-4">How it works</h4>
            <ol className="space-y-2 text-sm text-gray-700 font-light list-decimal list-inside">
              <li>AI generates clothing (original visuals)</li>
              <li>You build outfits — mix &amp; match</li>
              <li>We find similar products at partner stores</li>
              <li>Buy from the store — done</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WardrobeSection;
