import React, { useState } from 'react';
import { Plus, Share, Save, ShoppingCart, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStyle } from '../contexts/StyleContext';
import { ClothingItem } from '../contexts/StyleContext';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface OutfitDisplayProps {
  items: ClothingItem[];
}

const OutfitDisplay: React.FC<OutfitDisplayProps> = ({ items }) => {
  const navigate = useNavigate();
  const { shareOutfit } = useStyle();
  const { toast } = useToast();
  const [isNaming, setIsNaming] = useState(false);
  const [outfitName, setOutfitName] = useState('');
  
  const totalPrice = items.reduce((sum, item) => {
    const value = parseInt((item.price || '').replace(/[^0-9]/g, ''), 10);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const handleSaveOutfit = (customName?: string) => {
    const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
    const finalName = customName || `Outfit ${savedOutfits.length + 1}`;
    
    const newOutfit = {
      id: Date.now(),
      items,
      totalPrice,
      createdAt: new Date().toISOString(),
      name: finalName
    };
    
    savedOutfits.push(newOutfit);
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
    
    toast({
      title: "Outfit Saved! 🎉",
      description: `"${finalName}" has been saved to your outfits.`,
    });

    // Reset naming state
    setIsNaming(false);
    setOutfitName('');
  };

  const handleQuickSave = () => {
    setIsNaming(true);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (outfitName.trim()) {
      handleSaveOutfit(outfitName.trim());
    }
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
                  className="w-full h-full object-contain rounded-xl"
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
            <p className="text-sm text-gray-300 mb-3 font-light capitalize">{item.color}</p>
            <span className="inline-block bg-white/20 text-white/80 px-3 py-1 rounded-full text-xs font-light uppercase tracking-wide">
              {item.category}
            </span>
          </div>
        ))}
      </div>
      
      {/* Total Price and Actions */}
      <div className="text-center pt-6 border-t border-white/20">
        
        {/* Outfit Naming Section */}
        {isNaming && (
          <div className="mb-6 max-w-md mx-auto">
            <form onSubmit={handleNameSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Name your outfit..."
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/60"
                autoFocus
              />
              <Button 
                type="submit" 
                size="sm"
                className="bg-white text-black hover:bg-gray-100"
              >
                Save
              </Button>
              <Button 
                type="button" 
                variant="ghost"
                size="sm"
                onClick={() => setIsNaming(false)}
                className="text-white/60 hover:text-white"
              >
                Cancel
              </Button>
            </form>
          </div>
        )}
        
        <div className="flex items-center justify-center space-x-4 flex-wrap gap-y-4">
          <button 
            onClick={handleShare}
            className="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-light tracking-wide hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 border border-white/20 backdrop-blur-sm hover:scale-105"
          >
            <Share className="w-4 h-4" />
            <span>SHARE</span>
          </button>
          
          <button 
            onClick={handleQuickSave}
            className="bg-gradient-to-r from-amber-100 to-yellow-50 text-black px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:from-amber-50 hover:to-yellow-25 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:scale-105 border border-amber-200"
          >
            <Save className="w-4 h-4" />
            <span>SAVE OUTFIT</span>
          </button>
          
          <button 
            onClick={handleCheckout}
            className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:scale-105"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>VIEW LOOK</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitDisplay;
