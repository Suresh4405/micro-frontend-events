"use client";
import Image from "next/image";
import "../css/explore.css";

const data = [
  {
    title: "Economic Decay",
    para:"every 2–3 years",
    desc: "faster for Economic",
    icon: "/explore/skill-icon.png",
  },
   {
    title: "Core Human Capabilities",
    para:"analytical reasoning ",
    desc: "and scenario planning",
    icon: "/explore/core-human-icon.png",
  },
  {
    title: "Winning Organizations",
    para:"predict skills",
    desc: " ahead of demand",
    icon: "/explore/winning-orgnization-icon.png",
  },
  {
    title: "Manager Role Shift",
    para:"orchestrating",
    desc: "people + AI agents",
    icon: "/explore/manager-role-icon.png",
  },
  {
    title: "Leaders + AI Co-Pilots",
    para:"requires sensemaking",
    desc: "and systems thinking",
    icon: "/explore/leaderai-icon.png",
  },
  {
    title: "Frontline Capability",
    para: "now depends",
    desc:"on digital fluency",
    icon: "/explore/frontline-icon.png",
  },
 
];

export default function Explore() {
  return (
    <section className="explore">
      <div className="explore-header">
        <h2>What We’ll Explore</h2>
        <p>The critical shifts every enterprise must plan for:</p>
      </div>

      <div className="explore-grid">
        {data.map((item, i) => (
          <div className="explore-card" key={i}>
            <div className="explore-card-top">
              <Image src={item.icon} alt="" width={28} height={28} />
              <h3>{item.title}</h3>
            </div>
            <p className="explore-desc">{item.para}</p>
          <p className="explore-desc">{item.desc}</p>

          </div>
        ))}
      </div>
    </section>
  );
}
