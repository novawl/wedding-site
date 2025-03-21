import React from "react";
import RSVPForm from "./RSVP";
import DeclineForm from "./Decline";
import "./Attending.css";

const Attending: React.FC = () => {
  return (
    <div className="attending-section">
      <h2 className="attending-title">Will you join us?</h2>
      <div className="attending-buttons">
        {/* The RSVPForm and DeclineForm each handle their own modal logic */}
        <RSVPForm />
        <DeclineForm />
      </div>
    </div>
  );
};

export default Attending;
