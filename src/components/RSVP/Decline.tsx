import React, { useState, useRef, useEffect } from "react";
import "./RSVP.css";

/* Font Awesome Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface DecilneFormData {
  comments: string;
}

const DeclineForm: React.FC = () => {
  const [showDeclineForm, setShowDeclineForm] = useState(false);

  // Store form data in state (remains even if form is hidden)
  const [declineFormData, setDeclineFormData] = useState<DecilneFormData>({
    comments: "",
  });

  // Ref for the modal content to detect outside clicks
  const formRef = useRef<HTMLDivElement>(null);
  // Refs for the textareas to auto-resize them
  const commentsTextAreaRef2 = useRef<HTMLTextAreaElement>(null);

  // Handle clicks outside of the form to close the prompt
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowDeclineForm(false);
      }
    }

    if (showDeclineForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeclineForm]);
    
  // Effect to auto-resize textareas when the form is shown or when the text changes
  useEffect(() => {
    if (showDeclineForm) {
      if (commentsTextAreaRef2.current) {
        commentsTextAreaRef2.current.style.height = "auto";
        commentsTextAreaRef2.current.style.height = `${commentsTextAreaRef2.current.scrollHeight}px`;
      }
    }
  }, [showDeclineForm, declineFormData.comments]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDeclineFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your actual Apps Script / server endpoint
    const scriptURL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(declineFormData),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        // Reset the form if desired
        setDeclineFormData({
          comments: "",
        });
        setShowDeclineForm(false);
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
      <button className="decline-button" onClick={() => setShowDeclineForm(true)}>
        Decline with regret
      </button>

      {showDeclineForm && (
        <div className="rsvp-backdrop">
          <div className="rsvp-modal" ref={formRef}>
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <h2>We'll miss you!</h2>

              <div className="input-container">
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <textarea
                  ref={commentsTextAreaRef2}
                  name="comments"
                  placeholder="Please feel free to leave us a note or some kind words – your thoughts mean a lot to us."
                  value={declineFormData.comments}
                  onChange={(e) => {
                    handleChange(e);
                    if (commentsTextAreaRef2.current) {
                        commentsTextAreaRef2.current.style.height = "auto";
                        commentsTextAreaRef2.current.style.height = `${commentsTextAreaRef2.current.scrollHeight}px`;
                    }
                  }}
                  rows={1}
                />
              </div>

              <button type="submit" className="decline-submit-button">
                Sorry, I can’t make it
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeclineForm;
