import Link from 'next/link';
import Footer from '../components/Footer';
import iulLogo from '../assets/IU_LOGO.png';
import infinixLogo from '../assets/sponsors/infinix.png';
import barkatDarbaarLogo from '../assets/sponsors/barkat-darbaar.jpeg';
import kareemKababiLogo from '../assets/sponsors/kareem-kababi.jpeg';
import makSportsLogo from '../assets/sponsors/MAK-sports.jpeg';
import fcphLogo from '../assets/sponsors/FCPH.jpeg';
import shujaPerfumeLogo from '../assets/sponsors/Shuja-perfume.jpeg';
import cocaColaLogo from '../assets/sponsors/Coca-cola.png';
import './pages.css';
const SPONSORS = [
  {
    id: 'iul',
    name: 'Integral University',
    logo: iulLogo,
    tier: 'Host & Presenting Partner',
    desc: 'A vibrant academic institution fostering learning, innovation, research, and holistic development.',
  },
  {
    id: 'infinix',
    name: 'Infinix Mobile',
    logo: infinixLogo,
    tier: 'Official Technology Partner',
    desc: 'Bringing innovation and technology closer to a new generation of young, connected minds.',
  },
  {
    id: 'barkat-darbaar',
    name: 'Barkat Darbaar',
    logo: barkatDarbaarLogo,
    tier: 'Official Partner',
    desc: 'Adding a distinctive touch of hospitality and culinary experience to the TEDxIntegralUniversity journey.',
  },
  {
    id: 'kareem-kababi',
    name: 'Kareem Kababi',
    logo: kareemKababiLogo,
    tier: 'Official Culinary Partner',
    desc: 'Bringing a memorable culinary experience and delicious flavours to the TEDxIntegralUniversity community.',
  },
  {
    id: 'mak-sports',
   name: 'MAK Sports Arena',
    logo: makSportsLogo,
    tier: 'Official Sports Partner',
    desc: 'Celebrating the spirit of sports, energy, teamwork, and an active community.',
  },
  {
    id: 'fc-production-house',
    name: 'F C Production House',
    logo: fcphLogo,
    tier: 'Official Media Partner',
    desc: 'Helping capture and bring the moments, stories, and experiences of TEDxIntegralUniversity to life.',
  },
  {
    id: 'shuja-perfume',
    name: 'Shuja Perfume',
    logo: shujaPerfumeLogo,
    tier: 'Gifting Partner',
    desc: 'Adding a touch of elegance and fragrance to the TEDxIntegralUniversity experience.',
},
{
    id: 'coca-cola',
    name: 'Coca-Cola',
    logo: cocaColaLogo,
    tier: 'Beverage Partner',
    desc: 'Refreshing the TEDxIntegralUniversity experience with moments of refreshment and togetherness.',
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
