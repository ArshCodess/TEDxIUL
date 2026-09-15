"use client";
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import Tickets from '../components/Tickets';
import About from '../components/About';
import AboutTed from '../components/AboutTed';
import Theme from '../components/Theme';
import Schedule from '../components/Schedule';
import SpeakerCardHome from '../components/SpeakerCardHome';
import Sponsors from '../components/Sponsors';
import FAQ from '../components/FAQ';
import Venue from '../components/Venue';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { SPEAKERS } from '../data/speakersData';
import { PremiumScrollReveal } from './MotionReveal';

export default function HomePage() {
  const [particles, setParticles] = useState([]);

  // Generate random particles only on the client after mount to prevent hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${12 + Math.random() * 18}s`,
        delay: `${Math.random() * 15}s`,
        size: `${1.5 + Math.random() * 2.5}px`,
      }))
    );
  }, []);

  return (
    <div className="homepage-wrapper">
      {/* Fixed full-page background — website bg.png covers all sections below hero */}
      <div className="page-bg-layer" />

      {/* Atmospheric glow */}
      <div className="page-bg-glow" />

      {/* Floating particles */}
      <div className="page-bg-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Subtle vignette for depth */}
      <div className="page-bg-vignette" />

      {/* Page content */}
      <Hero />
      <PremiumScrollReveal variant="slideUp" delay={0.1}><Countdown /></PremiumScrollReveal>
      <PremiumScrollReveal variant="slideUp" delay={0.1}><Tickets /></PremiumScrollReveal>
      <PremiumScrollReveal variant="slideUp" delay={0.1}><About /></PremiumScrollReveal>
      <PremiumScrollReveal variant="slideUp">
        <section className="video-section">
          <div className="video-section-inner">
            <p className="section-label">Watch</p>
            {/*<h2 className="section-title fade-in">THE <span className="accent">EXPERIENCE</span></h2>*/}
            <div className="video-embed-wrap">
              <iframe
                src="https://www.youtube.com/embed/DQBNjVmLHKU"
                title="TEDxIntegralUniversity — Experience the Event"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </PremiumScrollReveal>
      
      <PremiumScrollReveal variant="slideUp"><AboutTed /></PremiumScrollReveal>
      <PremiumScrollReveal variant="slideUp"><Theme /></PremiumScrollReveal>
      <PremiumScrollReveal variant="slideUp"><Schedule /></PremiumScrollReveal>
      
      <PremiumScrollReveal variant="slideUp">
        <section id="speakers">
          <p className="section-label">The Voices</p>
          <h2 className="section-title">OUR <span className="accent">SPEAKERS</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px' }}>
            Meet the incredible thinkers who will share their stories at TEDxIntegralUniversity 2026.
          </p>
          <SpeakerCardHome speakers={SPEAKERS} />
        </section>
      </PremiumScrollReveal>
      
      <PremiumScrollReveal variant="slideUp"><Sponsors /></PremiumScrollReveal>
      <PremiumScrollReveal variant="slideUp"><FAQ /></PremiumScrollReveal>
      <PremiumScrollReveal variant="slideUp"><Venue /></PremiumScrollReveal>
      <PremiumScrollReveal variant="slideUp"><Contact /></PremiumScrollReveal>
      <Footer />
    </div>
  );
}
