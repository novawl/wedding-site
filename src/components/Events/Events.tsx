import React from 'react';
import './Events.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import DressCode from '../DressCode/DressCode';

const Events: React.FC = () => {
  return (
    <div className="events-container">
      <h2 className="events-date">April 19, 2025</h2>

      <div key={0} className="event">
        <div className="event-header">
          <h3 className="event-title">Ceremony</h3>
          <span className="event-time">{'3:30 PM – 4:30 PM'}</span>
        </div>
        <a 
          href="https://www.google.com/maps/search/?api=1&query=Ellen+Browning+Scripps+Park+La+Jolla"
          target="_blank"
          rel="noopener noreferrer"
          className="event-location"
        >
          <FaMapMarkerAlt className="location-icon" />
          {'Ellen Browning Scripps Park'}
        </a>
        <a 
          href="https://www.google.com/maps/search/?api=1&query=1100+Coast+Blvd+La+Jolla+CA+92037"
          target="_blank"
          rel="noopener noreferrer"
          className="event-address"
        >
          {'1100 Coast Blvd, La Jolla, CA 92037'}
        </a>
        <DressCode/>
      </div>

      <div key={1} className="event">
        <div className="event-header2">
          <h3 className="event-title">{'Cocktail'}</h3>
          <span className="event-time">{'5:00 PM – 6:00 PM'}</span>
        </div>
        <div className="event-header">
          <h3 className="event-title">{'Reception'}</h3>
          <span className="event-time">{'6:00 PM – 9:00 PM'}</span>
        </div>
        <a 
          href="https://www.google.com/maps/search/?api=1&query=Animae+San+Diego"
          target="_blank"
          rel="noopener noreferrer"
          className="event-location"
        >
          <FaMapMarkerAlt className="location-icon" />
          {'Animae'}
        </a>
        <a 
          href="https://www.google.com/maps/search/?api=1&query=969+Pacific+Hwy+San+Diego+CA+92101"
          target="_blank"
          rel="noopener noreferrer"
          className="event-address"
        >
          {'969 Pacific Hwy, San Diego, CA 92101'}
        </a>
      </div>
    </div>
  )
};

export default Events;
