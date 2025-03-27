import React from 'react';
import './App.css';
import FullWidthPhoto from './components/FullWidthPhoto/FullWidthPhoto';
import Events from './components/Events/Events';
import Header from './components/Header/Header';
import DressCodeButton from './components/DressCode/DressCode';
import Attending from './components/RSVP/Attending';
import Gallery, { GalleryProps, PhotoItem } from './components/Gallery/Gallery';

function App() {
  const galleryItems: PhotoItem[] = [
    {
      src: '/images/1.jpeg',
      alt: 'Sunset',
      description: 'A beautiful sunset over the mountains.',
    },
    {
      src: '/images/2.jpeg',
      alt: 'Forest',
      // No description provided
    },
    {
      src: '/images/3.jpeg',
      // No title or description provided
    },

    {
      src: '/images/4.jpeg',
      // No title or description provided
    },

    {
      src: '/images/5.jpeg',
      // No title or description provided
    },

    {
      src: '/images/6.jpeg',
      // No title or description provided
    },
  ];
  
  return (
    <div className="App">
      {/* Hero Section: FullWidthPhoto with overlaid Header */}
      <section id="home" style={{ position: 'relative' }}>
        <Header />
        <FullWidthPhoto />
      </section>
      <main>
        {/* <section id="dresscode" style={{ margin: '2rem 0', textAlign: 'center' }}>
          <DressCodeButton />
        </section> */}
        <section id="events">
          <Events />
        </section>
        <section id="attending">
          <Attending />
        </section>
        <section id="gallery">
          <Gallery photos={galleryItems}  />
        </section>
      </main>
    </div>
  );
}

export default App;
