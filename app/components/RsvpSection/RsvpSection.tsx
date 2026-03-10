"use client";

import { useState, useRef } from "react";
import "../css/rsvp.css";
import { clickrsvp } from "../../actions/rsvp"; 

export default function RsvpSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToastMessage(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    if (!email || !email.includes("@")) {
      setToastMessage({
        text: "Please enter a valid email address",
        type: "error"
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      await clickrsvp(formData);
      setToastMessage({
        text: "Thanks for connecting!",
        type: "success"
      });
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      
    } catch (error) {
      setToastMessage({
        text: error instanceof Error ? error.message : "Failed to submit",
        type: "error"
      });
      
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rsvp-section">
      <div className="rsvp-container">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="rsvp-input-row">
            <div className="input-wrapper">
              <span className="mail-icon">✉</span>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your work email to confirm your attendance"
                disabled={isSubmitting}
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="rsvp-btn">
              {isSubmitting ? (
                <>
                  <span className="processing-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                  Please wait
                </>
              ) : (
                "RSVP Now"
              )}
            </button>
          </div>
          
          {toastMessage && (
            <div 
              className={`toast-message ${toastMessage.type}`}
              style={{
                marginTop: "12px",
                padding: "10px 16px",
                borderRadius: "4px",
                background: toastMessage.type === "success" ? "#29aa7f" : "#EF4444",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                animation: "fadeIn 0.3s ease-out",
                width: "100%"
              }}
            >
              {toastMessage.type === "success" ? "✓ " : "✕ "}
              {toastMessage.text}
            </div>
          )}
        </form>

        <p className="rsvp-paragraph">
          The world's most influential leaders, technologists, and policymakers are coming together for a historic two-day dialogue on artificial intelligence—its promise, its perils, and the path forward for 8 billion people.
        </p>

        <p className="rsvp-paragraph">
          When the brightest minds meet, humanity wins.
        </p>

        <h2 className="rsvp-highlight">
          Which capabilities will matter most,
          <br />
          and how do we build them at scale?
        </h2>

        <p className="rsvp-paragraph">
          This is not just another tech conference. This is a closed-door, high-stakes convening of the people actually building, regulating, and deploying AI at global scale. For the first time, heads of state sit beside tech founders to answer one question
        </p>
      </div>
    </section>
  );
}