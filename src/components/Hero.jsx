"use client";
import './Hero.css';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import logoWhite from '../../assets/images/logo-white.png';
import iulLogo  from '../../assets/images/iul.png';

// Preloader takes ~6.0s to finish, plus fade out. We start our entrance at 6.2s.
const PRELOADER_DELAY = 6.2;
const PREMIUM_EASING = [0.16, 1, 0.3, 1];

export default function Hero() {
  const word = 'TESSELLATION';
  const heroRef = useRef(null);

  // Determine if preloader is still active on first mount
  const [isMounted, setIsMounted] = useState(false);
  const [currentDelay, setCurrentDelay] = useState(0.2);

  useEffect(() => {
    const isPreloaderActive = document.body.classList.contains('loading-preloader');
    setCurrentDelay(isPreloaderActive ? PRELOADER_DELAY : 0.2);
    setIsMounted(true);
  }, []);

  // ------- Cursor Spotlight -------
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const handleMouse = (e) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroEl.style.setProperty('--cursor-x', `${x}px`);
      heroEl.style.setProperty('--cursor-y', `${y}px`);
    };
    heroEl.addEventListener('mousemove', handleMouse);
    return () => heroEl.removeEventListener('mousemove', handleMouse);
  }, []);

  // ------- Scroll Parallax -------
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 400], [0, -80]); // background moves slower
  const contentY = useTransform(scrollY, [0, 400], [0, 30]); // content moves slightly faster

  if (!isMounted) {
    return (
      <section id="hero" ref={heroRef}>
        <motion.div className="hero-bg-img" aria-hidden="true" style={{ y: bgY }}></motion.div>
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="cursor-spotlight" aria-hidden="true"></div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: currentDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: PREMIUM_EASING },
    },
  };

  const titleContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: currentDelay + 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -60, scaleY: 1.5 },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        mass: 0.8,
      },
    },
  };

  const barVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1, ease: PREMIUM_EASING, delay: currentDelay + 1.2 },
    },
  };

  return (
    <section id="hero" ref={heroRef}>
      {/* Background image with Parallax */}
      <motion.div className="hero-bg-img" aria-hidden="true" style={{ y: bgY }}></motion.div>
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="cursor-spotlight" aria-hidden="true"></div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: contentY }}
      >
        <motion.div className="hero-logo-row" variants={itemVariants}>
          <Image unoptimized width={320} height={80} src={logoWhite} alt="TEDx Integral University" className="hero-logo-tedx" />
          <span className="hero-logo-divider" aria-hidden="true"></span>
          <Image unoptimized width={120} height={80} src={iulLogo} alt="Integral University Lucknow" className="hero-logo-iul" />
        </motion.div>

        <motion.p className="hl-tagline" variants={itemVariants}>
          x = independently organized TED event
        </motion.p>

        <motion.div className="tessellation-block" variants={itemVariants}>
          <span className="theme-eyebrow">THEME</span>
          <motion.h1
            className="hero-title"
            aria-label="Tessellation"
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {word.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="hero-title-letter"
                style={{ '--i': i }}
                aria-hidden="true"
                variants={letterVariants}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div className="theme-title-bar" aria-hidden="true" variants={barVariants} initial="hidden" animate="visible"></motion.div>
        </motion.div>

        <motion.p className="hero-sub" variants={itemVariants}>
          From Individual Ideas to Collective Impact
        </motion.p>

        <motion.p className="hero-date" variants={itemVariants}>
          September, 2026
        </motion.p>

        <motion.div className="hero-line" variants={itemVariants}></motion.div>

        <motion.p className="hero-desc" variants={itemVariants}>
          Where individual pieces come together to form something greater. Join us as we explore how
          connected ideas, people, and perspectives create collective transformation.
        </motion.p>

        <motion.div className="hero-ctas" variants={itemVariants}>
          <a href="/register" className="btn-hero">Get Your Ticket</a>
          <a href="#about" className="btn-hero">Read More</a>
          <a href="#about" className="btn-hero">Explore Theme</a>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: currentDelay + 2, duration: 1.5, ease: "easeInOut" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        Scroll
      </motion.div>
    </section>
  );
}