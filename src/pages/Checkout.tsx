
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface OutfitData {
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
  totalPrice: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const outfitData = location.state as OutfitData;

  if (!outfitData) {
    navigate('/');
    return null;
  }

  const { top, bottom, totalPrice } = outfitData;

  // Mock buy links - replace with actual retailer links
  const getBuyLink = (brand: string, itemName: string) => {
    return `https://example-store.com/search?q=${encodeURIComponent(brand + ' ' + itemName)}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Styling</span>
            </button>
            <h1 className="text-2xl font-light tracking-wide text-neutral-900">STYLEX</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Checkout Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-neutral-900 mb-4">Your Curated Look</h2>
          <p className="text-neutral-600 font-light">Ready to complete your style</p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-8 mb-8">
          {/* Outfit Preview */}
          <div className="flex items-center justify-center space-x-8 mb-12">
            <div className="w-32 h-32 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center">
              {top.imageUrl ? (
                <img src={top.imageUrl} alt={top.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-3xl text-neutral-400">👕</span>
              )}
            </div>
            <div className="text-2xl text-neutral-400">+</div>
            <div className="w-32 h-32 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center">
              {bottom.imageUrl ? (
                <img src={bottom.imageUrl} alt={bottom.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-3xl text-neutral-400">👖</span>
              )}
            </div>
          </div>

          {/* Item Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Details */}
            <div className="border border-neutral-200 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-medium text-neutral-900 mb-2">{top.name}</h3>
                <p className="text-neutral-600 font-light mb-2">{top.brand}</p>
                <p className="text-lg font-medium text-neutral-900">{top.price}</p>
              </div>
              <a 
                href={getBuyLink(top.brand, top.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-neutral-900 text-white px-4 py-2 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors"
              >
                <span>Buy Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Bottom Details */}
            <div className="border border-neutral-200 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-medium text-neutral-900 mb-2">{bottom.name}</h3>
                <p className="text-neutral-600 font-light mb-2">{bottom.brand}</p>
                <p className="text-lg font-medium text-neutral-900">{bottom.price}</p>
              </div>
              <a 
                href={getBuyLink(bottom.brand, bottom.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-neutral-900 text-white px-4 py-2 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors"
              >
                <span>Buy Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-neutral-200 pt-6 mt-8 text-center">
            <p className="text-sm text-neutral-600 mb-2 font-light">Total Outfit Cost</p>
            <p className="text-2xl font-medium text-neutral-900 mb-6">Rs.{totalPrice.toLocaleString()}</p>
            <button className="bg-neutral-900 text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors">
              BUY COMPLETE LOOK
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
