import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className = '', onClick }) => {
  const content = (
    <span className="font-cursive-a leading-none tracking-normal">
      Almaree
    </span>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link to="/" className={className}>
      {content}
    </Link>
  );
};

export default Logo;
