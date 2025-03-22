import React, { useState, useCallback } from 'react';
import './Gallery.css';

interface GalleryItem {
  image: string;
  title?: string;
  description?: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

const SWIPE_THRESHOLD = 50; // Minimum horizontal drag (in px) to register as a swipe

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Touch positions to detect swipes
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Open modal at a given index
  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedIndex(null);
  };

  // Go to the previous image (wrap around if needed)
  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? items.length - 1 : prev - 1;
    });
  }, [items.length]);

  // Go to the next image (wrap around if needed)
  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === items.length - 1 ? 0 : prev + 1;
    });
  }, [items.length]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      // If diff > threshold => user swiped left => next
      if (diff > SWIPE_THRESHOLD) {
        goToNext();
      }
      // If diff < -threshold => user swiped right => previous
      else if (diff < -SWIPE_THRESHOLD) {
        goToPrevious();
      }
    }
    // Reset swipe
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="masonry-container">
      {/* Masonry-style column layout */}
      <div className="masonry-gallery">
        {items.map((item, index) => (
          <div
            key={index}
            className="gallery-card"
            onClick={() => openModal(index)}
          >
            <img src={item.image} alt={item.title || `Image ${index}`} />
            {item.title && <h3>{item.title}</h3>}
            {item.description && <p>{item.description}</p>}
          </div>
        ))}
      </div>

      {/* Modal Overlay (only if an image is selected) */}
      {selectedIndex !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={items[selectedIndex].image}
              alt={items[selectedIndex].title || `Image ${selectedIndex}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
