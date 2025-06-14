
import React from 'react';
import { Shuffle } from 'lucide-react';

interface RandomMixButtonProps {
  onRandomMix: () => void;
}

const RandomMixButton: React.FC<RandomMixButtonProps> = ({ onRandomMix }) => {
  return (
    <button
      onClick={onRandomMix}
      className="bg-gradient-to-r from-black to-gray-800 text-white px-8 py-4 rounded-full flex items-center space-x-3 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.2)] hover:scale-105 group"
    >
      <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
      <span className="font-light tracking-[0.1em] text-sm uppercase">Random Mix</span>
    </button>
  );
};

export default RandomMixButton;
