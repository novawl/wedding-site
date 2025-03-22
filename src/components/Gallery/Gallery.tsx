import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './Gallery.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface GalleryItem {
  image: string;
  title?: string;
  description?: string;
}

export interface GalleryProps {
  items: GalleryItem[];
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Disable background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  // react-slick slider settings
  const sliderSettings = {
    initialSlide: currentIndex,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    arrows: false, // No visible prev/next buttons
  };

  return (
    <div className="masonry-container">
      {/* Masonry grid */}
      <div className="masonry-gallery">
        {items.map((item, index) => (
          <div key={index} className="gallery-card" onClick={() => openModal(index)}>
            <img src={item.image} alt={item.title || `Image ${index}`} />
            {item.title && <h3>{item.title}</h3>}
            {item.description && <p>{item.description}</p>}
          </div>
        ))}
      </div>

      {/* Modal with react-slick slider */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Slider {...sliderSettings}>
              {items.map((item, index) => (
                <div key={index} className="modal-slide">
                  {/* 
                    For pinch-to-zoom, wrap the image in your favorite pinch-to-zoom component.
                    For example, using react-pinch-zoom-pan, react-medium-image-zoom, etc.
                  */}
                  <img src={item.image} alt={item.title || `Image ${index}`} className="modal-image" />
                  {item.title && <h3>{item.title}</h3>}
                  {item.description && <p>{item.description}</p>}
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
