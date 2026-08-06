
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
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-light text-black tracking-[0.15em] uppercase">
          {category}
        </h4>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onNavigate(category, 'prev')} 
            className="p-1.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group" 
            aria-label={`Previous ${category}`}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-600 group-hover:text-black transition-colors" />
          </button>
          <button 
            onClick={() => onNavigate(category, 'next')} 
            className="p-1.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group" 
            aria-label={`Next ${category}`}
          >
            <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-black transition-colors" />
          </button>
        </div>

      </div>
      
      <div className="flex items-center justify-center flex-1">
        <button 
          onClick={() => onNavigate(category, 'prev')} 
          className="p-2 hover:bg-gray-50 transition-all duration-200 rounded-full group flex-shrink-0" 
          aria-label={`Previous ${category}`}
        >
          <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
        </button>
        
        <div className="flex-1 min-w-0 px-2 flex flex-col items-center">
          <ClothingItem item={currentItem} type={category as any} compact />
          <div className="text-center mt-2">
            <h3 className="text-sm font-light text-black tracking-wide truncate">{currentItem.name}</h3>
            <p className="text-[10px] text-gray-500 font-light uppercase tracking-widest">{currentItem.color}</p>
          </div>
        </div>
        
        <button 
          onClick={() => onNavigate(category, 'next')} 
          className="p-2 hover:bg-gray-50 transition-all duration-200 rounded-full group flex-shrink-0" 
          aria-label={`Next ${category}`}
        >
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
        </button>
      </div>

      {/* Keep every image decoded in the DOM so left/right swaps are instant */}
      <div aria-hidden className="w-0 h-0 overflow-hidden absolute opacity-0 pointer-events-none">
        {items.map(item => (
          <img key={item.id} src={item.imageUrl} alt="" width={1} height={1} decoding="sync" />
        ))}
      </div>
    </div>


  );
};

export default CategorySection;
