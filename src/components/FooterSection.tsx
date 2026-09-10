
import React from 'react';
import SignOutButton from './SignOutButton';

const FooterSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-black to-gray-900 py-24 relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-light text-white mb-6 tracking-wide">
          Know what you own, <em className="italic">love</em> what you wear
        </h3>
        <p className="text-gray-300 mb-12 font-light text-lg max-w-2xl mx-auto leading-relaxed">
          Discover endless styling possibilities with pieces you already have
        </p>
        <div className="w-24 h-px bg-white/30 mx-auto"></div>
      </div>

      
      {/* Sign Out Button positioned at bottom right */}
      <div className="absolute bottom-6 right-6">
        <SignOutButton />
      </div>
    </section>
  );
};

export default FooterSection;
