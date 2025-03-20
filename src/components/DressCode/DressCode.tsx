import React, { useState } from 'react';
import './DressCode.css';

const DressCodeButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="dresscode-button" onClick={() => setShowModal(true)}>
        Dress Code
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Dress Code</h2>
            <p>
              Please wear cocktail attire. Men are encouraged to wear suits and ties,
              while women are encouraged to wear elegant dresses or cocktail attire.
            </p>
            <button className="close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DressCodeButton;
