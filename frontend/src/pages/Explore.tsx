import React, { useState, useEffect } from "react";
import "../styles/Explore.css"; // Make sure this file includes the fade + layout styles

export default function Explore() {
  // Hero slideshow images
  const images = [
    { url: "/assets/images/image1.jpeg", description: "A beautiful landscape at sunset." },
    { url: "/assets/images/image2.jpeg", description: "The serenity of a mountain lake." },
    { url: "/assets/images/image3.jpeg", description: "A bustling city skyline at night." },
    { url: "/assets/images/image4.jpeg", description: "A peaceful forest in the morning light." },
    { url: "/assets/images/image5.jpeg", description: "A stunning beach view with clear water." },
    { url: "/assets/images/image6.jpeg", description: "The vibrancy of a busy street market." },
    { url: "/assets/images/image7.jpeg", description: "A close-up of nature’s details: flowers and dew." },
    { url: "/assets/images/image8.jpeg", description: "The stillness of a calm river during dawn." },
    { url: "/assets/images/image9.jpeg", description: "A scenic aerial view of a sprawling city." },
    { url: "/assets/images/image10.jpeg", description: "The grandeur of a snow-capped mountain range." }
  ];

  const sectors = [
    {
      title: "Livelihoods",
      desc: "Agriculture support, drought resilience, farm nurseries, certified seeds and market linkages.",
      bullets: ["Smallholder farmer support", "Climate-smart agriculture", "Micro-projects & revolving funds"]
    },
    {
      title: "WASH",
      desc: "Water provision, sanitation facilities and hygiene promotion in emergency and development contexts.",
      bullets: ["Water catchments & storage", "Latrine construction", "Hygiene promotion"]
    },
    {
      title: "Health",
      desc: "Community health outreach and emergency health response supporting vulnerable groups.",
      bullets: ["Community health outreach", "Emergency response support"]
    },
    {
      title: "Protection",
      desc: "Protection programming including peacebuilding, child/youth protection and community-based committees.",
      bullets: ["Peace & reconciliation committees", "Protection mainstreaming"]
    }
  ];

  const coverage = [
    "Head liaison offices: Mogadishu (Somalia), Nairobi (Kenya)",
    "Regional offices: Belet-Hawa, Luuq, Bardera, Dollow (Gedo)",
    "Field presence: Middle & Lower Juba, Galgaduud"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToImage = (i) => setCurrentImageIndex(i);

  return (
    <div className="explore-page">
      {/* Hero slideshow */}
      <div className="explore-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`explore-image ${index === currentImageIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(${image.url})`,
              opacity: index === currentImageIndex ? 1 : 0
            }}
            aria-hidden={index !== currentImageIndex}
          ></div>
        ))}

        <div className="explore-content">
          <h1>Explore ITEPADS</h1>
          <p>{images[currentImageIndex].description}</p>
        </div>

        {images.length > 1 && (
          <>
            <button className="nav-button left" onClick={prevImage} aria-label="Previous image">
              &#10094;
            </button>
            <button className="nav-button right" onClick={nextImage} aria-label="Next image">
              &#10095;
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="dots-container">
            {images.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === currentImageIndex ? "active" : ""}`}
                onClick={() => goToImage(i)}
              ></span>
            ))}
          </div>
        )}

        <div className="explore-pattern"></div>
      </div>

      {/* About & Coverage */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <section className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-2xl font-semibold mb-3">What we do</h2>
            <p className="text-gray-700 mb-4">
              We design and deliver community-led interventions focused on agriculture, emergency response, water &
              sanitation, climate-smart practices and social cohesion. Our approach centers community ownership,
              inclusivity and sustainability.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Emergency water provision & latrine construction</li>
              <li>Farmer training, certified seeds & nursery establishment</li>
              <li>Peacebuilding and protection committees at village level</li>
              <li>Micro-projects and revolving funds for women & youth</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-2xl font-semibold mb-3">Coverage</h2>
            <p className="text-gray-700 mb-4">
              Our operational footprint spans key districts in Gedo, Middle & Lower Juba and Galgaduud in Somalia and
              we maintain liaison support in Nairobi, Kenya.
            </p>
            <ul className="list-inside space-y-2 text-gray-700">
              {coverage.map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="font-medium">Quick contacts</h3>
              <p className="text-sm text-gray-600">Phone (Somalia): +252 618 681 107</p>
              <p className="text-sm text-gray-600">Phone (Kenya): +254 722 303 366</p>
              <p className="text-sm text-gray-600">Email: info@itepads.com</p>
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Sectors</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {sectors.map((s) => (
              <article key={s.title} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
                <h4 className="font-semibold">{s.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
                <ul className="mt-3 list-disc pl-5 text-gray-600 text-sm">
                  {s.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Get involved */}
        <section className="mb-10 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-3">Get Involved</h2>
          <p className="text-gray-700">
            We are building momentum toward new projects starting 2026. Right now the team is voluntary — your support
            will help revive our visibility and re-start operations. Ways to support:
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a className="px-4 py-2 bg-green-600 text-white rounded" href="#volunteer">
              Volunteer
            </a>
            <a className="px-4 py-2 border rounded" href="#partner">
              Partner with us
            </a>
            <a className="px-4 py-2 border rounded" href="#donate">
              Donate / CSR
            </a>
          </div>
        </section>

        {/* Photos + Map */}
        <section className="mb-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-3">Latest photos</h2>
            <div className="grid grid-cols-2 gap-2">
              {images.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`photo ${i + 1}`}
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-3">Map & Presence</h2>
            <p className="text-gray-600 mb-4">
              (Placeholder) — Replace with an embedded map (Leaflet or Google Maps) showing office locations and field
              sites.
            </p>
            <div className="h-56 bg-gray-200 rounded flex items-center justify-center text-gray-500">
              Map placeholder
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 border-t mt-8 text-center text-gray-600">
          <p className="mb-2">
            ITEPADS — Working towards a just society. &nbsp;|&nbsp; Registered in Jubaland State & Federal Somalia
          </p>
          <p>Follow us: @ITEPADS @ITEPADSNGO</p>
        </footer>
      </div>
    </div>
  );
}
