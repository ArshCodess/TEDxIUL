import './Sponsors.css';
import iulLogo from '../assets/IU_LOGO.png';
import infinixLogo from '../assets/sponsors/infinix.png';
import tabreekLogo from '../assets/sponsors/Tabreek.PNG';
import kareemKababiLogo from '../assets/sponsors/kareem-kababi.jpeg';
import makSportsLogo from '../assets/sponsors/MAK-sports.jpeg';
import fcphLogo from '../assets/sponsors/FCPH.jpeg';
import shujaPerfumeLogo from '../assets/sponsors/Shuja-Perfume.jpeg';
import cocaColaLogo from '../assets/sponsors/Coca-cola.png';

const SPONSORS_DATA = [
  {
    id: 'iul',
    name: 'Integral University',
    logo: iulLogo,
    tier: 'Host & Presenting Partner',
  },
  {
    id: 'kareem-kababi',
    name: 'Kareem Kababi',
    logo: kareemKababiLogo,
    tier: 'Food Partner',
  },
  {
    id: 'tabreek',
    name: 'Events by Tabreek',
    logo: tabreekLogo,
    tier: 'Decor Partner',
  },
  {
    id: 'fc-production-house',
    name: 'FC Production House',
    logo: fcphLogo,
    tier: 'Media Partner',
  },
  {
    id: 'mak-sports',
    name: 'MAK Sports Arena',
    logo: makSportsLogo,
    tier: 'Sports Partner',
  },
  {
    id: 'shuja-perfume',
    name: 'Shuja Perfume',
    logo: shujaPerfumeLogo,
    tier: 'Gifting Partner',
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    logo: cocaColaLogo,
    tier: 'Beverage Partner',
  },
  {
    id: 'infinix',
    name: 'Infinix Mobile',
    logo: infinixLogo,
    tier: 'Entertainment Partner',
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