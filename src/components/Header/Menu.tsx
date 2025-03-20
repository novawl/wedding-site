import React from 'react';
import './Menu.css';

interface HamburgerMenuProps {
  onClick: () => void;  // callback for toggling the menu
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClick }) => {
  return (
    <button className="hamburger-menu" onClick={onClick} aria-label="Toggle menu">
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
  );
};

export default HamburgerMenu;
