
import React from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  isFavorite, 
  onToggle, 
  size = 'md' 
}) => {
  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 16 : 20;

  return (
    <button
      onClick={onToggle}
      className={`${sizeClasses} flex items-center justify-center rounded-full border transition-colors ${
        isFavorite 
          ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
          : 'bg-white border-neutral-200 text-neutral-400 hover:text-red-500'
      }`}
    >
      <Heart 
        className={`w-${iconSize/4} h-${iconSize/4}`} 
        fill={isFavorite ? 'currentColor' : 'none'} 
      />
    </button>
  );
};

export default FavoriteButton;
