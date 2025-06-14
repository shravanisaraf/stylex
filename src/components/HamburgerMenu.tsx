
import React from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import SavedOutfits from './SavedOutfits';

const HamburgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Access your saved outfits and other features
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <SavedOutfits />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
