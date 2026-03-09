"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import "../css/footer.css";
import { clickrsvp } from "../api/rsvp/route";

import { useToast } from "../providers/toast-provider";

export default function Footer() {
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
            © 2009–2025 · Suresh Code. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}