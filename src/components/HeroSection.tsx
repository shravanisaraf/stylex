import React from 'react';
import { Separator } from './ui/separator';

const HeroSection: React.FC = () => {
  return (
    <>
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extralight text-black mb-6 leading-[1.1] tracking-tight">
            AI-generated basics <em className="italic font-light">+</em> smart matching
          </h2>
          <p className="text-lg text-gray-600 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            No models. No copied images. Just AI-generated clothing paired with real shopping links.
          </p>
          <div className="w-24 h-px bg-black mx-auto"></div>
        </div>
      </section>
      <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </>
  );
};

export default HeroSection;
