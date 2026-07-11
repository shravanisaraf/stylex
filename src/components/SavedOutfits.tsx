import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, ShoppingCart, Trash2, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ClothingItem } from '../contexts/StyleContext';
interface SavedOutfit {
  id: number;
  name: string;
  items: ClothingItem[];
  totalPrice: number;
  createdAt: string;
}
interface SavedOutfitsProps {
  variant?: 'button' | 'menu-item';
}
const SavedOutfits: React.FC<SavedOutfitsProps> = ({
  variant = 'button'
}) => {
  const {
    user
  } = useAuth();
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  useEffect(() => {
    if (user) {
      const outfits = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
      setSavedOutfits(outfits);
    }
  }, [user]);
  const deleteOutfit = (id: number) => {
    const updatedOutfits = savedOutfits.filter(outfit => outfit.id !== id);
    setSavedOutfits(updatedOutfits);
    localStorage.setItem('savedOutfits', JSON.stringify(updatedOutfits));
  };
  const buyOutfit = (outfit: SavedOutfit) => {
    // Open all item buy URLs in new tabs
    outfit.items.forEach(item => {
      if (item.buyUrl) {
        window.open(item.buyUrl, '_blank');
      }
    });
  };
  if (!user) {
    return null;
  }
  const triggerButton = variant === 'menu-item' ? <Button variant="ghost" className="w-full justify-start text-left">
      <Heart className="w-4 h-4 mr-2" />
      My Saved Outfits ({savedOutfits.length})
    </Button> : <Button variant="outline" className="border-white/20 backdrop-blur-sm bg-slate-400 hover:bg-slate-300 text-stone-600">
      <Heart className="w-4 h-4 mr-2" />
      My Saved Outfits ({savedOutfits.length})
    </Button>;
  return <Dialog>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>My Saved Outfits</DialogTitle>
        </DialogHeader>
        
        {savedOutfits.length === 0 ? <div className="text-center py-8">
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No saved outfits yet.</p>
            <p className="text-sm text-gray-400">Create an outfit and save it to see it here!</p>
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedOutfits.map(outfit => <div key={outfit.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{outfit.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(outfit.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button onClick={() => deleteOutfit(outfit.id)} variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {outfit.items.slice(0, 3).map((item, index) => <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : <span className="text-2xl">
                          {item.category === 'tops' ? '👕' : item.category === 'bottoms' ? '👖' : item.category === 'jackets' ? '🧥' : item.category === 'dresses' ? '👗' : item.category === 'accessories' ? '👜' : item.category === 'shoes' ? '👟' : '👕'}
                        </span>}
                    </div>)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Rs.{outfit.totalPrice.toLocaleString()}</p>
                    <Button onClick={() => buyOutfit(outfit)} size="sm" className="bg-black text-white hover:bg-gray-800">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Shop Items
                    </Button>
                  </div>
                  
                  {/* Show all items in the outfit */}
                  <div className="text-xs text-gray-600">
                    <p className="font-medium mb-1">Items:</p>
                    {outfit.items.map((item, index) => <p key={index}>• {item.name} - {item.brand} ({item.price})</p>)}
                  </div>
                </div>
              </div>)}
          </div>}
      </DialogContent>
    </Dialog>;
};
export default SavedOutfits;