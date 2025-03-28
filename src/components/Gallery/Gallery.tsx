import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import './Gallery.css';

export interface PhotoItem {
  src: string;
  alt?: string;
  description?: string;
}

export interface GalleryProps {
  photos: PhotoItem[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  // Disable background scroll when modal is open.
  const handleVisibleChange = (visible: boolean) => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';
  };

  return (
    <div className="gallery-container">
        <h2 className="gallery-title">Gallery</h2>
        <PhotoProvider toolbarRender={() => null}>
            <div className="gallery">
                {photos.map((photo, index) => (
                <div className="gallery-item" key={index}>
                    <PhotoView src={photo.src}>
                    <img
                        src={photo.src}
                        alt={photo.alt || `Photo ${index + 1}`}
                        className="gallery-image"
                    />
                    </PhotoView>
                    {photo.description && (
                    <div className="gallery-description">{photo.description}</div>
                    )}
                </div>
                ))}
            </div>
        </PhotoProvider>
    </div>
  );
};

export default Gallery;
