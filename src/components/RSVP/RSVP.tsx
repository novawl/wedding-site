import React, { useState, useRef, useEffect } from "react";
import "./RSVP.css";

interface RSVPFormData {
  firstName: string;
  lastName: string;
  email: string;
  attending: string; // "yes" or "no"
  guests: string;
  restrictions: string;
  comments: string;
}

const RSVPForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  // Store form data in state (remains even if form is hidden)
  const [formData, setFormData] = useState<RSVPFormData>({
    firstName: "",
    lastName: "",
    email: "",
    attending: "",
    guests: "",
    restrictions: "",
    comments: "",
  });

  // Ref for the modal content to detect outside clicks
  const formRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of the form to close the prompt
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
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

    // Replace this with your actual Apps Script Web App URL
    const scriptURL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        // Clear form data upon successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          attending: "",
          guests: "",
          restrictions: "",
          comments: "",
        });
        // Optionally close the form after submission
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
        RSVP
      </button>

      {showForm && (
        <div className="rsvp-backdrop">
          <div className="rsvp-modal" ref={formRef}>
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <h2>RSVP</h2>
              <div className="rsvp-field">
                <label htmlFor="firstName">First Name (required)</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="rsvp-field">
                <label htmlFor="lastName">Last Name (required)</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="rsvp-field">
                <label htmlFor="email">Email (required)</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="rsvp-field">
                <label>Will you be attending? (required)</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === "yes"}
                      onChange={handleChange}
                      required
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === "no"}
                      onChange={handleChange}
                      required
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="rsvp-field">
                <label htmlFor="guests">Names of Guests in your Party</label>
                <input
                  id="guests"
                  type="text"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                />
              </div>

              <div className="rsvp-field">
                <label htmlFor="restrictions">Any food restrictions?</label>
                <input
                  id="restrictions"
                  type="text"
                  name="restrictions"
                  value={formData.restrictions}
                  onChange={handleChange}
                />
              </div>

              <div className="rsvp-field">
                <label htmlFor="comments">Questions or Comments</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="rsvp-submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RSVPForm;
