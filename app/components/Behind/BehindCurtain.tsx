"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import "../css/curtain.css";
import { clickrsvp } from "../../actions/rsvp"; 

export default function Behind() {
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
      
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
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
            
            {toastMessage && (
              <div 
                className={`behind-toast-message ${toastMessage.type}`}
                style={{
                  marginTop: "12px",
                  padding: "10px 16px",
                  borderRadius: "4px",
                  background: toastMessage.type === "success" ? "#29aa7f" : "#EF4444",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                  textAlign: "center",
                  width: "100%",
                  gridColumn: "1 / -1", 
                  animation: "fadeIn 0.3s ease-out"
                }}
              >
                {toastMessage.type === "success" ? "✓ " : "✕ "}
                {toastMessage.text}
              </div>
            )}
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