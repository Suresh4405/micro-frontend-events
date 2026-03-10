"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import "../css/footer.css";
import { clickrsvp } from "../../actions/rsvp"; 

export default function Footer() {
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
    <section className="footer-cta">
      <div className="footer-overlay">
        <p className="footer-top-text">Space is limited.</p>
        
        <form ref={formRef} onSubmit={handleSubmit} className="footer-form">
          <div className="footer-input-wrapper">
            <span className="footer-mail-icon">✉</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your work email to confirm your attendance"
              disabled={isSubmitting}
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="footer-submit-btn">
            {isSubmitting ? (
              <>
                <span className="footer-processing-dots">
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
              className={`footer-toast-message ${toastMessage.type}`}
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
        
        <div className="footer-bottom">
          <div className="footer-logo-wrap">
            <Image
              src="/footer/logo.svg"
              alt="Footer logo"
              fill
              priority
              className="footer-logo"
            />
          </div>

          <p className="footer-copyright">
            © 2002–2026 · Suresh Code. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}