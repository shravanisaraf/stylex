
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ClothingItem from './ClothingItem';
import { ClothingItem as ClothingItemType } from '../contexts/StyleContext';

interface CategorySectionProps {
  category: string;
  items: ClothingItemType[];
  currentItem: ClothingItemType | null;
  currentIndex: number;
  onNavigate: (category: string, direction: 'next' | 'prev') => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  items,
  currentItem,
  currentIndex,
  onNavigate
}) => {
  if (items.length === 0 || !currentItem) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-light text-black tracking-[0.15em] uppercase">
          {category}
        </h4>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onNavigate(category, 'prev')} 
            className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group" 
            aria-label={`Previous ${category}`}
          >
            <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors" />
          </button>
          <span className="text-xs text-gray-500 font-light min-w-[3rem] text-center">
            {currentIndex + 1} / {items.length}
          </span>
          <button 
            onClick={() => onNavigate(category, 'next')} 
            className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group" 
            aria-label={`Next ${category}`}
          >
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-center flex-1">
        <button 
          onClick={() => onNavigate(category, 'prev')} 
          className="p-3 hover:bg-gray-50 transition-all duration-200 rounded-full group flex-shrink-0" 
          aria-label={`Previous ${category}`}
        >
          <ArrowLeft className="w-6 h-6 text-gray-300 group-hover:text-gray-600 transition-colors" />
        </button>
        
        <div className="flex-1 min-w-0 px-4">
          <ClothingItem item={currentItem} type={category as any} />
          <div className="text-center mt-4">
            <h3 className="text-base font-light text-black mb-1 tracking-wide truncate">{currentItem.name}</h3>
            <p className="text-xs text-gray-500 font-light uppercase tracking-widest">{currentItem.color}</p>
          </div>
        </div>
        
        <button 
          onClick={() => onNavigate(category, 'next')} 
          className="p-3 hover:bg-gray-50 transition-all duration-200 rounded-full group flex-shrink-0" 
          aria-label={`Next ${category}`}
        >
          <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-gray-600 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default CategorySection;
