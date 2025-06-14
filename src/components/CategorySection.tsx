
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
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
      <div className="flex items-center justify-between mb-12">
        <h4 className="text-xl font-light text-black tracking-[0.15em] uppercase">
          {category}
        </h4>
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => onNavigate(category, 'prev')} 
            className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group" 
            aria-label={`Previous ${category}`}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
          </button>
          <span className="text-sm text-gray-500 font-light min-w-[4rem] text-center">
            {currentIndex + 1} / {items.length}
          </span>
          <button 
            onClick={() => onNavigate(category, 'next')} 
            className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group" 
            aria-label={`Next ${category}`}
          >
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-12">
        <button 
          onClick={() => onNavigate(category, 'prev')} 
          className="p-6 hover:bg-gray-50 transition-all duration-200 rounded-full group" 
          aria-label={`Previous ${category}`}
        >
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
        
        <button 
          onClick={() => onNavigate(category, 'next')} 
          className="p-6 hover:bg-gray-50 transition-all duration-200 rounded-full group" 
          aria-label={`Next ${category}`}
        >
          <ArrowRight className="w-10 h-10 text-gray-300 group-hover:text-gray-600 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default CategorySection;
