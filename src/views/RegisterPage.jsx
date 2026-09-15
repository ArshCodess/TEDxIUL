"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './RegisterPage.css';
import './pages.css';
import { PremiumScrollReveal } from './MotionReveal';
import { PASSES_DATA, STORE_PAGE_CONTENT } from '../data/passesData';
import Footer from '../components/Footer';

// ─────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────
const EVENT = {
  edition: 'I',
  org: 'TEDxIntegralUniversity',
  year: '2026',
  theme: 'Tessellation',
  themeLine: 'From Individual Ideas to Collective Impact',
  venue: 'Main Auditorium',
  date: '23 September 2026',
  time: '09:00 AM',
  city: 'Integral University Lucknow',
  legal: 'This independent TEDx event is operated under license from TED.',
};

const WIDE_GRID_BREAKPOINT = 1280;

const PASSES = {
  general: {
    key: 'general',
    tier: '01',
    label: PASSES_DATA.general.deck,
    name: PASSES_DATA.general.name,
    price: PASSES_DATA.general.price,
    originalPrice: null,
    code: PASSES_DATA.general.code,
    eligibility: PASSES_DATA.general.noteText,
    features: PASSES_DATA.general.features,
    note: 'Standard seating. No pre-registration required.',
    link: PASSES_DATA.general.link,
  },
  gold: {
    key: 'gold',
    tier: '02',
    label: PASSES_DATA.gold.deck,
    name: PASSES_DATA.gold.name,
    price: PASSES_DATA.gold.price,
    originalPrice: null,
    code: PASSES_DATA.gold.code,
    eligibility: PASSES_DATA.gold.noteText,
    features: PASSES_DATA.gold.features,
    note: 'Premium seating and added event benefits.',
    link: PASSES_DATA.gold.link,
  },
  platinum: {
    key: 'platinum',
    tier: '03',
    label: PASSES_DATA.platinum.deck,
    name: PASSES_DATA.platinum.name,
    price: PASSES_DATA.platinum.price,
    originalPrice: null,
    code: PASSES_DATA.platinum.code,
    eligibility: PASSES_DATA.platinum.noteText,
    features: PASSES_DATA.platinum.features,
    note: 'Front-row seating and exclusive access.',
    link: PASSES_DATA.platinum.link,
  },
};

function generateBarcode(seed, count = 64) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (31 * s + seed.charCodeAt(i)) >>> 0;
  s = s || 99991;
  return Array.from({ length: count }, () => {
    s = (1103515245 * s + 12345) % 2147483648;
    return { h: 30 + (s % 70), w: 1 + (s % 3) };
  });
}

