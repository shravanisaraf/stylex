import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ClothingItem } from '../contexts/StyleContext';

interface FindSimilarDialogProps {
  item: ClothingItem | null;
  open: boolean;
  onClose: () => void;
}

const STORES = [
  { name: 'Myntra',   build: (q: string) => `https://www.myntra.com/${encodeURIComponent(q).replace(/%20/g, '-')}` },
  { name: 'Ajio',     build: (q: string) => `https://www.ajio.com/search/?text=${encodeURIComponent(q)}` },
  { name: 'Nykaa Fashion', build: (q: string) => `https://www.nykaafashion.com/catalogsearch/result/?q=${encodeURIComponent(q)}` },
  { name: 'Zara',     build: (q: string) => `https://www.zara.com/in/en/search?searchTerm=${encodeURIComponent(q)}` },
  { name: 'H&M',      build: (q: string) => `https://www2.hm.com/en_in/search-results.html?q=${encodeURIComponent(q)}` },
  { name: 'Shein',    build: (q: string) => `https://in.shein.com/pdsearch/${encodeURIComponent(q).replace(/%20/g, '%20')}/` },
  { name: 'Amazon',   build: (q: string) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}&rh=n%3A1953602031` },
  { name: 'Flipkart', build: (q: string) => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}` },
];

const FindSimilarDialog: React.FC<FindSimilarDialogProps> = ({ item, open, onClose }) => {
  if (!item) return null;
  const query = item.searchKeywords || item.name;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-light tracking-wide">{item.name}</DialogTitle>
          <DialogDescription className="text-sm text-neutral-500">
            Estimated price: <span className="font-medium text-neutral-900">{item.price}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Shop this look</p>
            <div className="grid grid-cols-2 gap-2">
              {STORES.map((s) => (
                <a
                  key={s.name}
                  href={s.build(query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-all group"
                >
                  <span className="text-sm font-medium">{s.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
                </a>
              ))}
            </div>
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

          <p className="text-[11px] text-neutral-400 leading-relaxed pt-2">
            Prices vary by store. Links open a live search — items shown may sell out or differ slightly from the reference.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FindSimilarDialog;
