import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className = '', onClick }) => {
  const content = (
    <span className="inline-flex items-baseline leading-none">
      <span className="font-cursive-a leading-none mr-2 text-[0.9em]">A</span>
      <span className="font-cursive leading-none">lmaree</span>
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
