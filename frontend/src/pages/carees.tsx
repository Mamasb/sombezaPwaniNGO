import React from 'react';
import '../styles/careers.css';

const Careers: React.FC = () => {
  const opportunities = [
    {
      title: 'Field Officer - Gedo Region',
      type: 'Full Time',
      location: 'Gedo, Somalia',
      description:
        'Work closely with communities to implement and monitor projects. Requires strong communication and field work skills.',
    },
    {
      title: 'Volunteer - Community Mobilizer',
      type: 'Volunteer',
      location: 'Remote / Field',
      description:
        'Assist with outreach activities, event coordination, and awareness campaigns.',
    },
    {
      title: 'Intern - Monitoring & Evaluation',
      type: 'Internship',
      location: 'Nairobi, Kenya',
      description:
        'Support our M&E team in collecting, analyzing, and reporting project data.',
    },
  ];

  return (
    <div className="careers-page">
      <header className="careers-header">
        <h1>Careers & Opportunities</h1>
        <p>
          Join our mission to create lasting impact. Whether you’re looking for a full-time role,
          internship, or volunteer position, your skills can make a difference.
        </p>
      </header>

      <section className="opportunities-section">
        {opportunities.map((job, index) => (
          <div key={index} className="opportunity-card">
            <h2>{job.title}</h2>
            <p className="job-meta">
              <span>{job.type}</span> | <span>{job.location}</span>
            </p>
            <p>{job.description}</p>
            <button className="apply-btn">Apply Now</button>
          </div>
        ))}
      </section>

      <section className="cta-section">
