"use client";
import { useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import Tickets from '../components/Tickets';
import About from '../components/About';
import AboutTed from '../components/AboutTed';
import Theme from '../components/Theme';
import Schedule from '../components/Schedule';
import Speakers from '../components/Speakers';
import Sponsors from '../components/Sponsors';
import FAQ from '../components/FAQ';
import Venue from '../components/Venue';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

import split1 from '../../assets/images/Split 1.png';
import split2 from '../../assets/images/Split 2.png';
import split3 from '../../assets/images/Split 3.png';
import split4 from '../../assets/images/Split 4.png';

const splitImages = [split1, split2, split3, split4];
const BACKGROUND_OPACITY_SCALE = 0.55;

export default function HomePage() {
  const bgRefs = useRef([]);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // scrollProgress: 0 at top, 1 at bottom of page
      const scrollProgress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      const totalImages = splitImages.length;
      const segmentProgress = scrollProgress * (totalImages - 1);
      const currentIndex = Math.min(Math.floor(segmentProgress), totalImages - 1);
      const nextIndex = Math.min(currentIndex + 1, totalImages - 1);
      const blend = segmentProgress - currentIndex;

      bgRefs.current.forEach((bg, index) => {
        if (!bg) return;

        let opacity = 0;

        if (index === currentIndex) {
          opacity = 1 - blend;
        } else if (index === nextIndex) {
          opacity = blend;
        }

        if (scrollProgress <= 0) {
          opacity = index === 0 ? 1 : 0;
        } else if (scrollProgress >= 1) {
          opacity = index === totalImages - 1 ? 1 : 0;
        }

        bg.style.opacity = (opacity * BACKGROUND_OPACITY_SCALE).toFixed(3);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage-wrapper">
      {/* Fixed full-page background layers with Ken Burns animation */}
      {splitImages.map((src, index) => (
        <div
          key={index}
          ref={(el) => (bgRefs.current[index] = el)}
          className="page-bg-layer"
          style={{
            backgroundImage: `url("${src?.src || src}")`,
            opacity: index === 0 ? BACKGROUND_OPACITY_SCALE : 0,
          }}
        />
      ))}

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
      <Countdown />
      <Tickets />
      <About />
      <AboutTed />
      <Theme />
      <Schedule />
      <Speakers />
      <Sponsors />
      <FAQ />
      <Venue />
      <Contact />
      <Footer />
    </div>
  );
}