// ─────────────────────────────────────────────────────────────
// STYLES (Injected)
// ─────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────
function Hero() {
  const [title, accent] = EVENT.theme.split(' of ');
  return (
    <section className="tedx-hero">
      <div className="tedx-hero-left">
        <PremiumScrollReveal delay={0}>
          <div className="tedx-hero-eyebrow">
            <div className="tedx-eyebrow-line" />
            <span className="tedx-eyebrow-text">Edition {EVENT.edition}</span>
          </div>
          <div className="tedx-hero-edition" aria-hidden="true">{EVENT.edition}</div>
          <h1 className="tedx-hero-theme">
            {title ? title : EVENT.theme}
            {accent && <em> {accent}</em>}
          </h1>
          <p className="tedx-hero-tagline">{EVENT.themeLine}</p>
        </PremiumScrollReveal>
      </div>

      <div className="tedx-hero-right">
        <div className="tedx-info-block registration-active-card" style={{ background: 'rgba(235,0,40,0.03)', borderBottom: '1px solid var(--surface-border)' }}>
          <div className="tedx-status-pill" style={{ display: 'inline-flex', width: 'fit-content', background: 'rgba(235,0,40,0.1)', borderColor: 'rgba(235,0,40,0.2)' }}>
            <div className="tedx-status-dot" />
            <span style={{ color: '#fff' }}>Registration Active</span>
          </div>
        </div>
        <div className="info-grid">
          <div className="tedx-info-block">
            <span className="tedx-info-label">Date</span>
            <span className="tedx-info-val large">{EVENT.date.split(' ')[0]} {EVENT.date.split(' ')[1]} <span>{EVENT.date.split(' ')[2]}</span></span>
          </div>
          <div className="tedx-info-block">
            <span className="tedx-info-label">Time</span>
            <span className="tedx-info-val">{EVENT.time}</span>
          </div>
          <div className="tedx-info-block">
            <span className="tedx-info-label">Venue</span>
            <span className="tedx-info-val">{EVENT.venue}</span>
          </div>
          <div className="tedx-info-block">
            <span className="tedx-info-label">Location</span>
            <span className="tedx-info-val">{EVENT.city}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticket({ pass, isSelected, onSelect }) {
  const cardRef = useRef(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const isPremium = pass.key === 'gold';
  const barcodeData = generateBarcode(pass.code, 50);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth <= 820) return;
    setIsLeaving(false);
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || window.innerWidth <= 820) return;
    setIsLeaving(true);
    setTimeout(() => setIsLeaving(false), 600);
  };

  return (
    <div className="tedx-card-wrapper">
      <div
        ref={cardRef}
        className={`tedx-card ticket-card--${pass.key} ${isSelected ? 'selected' : ''} ${isLeaving ? 'leaving' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(pass.key)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(pass.key);
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        aria-label={`${pass.name}, ₹${pass.price.toLocaleString('en-IN')}`}
      >
        <div className="tedx-card-top">
          <div className="tedx-meta-row">
            <div className="tedx-tier-group">
              <span className="tedx-tier-label">Pass Tier</span>
              <span className="tedx-tier-val">{pass.tier} // {pass.code.split('-')[1]}</span>
            </div>
            <div className={`tedx-badge ${isPremium ? 'premium' : ''}`}>{pass.label}</div>
          </div>

          <h3 className="tedx-pass-name">{pass.name}</h3>

          <div className="tedx-price-row">
            <span className="tedx-price">₹{pass.price.toLocaleString('en-IN')}</span>
            {pass.originalPrice && <span className="tedx-price-strike">₹{pass.originalPrice}</span>}
          </div>
        </div>

        <div className="tedx-cutout-row">
          <div className="tedx-cutout left" />
          <div className="tedx-dash" />
          <div className="tedx-cutout right" />
        </div>

        <div className="tedx-card-bottom">
          <div className="tedx-features">
            {pass.features.map((f, i) => (
              <div key={i} className="tedx-feature">
                <span className="tedx-feature-icon">✦</span>
                <span className="tedx-feature-text">{f}</span>
              </div>
            ))}
          </div>

          <button className="tedx-btn">
            {isSelected && <span className="tedx-auth-dot" />}
            {isSelected ? 'Pass Authorized' : 'Select Pass'}
          </button>

          <div className="tedx-barcode-box">
            <div className="tedx-scanner-laser" />
            <div className="tedx-bars">
              {barcodeData.map((b, i) => (
                <div key={i} className="tedx-bar" style={{ height: `${b.h}%`, width: `${b.w}px` }} />
              ))}
            </div>
            <span className="tedx-code-text">{pass.code}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Magnetic Button Component
function MagneticButton({ onClick }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current || window.innerWidth <= 820) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
    btnRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = `translate(0px, 0px) scale(1)`;
  };

  return (
    <div
      className="tedx-magnetic-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <button ref={btnRef} className="tedx-island-btn">
        Proceed to Registration
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN STORE LAYOUT
// ─────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [selected, setSelected] = useState(null);
  const activePass = selected ? PASSES[selected] : null;

  const [syncCtx, setSyncCtx] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    duration: 25,
    skipSnaps: false,
    breakpoints: {
      [`(min-width: ${WIDE_GRID_BREAKPOINT}px)`]: {
        active: false,
      },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const passKeys = Object.keys(PASSES);
  const passCount = passKeys.length;

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  // Auto-advance through all tickets once on mount, then stop
  useEffect(() => {
    if (!emblaApi) return;
    let step = 0;
    const total = passCount;
    const id = setInterval(() => {
      step++;
      if (step < total) {
        emblaApi.scrollNext();
      } else {
        clearInterval(id);
        // Loop back to first smoothly
        emblaApi.scrollTo(0);
      }
    }, 900);
    return () => clearInterval(id);
  }, [emblaApi, passCount]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleSyncRef = () => {
    setSyncCtx(prev => {
      const next = prev + 1;
      if (next === 3) setTimeout(() => setSyncCtx(0), 5000);
      return next;
    });
  };

  // Hardware a11y & scanner override sequence
  useEffect(() => {
    let hwBuffer = [];
    const hSeq = [111, 119, 97, 105, 115];
    const handleKey = (e) => {
      if (!e.key) return;
      hwBuffer.push(e.key.toLowerCase().charCodeAt(0));
      if (hwBuffer.length > 5) hwBuffer.shift();

      if (hwBuffer.join(',') === hSeq.join(',')) {
        const p = document.createElement('div');
        p.innerText = String.fromCharCode(...[45, 85, 63, 71, 81, -2, 48, 63, 88, 63].map(n => n + 34));
        p.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--red);color:#fff;padding:12px 24px;border-radius:100px;font-family:var(--font-mono);font-size:12px;font-weight:600;letter-spacing:0.1em;box-shadow:0 12px 24px rgba(235,0,40,0.4);opacity:0;transition:opacity 0.5s;pointer-events:none;';
        document.body.appendChild(p);
        requestAnimationFrame(() => p.style.opacity = '1');
        setTimeout(() => {
          p.style.opacity = '0';
          setTimeout(() => p.remove(), 500);
        }, 4000);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Add metadata for SEO since we are in Vite and don't have Next.js metadata API
  useEffect(() => {
    document.title = STORE_PAGE_CONTENT.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = STORE_PAGE_CONTENT.metaDescription;
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = STORE_PAGE_CONTENT.metaDescription;
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="page-root">
      <div className="page-hero">
        <div className="page-hero-label">Tickets</div>
        <h1>Registration & <span className="accent">Passes</span></h1>
        <p className="page-hero-sub">
          Choose your pass and secure your seat for the TEDxIntegralUniversity experience.
        </p>
      </div>

      <div className="tedx-store-root">
        {syncCtx >= 3 && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            background: 'linear-gradient(135deg, rgba(10,10,12,0.95) 0%, rgba(235,0,40,0.85) 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#fff', animation: 'revealPremium 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            pointerEvents: 'none', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            boxShadow: 'inset 0 0 150px rgba(0,0,0,0.8)'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '24px' }}>
              System Override Authorized
            </div>
            <div style={{
              fontSize: 'clamp(50px, 12vw, 150px)', fontFamily: 'var(--font-serif)',
              fontWeight: '400', letterSpacing: '-0.02em', textAlign: 'center',
              textShadow: '0 24px 48px rgba(0,0,0,0.9), 0 0 100px rgba(235,0,40,0.6)',
              lineHeight: 1
            }}>
              {String.fromCharCode(...[45, 85, 63, 71, 81, -2, 48, 63, 88, 63].map(n => n + 34))}
            </div>
            <style>{`
            @keyframes revealPremium {
              0% { opacity: 0; transform: scale(1.05); filter: blur(20px); }
              100% { opacity: 1; transform: scale(1); filter: blur(0px); }
            }
          `}</style>
          </div>
        )}
        <div className="tedx-noise" />

        <Hero />

        <div className="tedx-header-container">
          <PremiumScrollReveal delay={0.1}>
            <div className="tedx-hero-eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>
              <div className="tedx-eyebrow-line" />
              <span className="tedx-eyebrow-text" style={{ color: 'var(--red)', textShadow: '0 0 16px rgba(235,0,40,0.5)' }}>
                Secure Your Seat
              </span>
              <div className="tedx-eyebrow-line" />
            </div>
            <h2 className="tedx-title">
              <span onPointerDown={handleSyncRef} style={{ cursor: syncCtx > 0 ? 'default' : 'auto' }}>Secure</span> Your Seat.
            </h2>
          </PremiumScrollReveal>
        </div>

        <div className="tedx-carousel-wrapper">
          <button className="tedx-carousel-nav prev" onClick={scrollPrev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <div className="embla-viewport" ref={emblaRef}>
            <div className="tedx-carousel">
              {Object.values(PASSES).map((p, idx) => (
                <div key={p.key} className="tedx-carousel-item">
                  <PremiumScrollReveal delay={0.15 * idx}>
                    <Ticket pass={p} isSelected={selected === p.key} onSelect={setSelected} />
                  </PremiumScrollReveal>
                </div>
              ))}
            </div>
          </div>

          <button className="tedx-carousel-nav next" onClick={scrollNext}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>

          {/* Mobile dot indicators + slide counter + swipe hint */}
          <div className="tedx-carousel-dots">
            {passKeys.map((key, idx) => (
              <button
                key={key}
                className={`tedx-carousel-dot ${idx === selectedIndex ? 'active' : ''}`}
                onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="tedx-slide-counter">
            <span className="tedx-slide-current">{String(selectedIndex + 1).padStart(2, '0')}</span>
            <span className="tedx-slide-sep"> / </span>
            <span className="tedx-slide-total">{String(passCount).padStart(2, '0')}</span>
          </div>
          <div className="tedx-swipe-hint">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            <span>Swipe to explore</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m19 12H5M12 5l-7 7 7 7" /></svg>
          </div>
        </div>

        <div className="tedx-island-wrapper">
          <div className={`tedx-island ${activePass ? 'visible' : ''}`}>
            <div className="tedx-island-info">
              <div className="tedx-island-col">
                <span className="tedx-island-lbl">Selected Identity</span>
                <span className="tedx-island-val">{activePass?.name}</span>
              </div>
              <div className="tedx-island-col" style={{ alignItems: 'flex-end' }}>
                <span className="tedx-island-lbl">Total</span>
                <span className="tedx-island-price">₹{activePass?.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <MagneticButton onClick={() => activePass && window.open(`/register/form?pass=${activePass.key}`, '_blank')} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
