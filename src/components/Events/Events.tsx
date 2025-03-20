import React from 'react';
import './Events.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface EventItem {
  title: string;
  time: string;
  locationName: string;
  address: string;
}

const Events: React.FC = () => {
  // Example hardcoded data. You could fetch these from an API or pass them in as props.
  const events: EventItem[] = [
    {
      title: 'Ceremony',
      time: '3:30 PM – 4:30 PM',
      locationName: 'Ellen Browning Scripps Park',
      address: '1100 Coast Blvd, La Jolla, CA 92037',
    },
    {
      title: 'Cocktail & Reception',
      time: '5:00 PM – 9:00 PM',
      locationName: 'Animae',
      address: '969 Pacific Hwy, San Diego, CA 92101',
    },
  ];

  return (
    <div className="events-container">
      <h2 className="events-date">April 19, 2025</h2>
      {events.map((event, index) => (
        <div key={index} className="event">
          {/* 
            Here we combine title and time in one "header" section, 
            and use flex styling in the CSS to keep them on the same line.
          */}
          <div className="event-header">
            <h3 className="event-title">{event.title}</h3>
            <span className="event-time">{event.time}</span>
          </div>
          <p className="event-location">
            <FaMapMarkerAlt className="location-icon" />
            {event.locationName}
          </p>
          <p className="event-address">{event.address}</p>
        </div>
      ))}
    </div>
  );
};

export default Events;
