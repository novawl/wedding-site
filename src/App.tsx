import React from 'react';
import './App.css';
import FullWidthPhoto from './components/FullWidthPhoto/FullWidthPhoto';
import Events from './components/Events/Events';
import Header from './components/Header/Header';
import DressCodeButton from './components/DressCode/DressCode';
import Attending from './components/RSVP/Attending';
import Gallery from './components/Gallery/Gallery';

function App() {
  const galleryItems = [
    {
      image: '/images/1.jpeg',
      title: 'Billboard Magazine, October 2023',
      description: 'Featured: Music Artist Matt Thompson',
    },
    {
      image: '/images/2.jpeg',
      // title is omitted here
      description: 'On the cover: Claire Godard, influencer @reinegodard',
    },
    {
      image: '/images/3.jpeg',
      // No title or description
    },

    {
      image: '/images/4.jpeg',
      // No title or description
    },

    {
      image: '/images/5.jpeg',
      // No title or description
    },

    {
      image: '/images/6.jpeg',
      // No title or description
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
