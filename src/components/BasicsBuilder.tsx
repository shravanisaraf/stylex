import React from 'react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { ClothingItem as ClothingItemType } from '../contexts/StyleContext';
import { Button } from './ui/button';

interface BasicsBuilderProps {
  itemsByCategory: { [key: string]: ClothingItemType[] };
  currentIndices: { [key: string]: number };
  onSelectItem: (category: string, index: number) => void;
  currentOutfitItems: ClothingItemType[];
  onRandomMix: () => void;
}

const categoryLabel = (c: string) => c.charAt(0).toUpperCase() + c.slice(1);

const BasicsBuilder: React.FC<BasicsBuilderProps> = ({
  itemsByCategory,
  currentIndices,
  onSelectItem,
  currentOutfitItems,
  onRandomMix,
}) => {
  const orderedCategories = ['tops', 'bottoms', 'shoes', 'jackets', 'dresses', 'accessories']
    .filter((c) => (itemsByCategory[c]?.length ?? 0) > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT — AI-generated items grid */}
      <aside className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-black uppercase">AI-Generated Items</h3>
          <p className="text-sm text-gray-500 mt-1 font-light">
            Clean, original visuals of basic &amp; popular clothing. No copied product photos.
          </p>
        </div>

        <div className="space-y-6">
          {orderedCategories.map((cat) => {
            const items = itemsByCategory[cat] || [];
            const activeIndex = currentIndices[cat] ?? 0;
            return (
              <div key={cat}>
                <h4 className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase mb-3">
                  {categoryLabel(cat)}
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {items.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectItem(cat, idx)}
                        className={`group text-left transition ${
                          isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div
                          className={`aspect-square bg-neutral-50 rounded-lg overflow-hidden border transition ${
                            isActive ? 'border-black ring-2 ring-black' : 'border-gray-200 group-hover:border-gray-400'
                          }`}
                        >
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              loading="lazy"
                              width={512}
                              height={512}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">·</div>
                          )}
                        </div>
                        <p className="mt-2 text-[11px] font-medium text-black truncate">{item.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* MIDDLE — outfit canvas */}
      <section className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-5 text-center">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-black uppercase">Outfit Builder</h3>
          <p className="text-sm text-gray-500 mt-1 font-light">Mix &amp; match. Click items on the left.</p>
        </div>

        <div className="bg-neutral-50 rounded-xl border border-gray-100 p-6 min-h-[420px] flex flex-col items-center justify-center gap-4">
          {currentOutfitItems.length === 0 ? (
            <p className="text-sm text-gray-400 font-light">Pick a top &amp; bottom to build your look.</p>
          ) : (
            currentOutfitItems.map((item) => (
              <img
                key={item.id}
                src={item.imageUrl}
                alt={item.name}
                loading="lazy"
                width={512}
                height={512}
                className="w-40 h-40 object-contain"
              />
            ))
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <Button
            onClick={onRandomMix}
            variant="outline"
            className="rounded-full border-black text-black hover:bg-black hover:text-white text-xs tracking-[0.2em] uppercase"
          >
            Shuffle mix
          </Button>
        </div>
      </section>

      {/* RIGHT — shop the look */}
      <aside className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-black uppercase">Shop the Look</h3>
          <p className="text-sm text-gray-500 mt-1 font-light">Similar real products from partner stores.</p>
        </div>

        {currentOutfitItems.length === 0 ? (
          <div className="text-center py-16 text-sm text-gray-400 font-light">
            Build an outfit to see shopping options.
          </div>
        ) : (
          <div className="space-y-5">
            {currentOutfitItems.map((item) => {
              const links = item.shopLinks && item.shopLinks.length > 0
                ? item.shopLinks
                : [{ store: item.brand, url: item.buyUrl, price: item.price }];
              return (
                <div key={item.id} className="border border-gray-100 rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-md bg-neutral-50 border border-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        loading="lazy"
                        width={256}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-black truncate">{item.name}</p>
                      <p className="text-[11px] text-gray-500">Similar style</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {links.map((link) => (
                      <div key={link.store + link.url} className="flex items-center justify-between gap-2">
                        <div className="text-xs">
                          <span className="font-medium text-black">{link.store}</span>
                          <span className="text-gray-500 ml-2">{link.price}</span>
                        </div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium bg-black text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          View on {link.store}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </aside>
    </div>
  );
};

export default BasicsBuilder;
