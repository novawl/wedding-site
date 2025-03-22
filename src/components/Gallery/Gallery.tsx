import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import './Gallery.css';

export interface GalleryItem {
  image: string;
  title?: string;
  description?: string;
}

export interface GalleryProps {
  items: GalleryItem[];
}

const SWIPE_THRESHOLD = 80; // pixels to trigger a swipe

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // ----- Zoom / Pinch States -----
  const [pinchMode, setPinchMode] = useState(false);
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [lastTouchPositions, setLastTouchPositions] = useState({ x: 0, y: 0 });

  // ----- Swipe States (only when scale === 1) -----
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(false);

  // ----- Carousel Container Width -----
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure container width when modal opens or on window resize
  useLayoutEffect(() => {
    const measureWidth = () => {
      if (modalContentRef.current) {
        setContainerWidth(modalContentRef.current.getBoundingClientRect().width);
      }
    };
    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, [selectedIndex]);

  // Reset gesture states when modal changes
  useEffect(() => {
    setPinchMode(false);
    setInitialPinchDistance(null);
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setSwipeOffset(0);
    setSwipeStartX(null);
    setTransitionEnabled(false);
  }, [selectedIndex]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : '';
  }, [selectedIndex]);

  // Helpers to cycle images
  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? items.length - 1 : prev - 1;
    });
  }, [items.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === items.length - 1 ? 0 : prev + 1;
    });
  }, [items.length]);

  const currentIndex = selectedIndex ?? 0;
  const prevIndex = (currentIndex - 1 + items.length) % items.length;
  const nextIndex = (currentIndex + 1) % items.length;

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  // ----- Touch Handlers -----
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTransitionEnabled(false);

    if (e.touches.length === 2) {
      // Pinch-to-zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      setPinchMode(true);
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      setInitialPinchDistance(Math.sqrt(dx * dx + dy * dy));
      setLastTouchPositions({
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      });
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      if (scale > 1) {
        // Pan zoomed image
        setLastTouchPositions({ x: touch.clientX, y: touch.clientY });
      } else {
        // Begin swipe gesture
        setSwipeStartX(touch.clientX);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Handle pinch-to-zoom
    if (pinchMode && e.touches.length === 2 && initialPinchDistance) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const newScale = distance / initialPinchDistance;
      setScale(newScale < 1 ? 1 : newScale);
      return;
    }

    // Handle panning when zoomed in
    if (scale > 1 && e.touches.length === 1) {
      const { clientX, clientY } = e.touches[0];
      const deltaX = clientX - lastTouchPositions.x;
      const deltaY = clientY - lastTouchPositions.y;
      setOffset((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      setLastTouchPositions({ x: clientX, y: clientY });
      return;
    }

    // Handle swipe if not zoomed in
    if (!pinchMode && scale === 1 && e.touches.length === 1 && swipeStartX !== null) {
      const currentX = e.touches[0].clientX;
      const dragDistance = currentX - swipeStartX;
      // Limit drag distance based on container width
      const limitedDrag = Math.max(Math.min(dragDistance, containerWidth), -containerWidth);
      setSwipeOffset(limitedDrag);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) {
      setTransitionEnabled(true);

      if (pinchMode) {
        // End pinch mode
        setPinchMode(false);
        if (scale < 1) setScale(1);
      } else if (scale === 1 && swipeStartX !== null) {
        // If swipe exceeds threshold, update current image; otherwise, snap back
        if (Math.abs(swipeOffset) > SWIPE_THRESHOLD) {
          if (swipeOffset < 0) {
            goToNext();
          } else {
            goToPrevious();
          }
        } else {
          setSwipeOffset(0);
        }
        setSwipeStartX(null);
      }
    }
  };

  // Render content: if zoomed, show single image; else, show a three-item carousel
  let content;
  if (scale > 1) {
    content = (
      <img
        className="modal-image"
        src={items[currentIndex].image}
        alt={items[currentIndex].title || `Image ${currentIndex}`}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transition: transitionEnabled ? 'transform 0.3s ease' : 'none',
        }}
      />
    );
  } else {
    // Translate the track so the current image is centered
    const trackTransform = containerWidth
      ? `translateX(${-containerWidth + swipeOffset}px)`
      : 'translateX(0px)';
    content = (
      <div
        className="carousel-track"
        style={{
          width: containerWidth * 3,
          transform: trackTransform,
          transition: transitionEnabled ? 'transform 0.3s ease' : 'none',
        }}
      >
        <div className="carousel-item" style={{ width: containerWidth }}>
          <img src={items[prevIndex].image} alt="Previous" />
        </div>
        <div className="carousel-item" style={{ width: containerWidth }}>
          <img src={items[currentIndex].image} alt="Current" />
        </div>
        <div className="carousel-item" style={{ width: containerWidth }}>
          <img src={items[nextIndex].image} alt="Next" />
        </div>
      </div>
    );
  }

  return (
    <div className="masonry-container">
      {/* Masonry Layout */}
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

      {/* Modal Overlay */}
      {selectedIndex !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="close-button"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              x
            </button>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
