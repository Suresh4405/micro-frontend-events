"use client";
import Image from "next/image";
import "../css/featured.css";

export default function FeaturedSpeakers() {
  return (
    <section className="speakers">
      <div className="speakers-container">
        <h2 className="speakers-title">Featured Speakers</h2>

        <div className="speaker-card">
          <Image
            src="/featurespeaker/modi.png"
            alt="Modi"
            width={100}
            height={100}
            className="speaker-img"
          />
          <div className="speaker-content">
            <h3>Shri Narendra Modi</h3>
            <p>
              As leader of the world's largest democracy and fastest-growing digital economy, PM Modi sets the vision for how AI can democratize opportunity across continents. His message: technology must reach the last person first.
            </p>
          </div>
        </div>

        <div className="speaker-card">
          <Image
            src="/featurespeaker/sundar.png"
            alt="Sundar pichai"
            width={120}
            height={120}
            className="speaker-img"
          />
          <div className="speaker-content">
            <h3>Sundar Pichai</h3>
            <p>
              Leading one of the world's most advanced AI research labs (Google DeepMind), Sundar sits at the intersection of breakthrough innovation and global responsibility. He'll share what's next—and what keeps him up at night.            </p>
          </div>
        </div>

        <div className="speaker-card">
          <Image
            src="/featurespeaker/nadella.png"
            alt="Satya Nadella"
            width={120}
            height={120}
            className="speaker-img"
          />
          <div className="speaker-content">
            <h3>Satya Nadella</h3>
            <p>
Under Satya's leadership, Microsoft has partnered with OpenAI to bring AI to enterprise and consumer products worldwide. He'll discuss the co-pilot economy and how work itself is being rewritten.            </p>
          </div>
          
        </div>
        

        <div className="speaker-footer">
          <div>
            <h4>Additional Expert Perspectives</h4>
            <p>
              Invited experts from leading consulting and enterprise learning organizations will contribute short perspectives, offering insight into how large organizations are evolving skills and leadership models in the AI era.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
