"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';
import tedxLogo from '../../assets/images/logo-white.png';

// Desktop nav items (after About dropdown)
const NAV_LINKS = [
  { label: 'Speakers', to: '/speakers'  },
  { label: 'Schedule', to: '/schedule'  },
  { label: 'Sponsors', to: '/sponsors'  },
  { label: 'Register', to: '/register'  },
  { label: 'Venue',    to: '/venue'     },
  { label: 'FAQ',      to: '/faq'       },
  { label: 'Contact',  to: '/contact'   },
];

const ABOUT_LINKS = [
  { label: 'About TEDx',           to: '/about/tedx'    },
  { label: 'About TEDxIUL',        to: '/about/tedxiul' },
  { label: 'About Integral Univ.', to: '/about/iul'     },
  { label: 'Our Team',             to: '/team'          },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location    = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileAboutOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleMenuLinkClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className={menuOpen ? 'nav-open' : ''}>
        {/* Brand logo */}
        <Link href="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
          <img src={tedxLogo.src || tedxLogo} alt="TEDxIntegralUniversity logo" className="nav-logo-img" />
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          {/* Home */}
          <li><Link href="/">Home</Link></li>

          {/* About dropdown */}
          <li
            className="nav-dropdown-item"
            ref={dropdownRef}
          >
            <button
              className={`nav-dropdown-trigger${dropdownOpen ? ' is-active' : ''}`}
              onClick={() => setDropdownOpen(o => !o)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              About
              <span className="nav-dropdown-chevron" aria-hidden="true">▾</span>
            </button>

            <div className={`nav-dropdown-panel${dropdownOpen ? ' is-open' : ''}`} role="menu">
              {ABOUT_LINKS.map(({ label, to }) => (
                <Link key={to}
                  href={to}
                  className="nav-dropdown-link"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </li>

          {/* Remaining links */}
          {NAV_LINKS.map(({ label, to }) => (
            <li key={label}>
              <Link href={to}>{label}</Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button (mobile) */}
        <button
          className={`hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          {/* About — tap to expand submenu */}
          <li className="mobile-about-item">
            <button
              className={`mobile-about-trigger${mobileAboutOpen ? ' is-open' : ''}`}
              onClick={() => setMobileAboutOpen(o => !o)}
              aria-expanded={mobileAboutOpen}
            >
              About
              <span className="mobile-about-chevron" aria-hidden="true">▾</span>
            </button>

            <ul className={`mobile-about-sub${mobileAboutOpen ? ' is-open' : ''}`}>
              {ABOUT_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link href={to} onClick={handleMenuLinkClick}>{label}</Link>
                </li>
              ))}
            </ul>
          </li>

          {NAV_LINKS.map(({ label, to }) => (
            <li key={label}>
              <Link href={to} onClick={handleMenuLinkClick}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}