import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <ul className="nav-list">
            <li className="nav-item">
            <a href="#events">Events</a>
            </li>
            <li className="nav-item">
            <a href="#gallery">Gallery</a>
            </li>

          {/* Right-aligned RSVP button */}
          <li className="nav-item nav-button">
            <a href="#rsvp">RSVP</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
