"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import "../css/curtain.css";
import { clickrsvp } from "../api/rsvp/route";
import { useToast } from "../providers/toast-provider";

export default function Behind() {
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
      showToast("thanks for connecting!", "success");
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
    <section className="behind">
      <div className="behind-container">
        <div className="behind-left">
          <h2 className="behind-title">
            Go behind closed doors with the  
            <br />  architects of our AI future
          </h2>
          <p className="behind-subtitle">You'll walk away with:</p>
          <ul className="behind-list">
            <li>A front-row seat to history.</li>
            <li>Insights from high-scale operating environments.</li>
            <li>Early warning signals.</li>
            <li>Peer-validated perspectives from leaders.</li>
            <li>A role in shaping history.</li>
          </ul>
          <form ref={formRef} onSubmit={handleSubmit} className="behind-cta">
            <div className="input-wrap">
              <span className="mail-icons">✉</span>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your work email to confirm your attendance"
                disabled={isSubmitting}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
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
          </form>
        </div>
        <div className="behind-right">
          <Image
            src="/behindcurtain/chess.png"
            alt="chess"
            fill
            className="behind-img"
          />
        </div>
      </div>
    </section>
  );
}