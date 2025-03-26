import React, { useState } from 'react';
import './DressCode.css';

const DressCode: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="dress-code-wrapper">
      <button className="dress-code-btn" onClick={() => setIsVisible(true)}>
        Dress Code
      </button>
      {isVisible && (
        <div 
          className="modal-overlay" 
          onClick={() => setIsVisible(false)}
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-btn" 
              onClick={() => setIsVisible(false)}
            >
              &times;
            </button>
            <h2>Dress Code</h2>
            <p>Light-colored attire is recommended.</p>
            <p>Preferred hues include pink, lavender, or light blue.</p>
            <img 
              className="dress-code-image"
              src="/images/dress-code-img.png" 
              alt="Dress Code Visual"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DressCode;
