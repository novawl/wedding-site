import React from 'react';
import './FullWidthPhoto.css';
import heroImage from '../../img/hero-min.jpg';

const FullWidthPhoto: React.FC = () => {
  return (
    <div className="photo-container">
      <img
        src={heroImage}
        alt="Background"
        className="background-image"
      />
      <div className="overlay-text">
        <h1>Liam & Nicole</h1>
      </div>
      <div className="subtitle-text">
        <p>We're Getting Married!</p>
      </div>
    </div>
  );
};

export default FullWidthPhoto;
