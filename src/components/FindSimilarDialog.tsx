import React from 'react';
import { Sparkles, ExternalLink, ShoppingBag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ClothingItem } from '../contexts/StyleContext';

interface FindSimilarDialogProps {
  item: ClothingItem | null;
  open: boolean;
  onClose: () => void;
}

const FindSimilarDialog: React.FC<FindSimilarDialogProps> = ({ item, open, onClose }) => {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-light tracking-wide">{item.name}</DialogTitle>
          <DialogDescription className="text-sm text-neutral-500">
            Estimated price: <span className="font-medium text-neutral-900">{item.price}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col items-center text-center gap-3 py-6 px-4 rounded-lg border border-neutral-200 bg-neutral-50">
            <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <p className="text-base font-medium tracking-wide">Shopping Coming Soon</p>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
              We're currently partnering with fashion brands to bring you the best shopping experience.
            </p>
          </div>

          {item.referenceUrl && (
            <div className="pt-2 border-t border-neutral-200">
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Style inspiration
              </p>
              <a
                href={item.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all"
              >
                <span className="text-sm">View reference</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FindSimilarDialog;
