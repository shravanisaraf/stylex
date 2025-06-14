
import React from 'react';
import { Separator } from './ui/separator';

const HeroSection: React.FC = () => {
  return (
    <>
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-extralight text-black mb-8 leading-[1.1] tracking-tight">
            The <em className="italic font-light">one-stop</em> digital wardrobe app
          </h2>
          <p className="text-xl text-gray-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            <em className="italic">unlocking the potential</em> of what you already own
          </p>
          <div className="w-24 h-px bg-black mx-auto"></div>
        </div>
      </section>
      <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </>
  );
};

export default HeroSection;
