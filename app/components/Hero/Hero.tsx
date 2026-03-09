"use client";
import Image from "next/image";
import "../css/hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <Image
        src="/hero/herobackground.jpg"
        alt="Event Background"
        fill
        priority
        className="hero-bg"
      />

      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-logo">
          <Image
            src="/hero/logo.svg"
            alt="Logo"
            width={280}
            height={86}
            priority
          />
        </div>
        
        <div className="hero-badge-row">
          <span className="hero-badge">Invite-Only</span>
          <span className="hero-subtitle">
            An Executive Roundtable · Launch
          </span>
        </div>

        <h1 className="hero-title">
          <span className="first-line">The Global AI Leadership Summit:</span>
          <br />
          <span className="second-line">Shaping the Future of Humanity & Technology</span>
        </h1>

        <div className="hero-info">
          <p>
            <Image src="/hero/calender-icon.svg" alt="Calendar" width={18} height={18} />
            August 20, 2026
          </p>
          <p>
            <Image src="/hero/location-icon.svg" alt="Location" width={18} height={18} />
            New Delhi | Hybrid Event
          </p>
        </div>
      </div>
    </section>
  );
}