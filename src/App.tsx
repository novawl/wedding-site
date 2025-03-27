import React from 'react';
import './App.css';
import FullWidthPhoto from './components/FullWidthPhoto/FullWidthPhoto';
import Events from './components/Events/Events';
import Header from './components/Header/Header';
import { FaHeartbeat } from "react-icons/fa";
import Attending from './components/RSVP/Attending';
import Gallery, { PhotoItem } from './components/Gallery/Gallery';

function App() {
  const galleryItems: PhotoItem[] = [
    {
      src: '/images/1.jpeg',
      alt: 'Sunset',
      description: 'We crushed every level of Overcooked with 3 stars!',
    },
    {
      src: '/images/2.jpeg',
    },
    {
      src: '/images/3.jpeg',
      description: 'Liam: Don\'t even think about touching the housework in this house!',
    },
    {
      src: '/images/4.jpeg',
    },
    {
      src: '/images/5.jpeg',
      description: 'We hug even when we argue.'
    },
    {
      src: '/images/6.jpeg',
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
        <section id="events">
          <Events />
        </section>
        <section id="rsvp">
          <Attending />
        </section>
        <section id="gallery">
          <Gallery photos={galleryItems}  />
        </section>
        <div className='App-footer'>
          Created by Liam & Nicole with lots of love <FaHeartbeat className="heart-icon" />
        </div>
      </main>
    </div>
  );
}

export default App;
