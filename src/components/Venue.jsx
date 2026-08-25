"use client";
// Inspired by Owais Raza (@oraza7867)
import React, { useEffect, useRef, useState } from 'react';
import './Venue.css';
import universityLogo from '../assets/iul-A.png';

// SVG icons — inline so zero deps
const IconPin = () => (
  <svg className="venue-meta-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <circle cx="8" cy="6.5" r="2.5" />
    <path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5z" strokeLinejoin="round" />
  </svg>
);

const IconCal = () => (
  <svg className="venue-meta-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <rect x="2" y="3" width="12" height="11" rx="1.5" />
    <path d="M2 7h12M5 1v4M11 1v4" />
  </svg>
);

const IconClock = () => (
  <svg className="venue-meta-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3.5l2.5 1.5" />
  </svg>
);

const VENUE_DATA = {
  title: 'Integral University, Lucknow',
  subtitle: 'CONFERENCE VENUE',
  city: 'Lucknow',
  region: 'Uttar Pradesh',
  description: 'Integral University, Lucknow, is a premier educational institution committed to academic excellence, research, innovation, and holistic development. With a vibrant and diverse student community, the university provides an environment that nurtures creativity, critical thinking, leadership, and entrepreneurship. Through its dedication to quality education and societal impact, Integral University continues to empower future leaders who are prepared to address global challenges and contribute meaningfully to society.',
  location: 'Dasauli, Kursi Road, Lucknow – 226026',
  date: 'September 26, 2026',
  time: '9:00 AM onwards',
  capacity: '500+ Attendees',
  campus: '120 Acres',
  coordinates: '26.9582° N, 80.9963° E',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.276235799362!2d80.99633883965782!3d26.958150276717447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bff2addd9b239%3A0xc21a9bbd557936ec!2sIntegral%20University!5e0!3m2!1sen!2sin!4v1781526188618!5m2!1sen!2sin',
  mapLink: 'https://maps.app.goo.gl/NDekpBqJdoPY6Dq7A'
};

function Map({ venue }) {
  return (
    <div className="venue-map-container">
      <iframe
        src={venue.mapEmbedUrl}
        allowFullScreen=""
        loading="lazy"
        title="Venue location"
      />
      <div className="venue-map-overlay" />
      <div className="venue-map-corner" />
      <div className="venue-map-footer">
        <span className="venue-map-pill">{venue.title}</span>
        {venue.coordinates && (
          <span className="venue-map-coords">{venue.coordinates}</span>
        )}
      </div>
    </div>
  );
}

function Panel({ venue }) {
  const metaRows = [
    { key: 'Address', icon: <IconPin />, value: venue.location },
    { key: 'Date', icon: <IconCal />, value: venue.date },
    { key: 'Time', icon: <IconClock />, value: venue.time },
  ];

  return (
    <div className="venue-panel">
      <div className="venue-panel-top">
        <p className="venue-panel-tag">{venue.subtitle}</p>
        <h2 className="venue-panel-title">
          <img src={universityLogo.src || universityLogo} alt="Integral University Logo" className="venue-panel-logo" />
          <span className="venue-panel-title-text">
          </span>
        </h2>
        <p className="venue-panel-sub">{venue.city}{venue.region ? `, ${venue.region}` : ''}</p>
      </div>

      <p className="venue-panel-desc">{venue.description}</p>

      {(venue.capacity || venue.campus) && (
        <div className="venue-stats">
          {venue.capacity && (
            <div className="venue-stat">
              <p className="venue-stat-label">Capacity</p>
              <p className="venue-stat-value">{venue.capacity}</p>
            </div>
          )}
          {venue.campus && (
            <div className="venue-stat">
              <p className="venue-stat-label">Campus</p>
              <p className="venue-stat-value">{venue.campus}</p>
            </div>
          )}
        </div>
      )}

      <div className="venue-meta">
        {metaRows.map(({ key, icon, value }) => value && (
          <div key={key} className="venue-meta-row">
            <div className="venue-meta-left">
              {icon}
              <span className="venue-meta-key">{key}</span>
            </div>
            <span className="venue-meta-val">{value}</span>
          </div>
        ))}
      </div>

      <div className="venue-cta-wrap">
        <a
          href={venue.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="venue-cta"
        >
          <div className="venue-cta-left">
            <div className="venue-cta-dot" />
            <span>Open in Maps</span>
          </div>
          <span className="venue-cta-arrow">→</span>
        </a>
      </div>
    </div>
  );
}

export default function Venue() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="venue" ref={sectionRef}>
      <div className="venue-wrap">
        <div className={`venue-eyebrow ${isVisible ? 'is-visible' : ''}`}>
          <span className="venue-eyebrow-dot" />
          <span className="venue-eyebrow-text">Venue &amp; Location</span>
          <span className="venue-eyebrow-rule" />
        </div>

        <div className={`venue-split ${isVisible ? 'is-visible' : ''}`}>
          <Map venue={VENUE_DATA} />
          <Panel venue={VENUE_DATA} />
        </div>
      </div>
    </section>
  );
}
