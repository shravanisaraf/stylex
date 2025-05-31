
import React from 'react';
import { Shuffle } from 'lucide-react';

interface RandomMixButtonProps {
  onRandomMix: () => void;
}

const RandomMixButton: React.FC<RandomMixButtonProps> = ({ onRandomMix }) => {
  return (
    <button
      onClick={onRandomMix}
      className="bg-neutral-900 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-neutral-800 transition-colors"
    >
      <Shuffle className="w-5 h-5" />
      <span className="font-medium tracking-wide">RANDOM MIX</span>
    </button>
  );
};

export default RandomMixButton;
