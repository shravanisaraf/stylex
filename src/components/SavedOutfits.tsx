
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ClothingItem } from '../contexts/StyleContext';

interface SavedOutfit {
  id: number;
  name: string;
  items: ClothingItem[];
  totalPrice: number;
  createdAt: string;
}

const SavedOutfits = () => {
  const { user } = useAuth();
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

  if (!user) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
        >
          <Heart className="w-4 h-4 mr-2" />
          My Saved Outfits ({savedOutfits.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>My Saved Outfits</DialogTitle>
        </DialogHeader>
        
        {savedOutfits.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No saved outfits yet.</p>
            <p className="text-sm text-gray-400">Create an outfit and save it to see it here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedOutfits.map((outfit) => (
              <div key={outfit.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{outfit.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(outfit.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    onClick={() => deleteOutfit(outfit.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {outfit.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">
                          {item.category === 'tops' ? '👕' : 
                           item.category === 'bottoms' ? '👖' :
                           item.category === 'jackets' ? '🧥' :
                           item.category === 'dresses' ? '👗' :
                           item.category === 'accessories' ? '👜' :
                           item.category === 'shoes' ? '👟' : '👕'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="font-medium">Rs.{outfit.totalPrice.toLocaleString()}</p>
                  <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Buy Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SavedOutfits;
