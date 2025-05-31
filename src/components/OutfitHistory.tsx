
import React from 'react';
import { History, Heart, Share } from 'lucide-react';
import { useStyle } from '../contexts/StyleContext';

interface OutfitHistoryProps {
  onSelectOutfit: (topId: number, bottomId: number) => void;
}

const OutfitHistory: React.FC<OutfitHistoryProps> = ({ onSelectOutfit }) => {
  const { outfitHistory, favoriteOutfits, toggleOutfitFavorite, shareOutfit } = useStyle();

  if (outfitHistory.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-8">
        <div className="text-center">
          <History className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-neutral-900 mb-2">No outfit history yet</h4>
          <p className="text-neutral-600 font-light">Start mixing and matching to see your outfit history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-medium text-neutral-900 tracking-wide">OUTFIT HISTORY</h4>
        <History className="w-5 h-5 text-neutral-400" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {outfitHistory.slice(0, 6).map((outfit) => (
          <div key={outfit.id} className="relative group">
            <div 
              className="border border-neutral-200 rounded-lg p-3 cursor-pointer hover:border-neutral-300 transition-colors"
              onClick={() => onSelectOutfit(outfit.top.id - 1, outfit.bottom.id - 1)}
            >
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center">
                  {outfit.top.imageUrl ? (
                    <img src={outfit.top.imageUrl} alt="" className="w-full h-full object-cover rounded" />
                  ) : (
                    <span className="text-lg">👕</span>
                  )}
                </div>
                <span className="text-xs text-neutral-400">+</span>
                <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center">
                  {outfit.bottom.imageUrl ? (
                    <img src={outfit.bottom.imageUrl} alt="" className="w-full h-full object-cover rounded" />
                  ) : (
                    <span className="text-lg">👖</span>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-neutral-600 font-light truncate">
                  {outfit.top.name} + {outfit.bottom.name}
                </p>
              </div>
            </div>
            
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOutfitFavorite(outfit.id);
                }}
                className="w-6 h-6 bg-white rounded-full border border-neutral-200 flex items-center justify-center"
              >
                <Heart 
                  className="w-3 h-3" 
                  fill={favoriteOutfits.includes(outfit.id) ? '#dc2626' : 'none'}
                  color={favoriteOutfits.includes(outfit.id) ? '#dc2626' : '#9ca3af'}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  shareOutfit(outfit.top, outfit.bottom);
                }}
                className="w-6 h-6 bg-white rounded-full border border-neutral-200 flex items-center justify-center"
              >
                <Share className="w-3 h-3 text-neutral-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitHistory;
