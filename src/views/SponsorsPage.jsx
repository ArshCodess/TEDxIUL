import Link from 'next/link';
import Footer from '../components/Footer';
import iulLogo from '../assets/IU_LOGO.png';
import infinixLogo from '../assets/sponsors/infinix.png';
import barkatDarbaarLogo from '../assets/sponsors/barkat-darbaar.jpeg';
import kareemKababiLogo from '../assets/sponsors/kareem-kababi.jpeg';
import makSportsLogo from '../assets/sponsors/MAK-sports.jpeg';
import fcphLogo from '../assets/sponsors/FCPH.jpeg';
import './pages.css';

const SPONSORS = [
  {
    id: 'iul',
    name: 'Integral University',
    logo: iulLogo,
    tier: 'Host & Presenting Partner',
    desc: 'Empowering future leaders through academic excellence, research, and holistic development at a 120-acre campus in Lucknow.',
  },
  {
    id: 'infinix',
    name: 'Infinix Mobile',
    logo: infinixLogo,
    tier: 'Official Technology Partner',
    desc: 'Empowering youth with cutting-edge mobile technology and smart devices.',
  },
  {
    id: 'barkat-darbaar',
    name: 'Barkat Darbaar',
    logo: barkatDarbaarLogo,
    tier: 'Official Partner',
    desc: 'Promoting cultural heritage, community unity, and fine hospitality.',
  },
  {
    id: 'kareem-kababi',
    name: 'Kareem Kababi',
    logo: kareemKababiLogo,
    tier: 'Official Culinary Partner',
    desc: 'Delivering legendary Awadhi flavors and authentic culinary excellence.',
  },
  {
    id: 'mak-sports',
    name: 'MAK Sports',
    logo: makSportsLogo,
    tier: 'Official Sports Partner',
    desc: 'Fostering athletic spirit and top-tier sporting excellence.',
  },
  {
    id: 'fc-production-house',
    name: 'F C Production House',
    logo: fcphLogo,
    tier: 'Official Media Partner',
    desc: 'Capturing moments, storytelling, and media production excellence.',
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
              className="sponsor-card"
            >
              <div className="sponsor-card-logo-frame">
                <img
                  src={sponsor.logo.src || sponsor.logo}
                  alt={sponsor.name}
                  className="sponsor-card-logo-img"
                />
              </div>
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
