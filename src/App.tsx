import React from 'react';
import './App.css';
import FullWidthPhoto from './components/FullWidthPhoto/FullWidthPhoto';
import Events from './components/Events/Events';
import Header from './components/Header/Header';
import DressCodeButton from './components/DressCode/DressCode';
import Attending from './components/RSVP/Attending';
import Gallery, { GalleryItem } from './components/Gallery/Gallery';

function App() {
  const galleryItems: GalleryItem[] = [
    {
      image: '/images/1.jpeg',
      title: 'Sunset',
      description: 'A beautiful sunset over the mountains.',
    },
    {
      image: '/images/2.jpeg',
      title: 'Forest',
      // No description provided
    },
    {
      image: '/images/3.jpeg',
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
          <Gallery items={galleryItems}  />
        </section>
      </main>
    </div>
  );
}

export default App;
