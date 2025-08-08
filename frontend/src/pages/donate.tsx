// src/pages/donate.tsx
import React from 'react';
import '../styles/donate.css';


const Donations: React.FC = () => {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <h1>Donations & Partnerships</h1>

      <section style={{ marginTop: '2rem' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          At ITEPADS, we rely on the generosity of donors and the collaboration of partners to make a lasting impact. Your support enables us to deliver essential services to vulnerable communities, improve livelihoods, and respond swiftly to emergencies.
        </p>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2>How You Can Support Us</h2>
        <ul style={{ lineHeight: 1.8 }}>
          <li><strong>Monetary Donations:</strong> Contributions to fund ongoing projects and emergency relief.</li>
          <li><strong>In-kind Donations:</strong> Supplies, equipment, or materials that help our field activities.</li>
          <li><strong>Volunteer Partnerships:</strong> Join our team or collaborate on capacity building and outreach.</li>
          <li><strong>Corporate Sponsorships:</strong> Partner with us for mutual growth and social responsibility.</li>
          <li><strong>Technical Collaboration:</strong> Share expertise, technology, and innovative solutions.</li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2>Our Current Partners</h2>
        <ul>
          <li>FAO - Food Security and Nutrition Analysis Unit (FSNAU)</li>
          <li>Somali Disaster Management Agency (SODMA)</li>
          <li>Ministry of Agriculture and Irrigation</li>
          <li>Ministry of Livestock, Forestry and Range</li>
          <li>Local Community Leaders and Volunteers</li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem', backgroundColor: '#f0f8ff', padding: '1.5rem', borderRadius: 8 }}>
        <h2>Make a Donation</h2>
        <p>Your generous donation makes a difference. Choose one of the following methods to contribute:</p>
        <ul>
          <li><strong>Bank Transfer:</strong> Account Name: ITEPADS | Account Number: 123456789 | Bank: XYZ Bank</li>
          <li><strong>Mobile Money:</strong> Paybill Number: 123456 | Account: ITEPADS</li>
          <li>
            <strong>Online Payment:</strong> <a href="/donate" style={{ color: '#0077b6', textDecoration: 'underline' }}>Donate via our secure portal</a>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem', textAlign: 'center' }}>
        <a
          href="/contact"
          style={{
            backgroundColor: '#0077b6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: 4,
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          Contact Us for Partnership Opportunities
        </a>
      </section>
    </main>
  );
};

export default Donations;
