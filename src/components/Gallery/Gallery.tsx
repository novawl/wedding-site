import React, { useState, useCallback, useEffect } from 'react';
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

  // For swiping when not zoomed in
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // For pinch-to-zoom and pan
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [lastTouchPositions, setLastTouchPositions] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // For smooth transitions after the gesture ends
  const [transitionEnabled, setTransitionEnabled] = useState(false);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedIndex]);

  // Reset zoom/swipe states when the modal opens/closes or the image changes
  useEffect(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setSwipeOffset(0);
    setSwipeStartX(null);
    setTransitionEnabled(false);
    setInitialPinchDistance(null);
  }, [selectedIndex]);

  // Open modal at a given index
  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedIndex(null);
  };

  // Go to the previous image (wraps around)
  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? items.length - 1 : prev - 1;
    });
  }, [items.length]);

  // Go to the next image (wraps around)
  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === items.length - 1 ? 0 : prev + 1;
    });
  }, [items.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Disable transitions while actively touching
    setTransitionEnabled(false);
    if (e.touches.length === 2) {
      // Start pinch-to-zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      setInitialPinchDistance(distance);
      // Use midpoint for potential future panning calculations
      setLastTouchPositions({
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
      });
    } else if (e.touches.length === 1) {
      if (scale > 1) {
        // Start panning a zoomed image
        setLastTouchPositions({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      } else {
        // Start a swipe gesture when not zoomed in
        setSwipeStartX(e.touches[0].clientX);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance) {
      // Handle pinch-to-zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const newScale = distance / initialPinchDistance;
      setScale(newScale);
    } else if (e.touches.length === 1) {
      if (scale > 1) {
        // Pan the zoomed image
        const currentPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        const deltaX = currentPos.x - lastTouchPositions.x;
        const deltaY = currentPos.y - lastTouchPositions.y;
        setOffset((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
        setLastTouchPositions(currentPos);
      } else {
        // Handle swipe movement when not zoomed
        if (swipeStartX !== null) {
          const currentX = e.touches[0].clientX;
          setSwipeOffset(currentX - swipeStartX);
        }
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      // Enable transition for a smooth end-of-gesture effect
      setTransitionEnabled(true);
      if (initialPinchDistance) {
        // End of pinch gesture
        if (scale < 1) {
          setScale(1); // prevent zooming out below 1
        }
        setInitialPinchDistance(null);
      }
      if (scale === 1 && swipeStartX !== null) {
        // Process swipe only if not zoomed
        if (Math.abs(swipeOffset) > SWIPE_THRESHOLD) {
          if (swipeOffset < 0) {
            goToNext();
          } else {
            goToPrevious();
          }
        }
        // Reset swipe states
        setSwipeOffset(0);
        setSwipeStartX(null);
      }
    }
  };

  // Determine the transform style for the modal image:
  // • When not zoomed (scale === 1) we use horizontal translate for swipe effects.
  // • When zoomed (scale > 1) we combine panning and zoom.
  const modalImageStyle =
    scale === 1
      ? {
          transform: `translateX(${swipeOffset}px)`,
          transition: transitionEnabled ? 'transform 0.3s ease' : 'none',
        }
      : {
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transition: transitionEnabled ? 'transform 0.3s ease' : 'none',
        };

  return (
    <div className="masonry-container">
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
              style={modalImageStyle}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
