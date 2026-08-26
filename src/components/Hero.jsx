import './Hero.css';
import Image from 'next/image';
import logoWhite from '../../assets/images/logo-white.png';
import iulLogo  from '../../assets/images/iul.png';

export default function Hero() {
  const word = 'TESSELLATION';
  return (
    <section id="hero">
      {/* Background image with Ken Burns animation */}
      <div className="hero-bg-img" aria-hidden="true"></div>
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="hero-content">
        <div className="hero-logo-row">
          <Image unoptimized width={320} height={80} src={logoWhite} alt="TEDx Integral University" className="hero-logo-tedx" />
          <span className="hero-logo-divider" aria-hidden="true"></span>
          <Image unoptimized width={120} height={80} src={iulLogo}   alt="Integral University Lucknow" className="hero-logo-iul" />
        </div>
        <p className="hl-tagline">x = independently organized TED event</p>
        {/* TEDx-style theme block */}
        <div className="tessellation-block">
          <span className="theme-eyebrow">THEME</span>
          <h1 className="hero-title" aria-label="Tessellation">
            {word.split('').map((letter, i) => (
              <span
                key={i}
                className="hero-title-letter"
                style={{ '--i': i }}
                aria-hidden="true"
              >
                {letter}
              </span>
            ))}
          </h1>
          <div className="theme-title-bar" aria-hidden="true"></div>
        </div>
        <p className="hero-sub">From Individual Ideas to Collective Impact</p>
        <p className="hero-date">September, 2026</p>
        <div className="hero-line"></div>
        <p className="hero-desc">
          Where individual pieces come together to form something greater. Join us as we explore how
          connected ideas, people, and perspectives create collective transformation.
        </p>
        <div className="hero-ctas">
            <a href="/register" className="btn-hero">Get Your Ticket</a>
            <a href="#about" className="btn-hero">Read More</a>
            <a href="#about" className="btn-hero">Explore Theme</a>
          </div>
      </div>
      <div className="scroll-hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        Scroll
      </div>
    </section>
  );
}