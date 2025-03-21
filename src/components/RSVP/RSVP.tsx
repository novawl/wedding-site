import React, { useState, useRef, useEffect } from "react";
import "./RSVP.css";

/* Font Awesome Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faMusic, faComment } from "@fortawesome/free-solid-svg-icons";

interface RSVPFormData {
  name: string;
  guests: string;
  songs: string;
  comments: string;
}

const RSVPForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  // Store form data in state (remains even if form is hidden)
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    guests: "",
    songs: "",
    comments: "",
  });

  // Ref for the modal content to detect outside clicks
  const formRef = useRef<HTMLDivElement>(null);
  // Refs for the textareas to auto-resize them
  const songsTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const commentsTextAreaRef = useRef<HTMLTextAreaElement>(null);

  // Handle clicks outside of the form to close the prompt
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    }

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  // Effect to auto-resize textareas when the form is shown or when the text changes
  useEffect(() => {
    if (showForm) {
      if (songsTextAreaRef.current) {
        songsTextAreaRef.current.style.height = "auto";
        songsTextAreaRef.current.style.height = `${songsTextAreaRef.current.scrollHeight}px`;
      }
      if (commentsTextAreaRef.current) {
        commentsTextAreaRef.current.style.height = "auto";
        commentsTextAreaRef.current.style.height = `${commentsTextAreaRef.current.scrollHeight}px`;
      }
    }
  }, [showForm, formData.songs, formData.comments]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your actual Apps Script / server endpoint
    const scriptURL = "https://script.google.com/macros/s/AKfycbxwVpDJLqwj1oJkuV8AkHBd08SVi75malu8I2hgWYLwjy64l0WixE40FclqnBtK9hY/exec";
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          ...formData,
          type: "responses"
        }).toString(),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        // Reset the form if desired
        setFormData({
          name: "",
          guests: "",
          songs: "",
          comments: "",
        });
        setShowForm(false);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check console for details.");
    }
  };

  return (
    <div className="rsvp-wrapper">
      {/* The button that toggles the RSVP prompt */}
      <button className="rsvp-button" onClick={() => setShowForm(true)}>
        Accept with pleasure
      </button>

      {showForm && (
        <div className="rsvp-backdrop">
          <div className="rsvp-modal" ref={formRef}>
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <h2>We're thrilled you can make it!</h2>

              <div className="input-container">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-container">
                <FontAwesomeIcon icon={faUsers} className="icon" />
                <input
                  type="text"
                  name="guests"
                  placeholder="Number of guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-container">
                <FontAwesomeIcon icon={faMusic} className="icon" />
                <textarea
                  ref={songsTextAreaRef}
                  name="songs"
                  placeholder="Your favorite songs"
                  value={formData.songs}
                  onChange={(e) => {
                    handleChange(e);
                    if (songsTextAreaRef.current) {
                      songsTextAreaRef.current.style.height = "auto";
                      songsTextAreaRef.current.style.height = `${songsTextAreaRef.current.scrollHeight}px`;
                    }
                  }}
                  rows={1}
                  required
                />
              </div>

              <div className="input-container">
                <FontAwesomeIcon icon={faComment} className="icon" />
                <textarea
                  ref={commentsTextAreaRef}
                  name="comments"
                  placeholder="Things you'd like us to know"
                  value={formData.comments}
                  onChange={(e) => {
                    handleChange(e);
                    if (commentsTextAreaRef.current) {
                      commentsTextAreaRef.current.style.height = "auto";
                      commentsTextAreaRef.current.style.height = `${commentsTextAreaRef.current.scrollHeight}px`;
                    }
                  }}
                  rows={1}
                />
              </div>

              <button type="submit" className="rsvp-submit-button">
                Count me in!
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RSVPForm;
