import './Hero.css';
import tedxHeroLogo from '../assets/tedx-logo-clean.svg';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero">
      <canvas id="heroCanvas"></canvas>
      <div className="hero-content">
        <div className="hero-logo-row">
          <Image unoptimized width={1200} height={800} src={tedxHeroLogo} alt="TEDxIntegralUniversity" className="hero-logo-img" />
        </div>
        <p className="hl-tagline">x = independently organized TED event</p>
        <h1 className="hero-title">TESSELLATION</h1>
        <p className="hero-sub">From Individual Ideas to Collective Impact</p>
        <p className="hero-date">September, 2026</p>
        <div className="hero-line"></div>
        <p className="hero-desc">
          Where individual pieces come together to form something greater. Join us as we explore how
          connected ideas, people, and perspectives create collective transformation.
        </p>
        <div className="hero-ctas">
          <a href="#contact" className="btn-primary">Get Your Ticket</a>
          <a href="#about" className="btn-secondary">Read More</a>
          <a href="#about" className="btn-outline">Explore Theme</a>
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