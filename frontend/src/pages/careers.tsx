import React from 'react';

interface JobOpening {
  id: number;
  title: string;
  location: string;
  type: string; // Full-time, Part-time, Volunteer, Internship, etc.
  description: string;
  applyLink: string;
}

const jobOpenings: JobOpening[] = [
  {
    id: 1,
    title: 'Project Coordinator',
    location: 'Garissa, Kenya',
    type: 'Full-time',
    description:
      'Coordinate project activities, liaise with partners and beneficiaries, and ensure timely reporting.',
    applyLink: 'mailto:hr@itepads.org?subject=Application%20for%20Project%20Coordinator',
  },
  {
    id: 2,
    title: 'Field Officer – Water & Sanitation',
    location: 'Gedo, Somalia',
    type: 'Full-time',
    description:
      'Support water, sanitation, and hygiene activities in field locations, including assessments and community engagement.',
    applyLink: 'mailto:hr@itepads.org?subject=Application%20for%20Field%20Officer',
  },
  {
    id: 3,
    title: 'Volunteer Communications Assistant',
    location: 'Remote',
    type: 'Volunteer',
    description:
      'Assist with content creation, social media, and outreach campaigns to raise awareness of ITEPADS activities.',
    applyLink: 'mailto:volunteers@itepads.org?subject=Volunteer%20Communications%20Assistant',
  },
];

const Careers: React.FC = () => {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <h1>Careers & Opportunities</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
        Join ITEPADS and help us create sustainable impact in vulnerable communities.
        We welcome passionate, skilled, and dedicated individuals to apply for open
        positions or volunteer opportunities.
      </p>

      <section style={{ marginTop: '2rem' }}>
        <h2>Current Openings</h2>
        {jobOpenings.length === 0 ? (
          <p>No current openings. Please check back later.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {jobOpenings.map(({ id, title, location, type, description, applyLink }) => (
              <li
                key={id}
                style={{
                  border: '1px solid #0077b6',
                  borderRadius: 8,
                  padding: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <h3 style={{ margin: 0, color: '#0077b6' }}>{title}</h3>
                <p style={{ margin: '0.25rem 0', fontStyle: 'italic' }}>
                  {location} — {type}
                </p>
                <p>{description}</p>
                <a
                  href={applyLink}
                  style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    backgroundColor: '#0077b6',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: 4,
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Apply Now
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#555' }}>
        <p>
          Don't see a suitable opening? We welcome speculative applications and
          volunteers. Please send your CV and motivation letter to{' '}
          <a href="mailto:hr@itepads.org" style={{ color: '#0077b6' }}>
            hr@itepads.org
          </a>
          .
        </p>
      </section>
    </main>
  );
};

export default Careers;
