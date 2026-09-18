'use client';
import Link from 'next/link';
import sponsorsData from '../data/sponsorsData';
import './Sponsors.css';

export default function Sponsors() {
  return (
    <section id="sponsors">
      <p className="section-label fade-in">Our Partners</p>
      <h2 className="section-title fade-in">
        OUR <span className="accent">SPONSORS</span>
      </h2>

      <div className="sp-logo-grid">
        {sponsorsData.map((sponsor) => (
          <Link
            key={sponsor.id}
            href="/sponsors"
            className="sp-logo-card"
            aria-label={`View ${sponsor.name} on sponsors page`}
          >
            <img
              src={sponsor.logo.src || sponsor.logo}
              alt={sponsor.name}
              className="sp-logo-img"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}