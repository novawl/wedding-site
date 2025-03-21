import React from 'react';
import './App.css';
import FullWidthPhoto from './components/FullWidthPhoto/FullWidthPhoto';
import Events from './components/Events/Events';
import AcceptForm from './components/RSVP/RSVP';
import DeclineForm from './components/RSVP/Decline';
import Header from './components/Header/Header';
import DressCodeButton from './components/DressCode/DressCode';

function App() {
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
        <section id="events" style={{ margin: '1rem 0' }}>
          <Events />
        </section>
        <section id="rsvp" style={{ margin: '1rem 0' }}>
          <AcceptForm />
          <DeclineForm />
        </section>
      </main>
    </div>
  );
}

export default App;
