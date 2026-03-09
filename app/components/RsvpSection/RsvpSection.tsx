"use client";

import { useState, useRef } from "react";
import "../css/rsvp.css";
import { clickrsvp } from "../../actions/rsvp"; 
import { useToast } from "../providers/toast-provider";

export default function RsvpSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address", "error");
      setIsSubmitting(false);
      return;
    }
    
    try {
      await clickrsvp(formData);
      showToast("Thanks for connecting!", "success");
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to submit",
        "error"
      );
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