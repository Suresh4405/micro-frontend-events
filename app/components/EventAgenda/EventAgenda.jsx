"use client";

import "../css/event.css";

export default function EventAgenda() {
  return (
    <section className="agenda">
      <div className="agenda-container">
        <h2 className="agenda-title">Event Agenda</h2>

        <div className="agenda-grid">
          <div className="agenda-card">
            <h3>Opening Ceremony: India's Gift to the AI Century</h3>
            <p className="agenda-speaker">
             Shri Narendra Modi, Prime Minister of India
            </p>
            <p className="agenda-text">
             A historic opening address from the leader of the world's largest democracy on why AI must be democratized and how the Global South will lead its most human-centric.
            </p>
          </div>
          <div className="agenda-card">
            <h3>
              Keynote:
              <br />
              Fireside Chat: The Intelligence Era
            </h3>
            <p className="agenda-speaker">
              Sundar Pichai, CEO, Alphabet & Google
            </p>
            <p className="agenda-text">
              From DeepMind to Search to Gemini where Google is placing its biggest bets, and how Sundar thinks about balancing breakthrough innovation with global responsibility.
            </p>
          </div>
          <div className="agenda-card">
            <h3>Satya Nadella, Chairman & CEO, Microsoft</h3>
            <p className="agenda-speaker">The Co-Pilot Economy</p>
            <p className="agenda-text">
              How work itself is being rewritten—and what it means for every industry, every job, and every person on the planet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
