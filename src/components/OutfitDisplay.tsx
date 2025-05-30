
import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OutfitDisplayProps {
  top: {
    id: number;
    name: string;
    imageUrl: string;
    brand: string;
    price: string;
  };
  bottom: {
    id: number;
    name: string;
    imageUrl: string;
    brand: string;
    price: string;
  };
}

const OutfitDisplay: React.FC<OutfitDisplayProps> = ({ top, bottom }) => {
  const navigate = useNavigate();
  const totalPrice = parseInt(top.price.replace('Rs.', '')) + parseInt(bottom.price.replace('Rs.', ''));

  const handleSaveOutfit = () => {
    // Navigate to checkout page with outfit data
    navigate('/checkout', { 
      state: { 
        top, 
        bottom, 
        totalPrice 
      } 
    });
  };

  return (
    <div className="space-y-8">
      {/* Combined Outfit Display */}
      <div className="flex items-center justify-center space-x-8">
        {/* Top Image */}
        <div className="w-24 h-24 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center">
          {top.imageUrl ? (
            <img
              src={top.imageUrl}
              alt={top.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-center">
              <span className="text-2xl text-neutral-400">👕</span>
            </div>
          )}
        </div>

        {/* Plus Icon */}
        <Plus className="w-6 h-6 text-neutral-400" />

        {/* Bottom Image */}
        <div className="w-24 h-24 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center">
          {bottom.imageUrl ? (
            <img
              src={bottom.imageUrl}
              alt={bottom.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-center">
              <span className="text-2xl text-neutral-400">👖</span>
            </div>
          )}
        </div>
      </div>

      {/* Outfit Details */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          <p className="font-medium text-neutral-900 mb-1">{top.name}</p>
          <p className="text-sm text-neutral-600 mb-2 font-light">{top.brand}</p>
          <p className="text-sm font-medium text-neutral-900">{top.price}</p>
        </div>
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          <p className="font-medium text-neutral-900 mb-1">{bottom.name}</p>
          <p className="text-sm text-neutral-600 mb-2 font-light">{bottom.brand}</p>
          <p className="text-sm font-medium text-neutral-900">{bottom.price}</p>
        </div>
      </div>
      
      {/* Total Price and Action */}
      <div className="text-center pt-4 border-t border-neutral-200">
        <p className="text-sm text-neutral-600 mb-2 font-light">Total</p>
        <p className="text-xl font-medium text-neutral-900 mb-4">Rs.{totalPrice.toLocaleString()}</p>
        <button 
          onClick={handleSaveOutfit}
          className="bg-neutral-900 text-white px-6 py-2 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors"
        >
          SAVE OUTFIT
        </button>
      </div>
    </div>
  );
};

export default OutfitDisplay;
