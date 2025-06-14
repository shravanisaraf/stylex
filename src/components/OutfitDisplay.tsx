
import React from 'react';
import { Plus, Share, Save, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStyle } from '../contexts/StyleContext';
import { ClothingItem } from '../contexts/StyleContext';
import { useToast } from '@/hooks/use-toast';

interface OutfitDisplayProps {
  items: ClothingItem[];
}

const OutfitDisplay: React.FC<OutfitDisplayProps> = ({ items }) => {
  const navigate = useNavigate();
  const { shareOutfit } = useStyle();
  const { toast } = useToast();
  const totalPrice = items.reduce((sum, item) => sum + parseInt(item.price.replace('Rs.', '')), 0);

  const handleSaveOutfit = () => {
    // Save outfit to localStorage for persistence
    const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
    const newOutfit = {
      id: Date.now(),
      items,
      totalPrice,
      createdAt: new Date().toISOString(),
      name: `Outfit ${savedOutfits.length + 1}`
    };
    
    savedOutfits.push(newOutfit);
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
    
    toast({
      title: "Outfit Saved! 🎉",
      description: `Your outfit has been saved successfully. Total: Rs.${totalPrice.toLocaleString()}`,
    });
  };

  const handleCheckout = () => {
    navigate('/checkout', { 
      state: { 
        items, 
        totalPrice 
      } 
    });
  };

  const handleShare = () => {
    shareOutfit(items);
    toast({
      title: "Outfit Shared! 📤",
      description: "Your outfit has been shared successfully.",
    });
  };

  if (items.length === 0) return null;

  return (
    <div className="space-y-10">
      {/* Combined Outfit Display */}
      <div className="flex items-center justify-center space-x-6 flex-wrap">
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <Plus className="w-6 h-6 text-gray-400" />}
            <div className="w-28 h-28 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center overflow-hidden backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-center">
                  <span className="text-3xl text-white/60">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            <p className="font-light text-white mb-2 text-lg">{item.name}</p>
            <p className="text-sm text-gray-300 mb-3 font-light">{item.brand}</p>
            <p className="text-sm font-medium text-white mb-3">{item.price}</p>
            <span className="inline-block bg-white/20 text-white/80 px-3 py-1 rounded-full text-xs font-light uppercase tracking-wide">
              {item.category}
            </span>
          </div>
        ))}
      </div>
      
      {/* Total Price and Actions */}
      <div className="text-center pt-6 border-t border-white/20">
        <p className="text-sm text-gray-300 mb-3 font-light uppercase tracking-wide">Total</p>
        <p className="text-3xl font-light text-white mb-8 tracking-wide">Rs.{totalPrice.toLocaleString()}</p>
        
        <div className="flex items-center justify-center space-x-4 flex-wrap gap-y-4">
          <button 
            onClick={handleShare}
            className="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-light tracking-wide hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 border border-white/20 backdrop-blur-sm hover:scale-105"
          >
            <Share className="w-4 h-4" />
            <span>SHARE</span>
          </button>
          
          <button 
            onClick={handleSaveOutfit}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-light tracking-wide hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>SAVE OUTFIT</span>
          </button>
          
          <button 
            onClick={handleCheckout}
            className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:scale-105"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>CHECKOUT</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitDisplay;
