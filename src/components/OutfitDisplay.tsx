
import React from 'react';
import { Plus, Share } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStyle } from '../contexts/StyleContext';
import { ClothingItem } from '../contexts/StyleContext';

interface OutfitDisplayProps {
  items: ClothingItem[];
}

const OutfitDisplay: React.FC<OutfitDisplayProps> = ({ items }) => {
  const navigate = useNavigate();
  const { shareOutfit } = useStyle();
  const totalPrice = items.reduce((sum, item) => sum + parseInt(item.price.replace('Rs.', '')), 0);

  const handleSaveOutfit = () => {
    navigate('/checkout', { 
      state: { 
        items, 
        totalPrice 
      } 
    });
  };

  const handleShare = () => {
    shareOutfit(items);
  };

  if (items.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* Combined Outfit Display */}
      <div className="flex items-center justify-center space-x-4 flex-wrap">
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <Plus className="w-6 h-6 text-neutral-400" />}
            <div className="w-24 h-24 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <span className="text-2xl text-neutral-400">
                    {item.category === 'tops' ? '👕' : 
                     item.category === 'bottoms' ? '👖' :
                     item.category === 'jackets' ? '🧥' :
                     item.category === 'dresses' ? '👗' :
                     item.category === 'accessories' ? '👜' :
                     item.category === 'shoes' ? '👟' : '👕'}
                  </span>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Outfit Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <p className="font-medium text-neutral-900 mb-1">{item.name}</p>
            <p className="text-sm text-neutral-600 mb-2 font-light">{item.brand}</p>
            <p className="text-sm font-medium text-neutral-900">{item.price}</p>
            <span className="inline-block bg-neutral-200 text-neutral-700 px-2 py-1 rounded text-xs mt-2 capitalize">
              {item.category}
            </span>
          </div>
        ))}
      </div>
      
      {/* Total Price and Actions */}
      <div className="text-center pt-4 border-t border-neutral-200">
        <p className="text-sm text-neutral-600 mb-2 font-light">Total</p>
        <p className="text-xl font-medium text-neutral-900 mb-4">Rs.{totalPrice.toLocaleString()}</p>
        
        <div className="flex items-center justify-center space-x-4">
          <button 
            onClick={handleShare}
            className="bg-neutral-100 text-neutral-700 px-4 py-2 text-sm font-medium tracking-wide hover:bg-neutral-200 transition-colors flex items-center space-x-2"
          >
            <Share className="w-4 h-4" />
            <span>SHARE</span>
          </button>
          
          <button 
            onClick={handleSaveOutfit}
            className="bg-neutral-900 text-white px-6 py-2 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors"
          >
            SAVE OUTFIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitDisplay;
