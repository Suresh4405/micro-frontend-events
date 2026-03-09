"use client";

import { useEffect } from "react";
import Hero from "./components/Hero/Hero";
import RsvpSection from "./components/RsvpSection/RsvpSection";
import Explore from "./components/Explore/Explore";
import FeaturedSpeakers from "./components/FeaturedSpeakers/FeaturedSpeakers";
import BehindCurtain from "./components/Behind/BehindCurtain";
import EventAgenda from "./components/EventAgenda/EventAgenda";
import Footer from "./components/Footer/Footer";

export default function Home() {
useEffect(() => {
  const sendHeight = () => {
    const height = document.documentElement.scrollHeight;
    
    window.parent.postMessage(
      {
        type: "resize",
        height: Math.ceil(height) 
      },
      "*"
    );
  };

  setTimeout(sendHeight, 100);
  
  const observer = new MutationObserver(() => {
    setTimeout(sendHeight, 50);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
  });

  window.addEventListener("resize", sendHeight);

  return () => {
    observer.disconnect();
    window.removeEventListener("resize", sendHeight);
  };
}, []);

  return (
    <main>
      <Hero />
      <RsvpSection />
      <Explore />
      <FeaturedSpeakers />
      <BehindCurtain />
      <EventAgenda />
      <Footer />
    </main>
  );
}