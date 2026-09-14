import React from 'react';
import { Link } from 'react-router-dom';
import optionThreeWordmark from '../assets/almaree-option-3.png';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className = '', onClick }) => {
  const content = (
    <img
      src={optionThreeWordmark}
      alt="Almaree"
      className="h-12 w-auto object-contain"
    />
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`inline-flex items-center justify-center ${className}`} aria-label="Almaree home">
        {content}
      </button>
    );
  }

  return (
    <Link to="/" className={`inline-flex items-center justify-center ${className}`} aria-label="Almaree home">
      {content}
    </Link>
  );
};

export default Logo;
