import React from "react";
import styles from "./learn.css";

const impactStats = [
  { label: "People Reached with WASH Services", value: "Thousands" },
  { label: "Households Supported in Livelihoods", value: "Hundreds" },
  { label: "Water Points Constructed", value: "18 boreholes (10 non-functional)" },
  { label: "Volunteers Mobilized", value: "50+" },
  { label: "Districts Covered", value: "Multiple (Garissa, Gedo, Dolow, Kismayo)" },
  { label: "Training Sessions Delivered", value: "15+" },
];

const timelineEvents = [
  {
    date: "June 21–23, 2025",
    title: "Clean Water Provision – Luuq (Phase 2)",
    description:
      "Implemented cholera outbreak prevention through water trucking and awareness in Luuq area and villages.",
    icon: "💧",
  },
  {
    date: "June 25, 2025",
    title: "Jubaland Consultation Meeting – Kismayo",
    description:
      "Engaged with government and humanitarian partners on improving community services and coordination.",
    icon: "🤝",
  },
  {
    date: "July 7, 2025",
    title: "FSNAU Rural Food Security Assessment Coordination – Dolow",
    description:
      "Prepared for multisectoral assessment with partners to inform response planning after Gu 2025 season.",
    icon: "📊",
  },
  {
    date: "July 21, 2025",
    title: "FSNAU Field Data Collection",
    description:
      "Conducted field data gathering across target areas in coordination with partners.",
    icon: "📝",
  },
  {
    date: "July 25, 2025",
    title: "Security Crisis & Staff Safety – Beled-Hawo",
    description:
      "Conflict erupted affecting staff safety and operations. Project Manager Abdikadir Arab confirmed safe but unreachable during blackout.",
    icon: "⚠️",
  },
  {
    date: "July 27, 2025",
    title: "Conflict Escalation and Displacement – Beled-Hawo",
    description:
      "Renewed fighting displaced ~5,000 households (~30,000 people). Refugee camps established in Mandera.",
    icon: "🏠",
  },
  {
    date: "July 30, 2025",
    title: "FSC National Partners Meeting (Virtual)",
    description:
      "Participated in cluster meeting to coordinate food security responses and share field updates.",
    icon: "💻",
  },
];

const featuredStories = [
  {
    title: "Rapid Response Assessment in Beled-Hawo",
    narrative:
      "Following violent clashes, ITEPADS quickly deployed teams to document displacement and damage, providing critical data for response planning.",
    quote: "“Our priority was to understand the needs on the ground fast to help those affected.” — Abdikadir Arab, Project Manager",
    photoAlt: "Field assessment in Beled-Hawo",
    photoUrl: "/assets/images/assessment_photo.jpeg", // Replace with actual path
  },
  {
    title: "Cholera Prevention Success in Luuq",
    narrative:
      "Three-day clean water provision and hygiene awareness efforts helped hundreds of households reduce cholera risk during outbreak.",
    quote: "“Access to clean water saved lives and restored hope.” — Community Member",
    photoAlt: "Water trucking in Luuq",
    photoUrl: "/assets/images/water_truck.jpeg", // Replace with actual path
  },
];

const LearningImpactPage = () => {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      {/* Intro Statement */}
      <section>
        <h1>Learning & Impact at ITEPADS</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
          At ITEPADS, every project is a learning opportunity that drives us closer
          to sustainable change. We measure success not just by numbers, but by the
          transformed lives and strengthened communities we serve. Our ongoing
          engagement in sector forums and dedication to transparent,
          evidence-based programming ensure we adapt and improve continuously.
        </p>
      </section>

      {/* Impact Stats */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Impact at a Glance</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          {impactStats.map(({ label, value }) => (
            <div
              key={label}
              style={{
                padding: "1rem",
                background: "#f0f8ff",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{value}</h3>
              <p style={{ margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Impact Timeline</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
          {timelineEvents.map(({ date, title, description, icon }) => (
            <li
              key={title}
              style={{
                marginBottom: "1.5rem",
                borderLeft: "3px solid #0077b6",
                paddingLeft: "1rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "-28px",
                  top: 0,
                  backgroundColor: "#0077b6",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                }}
                aria-label="Timeline icon"
              >
                {icon}
              </span>
              <time
                style={{ fontWeight: "600", color: "#023e8a", display: "block" }}
                dateTime={date}
              >
                {date}
              </time>
              <h3 style={{ margin: "0.25rem 0" }}>{title}</h3>
              <p style={{ marginTop: 0 }}>{description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured Stories */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Featured Stories</h2>
        {featuredStories.map(({ title, narrative, quote, photoAlt, photoUrl }) => (
          <article
            key={title}
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <img
              src={photoUrl}
              alt={photoAlt}
              style={{ width: 300, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
            />
            <div style={{ flex: "1 1 300px" }}>
              <h3>{title}</h3>
              <p>{narrative}</p>
              <blockquote
                style={{
                  fontStyle: "italic",
                  background: "#e0f7fa",
                  padding: "0.5rem 1rem",
                  borderLeft: "4px solid #0077b6",
                  margin: "1rem 0 0 0",
                }}
              >
                {quote}
              </blockquote>
            </div>
          </article>
        ))}
      </section>

      {/* Call to Action */}
      <section
        style={{
          marginTop: "4rem",
          padding: "2rem",
          backgroundColor: "#0077b6",
          color: "white",
          textAlign: "center",
          borderRadius: 8,
        }}
      >
        <h2>Support Our Work</h2>
        <p>
          Join us in creating lasting change in vulnerable communities. Your support
          empowers clean water access, health initiatives, and emergency response.
        </p>
        <a
          href="/donate"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            backgroundColor: "white",
            color: "#0077b6",
            padding: "0.75rem 1.5rem",
            borderRadius: 4,
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Donate Now
        </a>
      </section>
    </main>
  );
};

export default LearningImpactPage;
