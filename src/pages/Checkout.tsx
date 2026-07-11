
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ShoppingCart } from 'lucide-react';
import { ClothingItem } from '../contexts/StyleContext';
import { useToast } from '@/hooks/use-toast';

interface CheckoutData {
  items: ClothingItem[];
  totalPrice: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const checkoutData = location.state as CheckoutData;

  if (!checkoutData) {
    navigate('/');
    return null;
  }

  const { items, totalPrice } = checkoutData;

  const handleBuyComplete = () => {
    // Open all store links in new tabs
    items.forEach((item, index) => {
      if (item.buyUrl) {
        // Add a small delay between opening tabs to prevent browser blocking
        setTimeout(() => {
          window.open(item.buyUrl, '_blank', 'noopener,noreferrer');
        }, index * 100);
      }
    });

    toast({
      title: "Opening Store Links! 🛒",
      description: `Opening ${items.length} store links to complete your purchase...`,
    });
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
            <h1 className="text-2xl font-light tracking-wide text-neutral-900">chér</h1>
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

        <div className="bg-white rounded-lg border border-neutral-200 p-8 mb-8 shadow-sm">
          {/* Outfit Preview */}
          <div className="flex items-center justify-center space-x-4 mb-12 flex-wrap">
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                {index > 0 && <span className="text-2xl text-neutral-400">+</span>}
                <div className="w-32 h-32 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-3xl text-neutral-400">
                      {item.category === 'tops' ? '👕' : 
                       item.category === 'bottoms' ? '👖' :
                       item.category === 'jackets' ? '🧥' :
                       item.category === 'dresses' ? '👗' :
                       item.category === 'accessories' ? '👜' :
                       item.category === 'shoes' ? '👟' : '👕'}
                    </span>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Item Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {items.map(item => (
              <div key={item.id} className="border border-neutral-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-medium text-neutral-900 mb-2">{item.name}</h3>
                  <p className="text-neutral-600 font-light mb-2">{item.brand}</p>
                  <p className="text-lg font-medium text-neutral-900 mb-2">{item.price}</p>
                  <span className="inline-block bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs capitalize">
                    {item.category}
                  </span>
                </div>
                <a 
                  href={item.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors"
                >
                  <span>Buy Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-neutral-200 pt-6 text-center">
            <p className="text-sm text-neutral-600 mb-2 font-light">Total Outfit Cost</p>
            <p className="text-3xl font-medium text-neutral-900 mb-6">Rs.{totalPrice.toLocaleString()}</p>
            <div className="space-y-4">
              <button 
                onClick={handleBuyComplete}
                className="bg-neutral-900 text-white px-8 py-3 rounded-lg text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors flex items-center space-x-2 mx-auto shadow-sm"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>BUY COMPLETE LOOK</span>
              </button>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                This will open all store links in new tabs so you can purchase each item individually from their respective retailers.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
