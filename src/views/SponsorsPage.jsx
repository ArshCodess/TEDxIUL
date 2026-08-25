import Link from 'next/link';
import Footer from '../components/Footer';
import universityLogo from '../assets/IUL.jpg';
import './pages.css';

const SPONSORS = [
  {
    id: 'iul',
    name: 'Integral University',
    logo: universityLogo,
    tier: 'Title Sponsor',
    desc: 'Empowering future leaders through academic excellence, research, and holistic development at a 120-acre campus in Lucknow.',
    featured: true,
  },
  {
    id: 'tba-1',
    name: 'Sponsor TBA',
    logo: null,
    tier: 'Gold Sponsor',
    desc: 'Sponsorship opportunities are open. Be part of this movement and help bring inspiring ideas to life.',
    featured: false,
  },
  {
    id: 'tba-2',
    name: 'Sponsor TBA',
    logo: null,
    tier: 'Silver Sponsor',
    desc: 'Join us as a sponsor and connect your brand with thousands of passionate thinkers and change-makers.',
    featured: false,
  },
  {
    id: 'tba-3',
    name: 'Sponsor TBA',
    logo: null,
    tier: 'Community Partner',
    desc: 'Community partnerships help us extend the reach of ideas worth spreading beyond the event itself.',
    featured: false,
  },
];

export default function SponsorsPage() {
  return (
    <div className="page-root">
      <div className="page-hero">
        <div className="page-hero-label">Partners</div>
        <h1>Our <span className="accent">Sponsors</span></h1>
        <p className="page-hero-sub">
          The organizations that make TEDxIntegralUniversity possible — join us and be part of this movement.
        </p>
      </div>

      <div className="page-wrap">
        <Link href="/" className="page-back-link">Home</Link>

        <div className="sponsors-page-grid">
          {SPONSORS.map((sponsor) => (
            <div
              key={sponsor.id}
              className={`sponsor-card${sponsor.featured ? ' featured' : ''}`}
            >
              {sponsor.logo ? (
                <img src={sponsor.logo.src || sponsor.logo} alt={sponsor.name} className="sponsor-card-logo" />
              ) : (
                <div className="sponsor-card-logo-placeholder">Logo</div>
              )}
              <div className="sponsor-card-tier">{sponsor.tier}</div>
              <div className="sponsor-card-name">{sponsor.name}</div>
              <div className="sponsor-card-desc">{sponsor.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
            Interested in sponsoring TEDxIntegralUniversity 2026?
          </p>
          <a href="mailto:tedxiul@gmail.com" className="btn-primary">
            Get in Touch
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
