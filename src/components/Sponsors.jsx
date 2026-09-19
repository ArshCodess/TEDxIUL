import './Sponsors.css';
import iulLogo from '../assets/IU_LOGO.png';
import infinixLogo from '../assets/sponsors/infinix.png';
import barkatDarbaarLogo from '../assets/sponsors/barkat-darbaar.jpeg';
import kareemKababiLogo from '../assets/sponsors/kareem-kababi.jpeg';
import makSportsLogo from '../assets/sponsors/MAK-sports.jpeg';
import fcphLogo from '../assets/sponsors/FCPH.jpeg';

const SPONSORS_DATA = [
  {
    id: 'iul',
    name: 'Integral University',
    tier: 'Host & Presenting Partner',
    logo: iulLogo,
  },
  {
    id: 'infinix',
    name: 'Infinix Mobile',
    tier: 'Technology Partner',
    logo: infinixLogo,
  },
  {
    id: 'barkat-darbaar',
    name: 'Barkat Darbaar',
    tier: 'Official Partner',
    logo: barkatDarbaarLogo,
  },
  {
    id: 'kareem-kababi',
    name: 'Kareem Kababi',
    tier: 'Culinary Partner',
    logo: kareemKababiLogo,
  },
  {
    id: 'mak-sports',
    name: 'MAK Sports',
    tier: 'Sports Partner',
    logo: makSportsLogo,
  },
  {
    id: 'fc-production-house',
    name: 'F C Production House',
    tier: 'Media Partner',
    logo: fcphLogo,
  },
];

export default function Sponsors() {
  return (
    <section id="sponsors">
      <p className="section-label fade-in">Our Partners</p>
      <h2 className="section-title fade-in">OUR <span className="accent">SPONSORS</span></h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px' }} className="fade-in">
        Empowering innovation, ideas, and community. Be part of this movement.
      </p>

      <div className="sponsors-grid fade-in">
        {SPONSORS_DATA.map((sp) => (
          <div key={sp.id} className="sp-card">
            <div className="sp-logo-frame">
              <img
                src={sp.logo.src || sp.logo}
                alt={sp.name}
                className="sp-logo-img"
              />
            </div>
            <div className="sp-info">
              <span className="sp-tier">{sp.tier}</span>
              <span className="sp-name">{sp.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}