"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './RegisterPage.css';
import './pages.css';
import { PremiumScrollReveal } from './MotionReveal';
import {
  EARLY_BOOKING_DISCOUNT_PERCENT,
  COUPON_CODES,
  COUPON_DISCOUNT_PERCENT,
  PASS_SEAT_CAPS,
  getCouponDiscountedPassPrice,
  getDiscountedPassPrice,
  PASSES_DATA,
  STORE_PAGE_CONTENT,
} from '../data/passesData';
import Footer from '../components/Footer';
import Script from 'next/script';
import VerificationModal from '../components/VerificationModel';

// ─────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────
const EVENT = {
  edition: 'I',
  org: 'TEDxIntegralUniversity',
  year: '2026',
  theme: 'Tessellation',
  themeLine: 'From Individual Ideas to Collective Impact',
  venue: 'Central Auditorium',
  date: '23 September 2026',
  time: '10:00 AM',
  city: 'Lucknow',
  legal: 'This independent TEDx event is operated under license from TED.',
};

const WIDE_GRID_BREAKPOINT = 1280;


function generateBarcode(seed, count = 64) {
  let s = 0;
  for (let i = 0; i < (seed || '').length; i++) s = (31 * s + seed.charCodeAt(i)) >>> 0;
  s = s || 99991;
  return Array.from({ length: count }, () => {
    s = (1103515245 * s + 12345) % 2147483648;
    return { h: 30 + (s % 70), w: 1 + (s % 3) };
  });
}

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

function Ticket({ pass, isSelected, isPurchased, userDetails, onSelect, ticketLeft = 4 }) {
  const cardRef = useRef(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const isPremium = pass.key === 'platinum' || pass.key === 'faculty' || pass.key === 'gold';
  const discountedPrice = getDiscountedPassPrice(pass.price);
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

  const handleKeyDown = (event) => {
    if (isPurchased || ticketLeft <= 0) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(pass.key);
    }
  };

  return (
    <div className="tedx-card-wrapper">
      <div
        ref={cardRef}
        className={`tedx-card ticket-card--${pass.key} ${isSelected ? 'selected' : ''} ${ticketLeft > 0 ? "" : "grayscale-75"} ${isPurchased ? 'purchased' : ''} ${isLeaving ? 'leaving' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => ticketLeft > 0 && !isPurchased && onSelect(pass.key)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={isPurchased ? -1 : 0}
        aria-pressed={isSelected}
        aria-label={`${pass.name}, ₹${discountedPrice.toLocaleString('en-IN')} after ${EARLY_BOOKING_DISCOUNT_PERCENT}% discount`}
        style={{
          border: isPurchased ? '1px solid #10B981' : undefined,
          boxShadow: isPurchased ? '0 0 25px rgba(16, 185, 129, 0.2)' : undefined,
          cursor: isPurchased ? 'default' : 'pointer'
        }}
      >
        <div className="tedx-card-top">
          <div className="tedx-meta-row">
            <div className="tedx-tier-group">
              <span className="tedx-tier-label">Pass Tier</span>
              <span className="tedx-tier-val">{pass.tier || pass.name} // {pass.code?.split('-')[1]}</span>
              <div
                className={`tedx-badge ${isPurchased ? 'success-badge' : isPremium ? 'premium' : ''}`}
                style={isPurchased ? { background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', border: '1px solid #10B981' } : {}}
              >
                Seats left:
                {ticketLeft || 0}
              </div>
            </div>
            <div
              className={`tedx-badge ${isPurchased ? 'success-badge' : isPremium ? 'premium' : ''}`}
              style={isPurchased ? { background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', border: '1px solid #10B981' } : {}}
            >
              {isPurchased ? 'PURCHASED' : pass.label || pass.deck}
            </div>
          </div>

          <h3 className="tedx-pass-name">{pass.name}</h3>
          {pass.deck && <p className="tedx-pass-deck">{pass.deck}</p>}

          <div className="tedx-price-row">
            <span className="tedx-price">₹{discountedPrice.toLocaleString('en-IN')}</span>
            <span className="tedx-price-strike">₹{pass.price.toLocaleString('en-IN')}</span>
            <span className="tedx-badge premium">{EARLY_BOOKING_DISCOUNT_PERCENT}% OFF</span>
          </div>
        </div>

        <div className="tedx-cutout-row">
          <div className="tedx-cutout left" />
          <div className="tedx-dash" />
          <div className="tedx-cutout right" />
        </div>

        <div className="tedx-card-bottom">
          {isPurchased && userDetails && (
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px dashed rgba(16, 185, 129, 0.3)' }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#10B981', fontFamily: 'var(--font-mono)' }}>PASS HOLDER</p>
              <p style={{ margin: '2px 0 0', fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>{userDetails.name}</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{userDetails.email}</p>
            </div>
          )}

          <div className="tedx-features">
            {pass.features?.map((f, i) => (
              <div key={i} className="tedx-feature">
                <span className="tedx-feature-icon" style={{ color: isPurchased ? '#10B981' : undefined }}>✦</span>
                <span className="tedx-feature-text">{f}</span>
              </div>
            ))}
          </div>

          <button className="tedx-btn" style={isPurchased ? { background: '#10B981', color: '#fff', border: 'none' } : {}}>
            {isPurchased ? '✓ REGISTERED' : isSelected ? 'Pass Authorized' : 'Select Pass'}
          </button>

          <div className="tedx-barcode-box">
            <div className="tedx-scanner-laser" style={isPurchased ? { background: '#10B981', boxShadow: '0 0 8px #10B981' } : {}} />
            <div className="tedx-bars">
              {barcodeData?.map((b, i) => (
                <div key={i} className="tedx-bar" style={{ height: `${b.h}%`, width: `${b.w}px`, background: isPurchased ? '#10B981' : undefined }} />
              ))}
            </div>
            <span className="tedx-code-text">{isPurchased ? `CONFIRMED-${pass.code}` : pass.code}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MagneticButton({ onClick, disabled, verified = false }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current || window.innerWidth <= 820 || disabled) return;
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
      onClick={disabled ? null : onClick}
    >
      {
        verified ? (
          <button ref={btnRef} className="tedx-island-btn" disabled={disabled} style={disabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}}>
            Checkout
          </button>
        ) : (
          <button ref={btnRef} className="tedx-island-btn" disabled={disabled} style={disabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}}>
            Verify Identity & Pay
          </button>
        )}
    </div>
  );
}

function ErrorPopup({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="tedx-error-backdrop" role="alertdialog" aria-modal="true" aria-labelledby="tedx-error-title">
      <div className="tedx-error-popup">
        <div className="tedx-error-icon">!</div>
        <div>
          <span className="tedx-error-tag">Registration error</span>
          <h3 id="tedx-error-title">Something went wrong</h3>
          <p>{message}</p>
        </div>
        <button type="button" className="tedx-error-close" onClick={onClose} aria-label="Close error message">✕</button>
        <button type="button" className="tedx-error-action" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// MAIN STORE LAYOUT
// ─────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [purchasedPasses, setPurchasedPasses] = useState({});
  const [cachedUser, setCachedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [syncCtx, setSyncCtx] = useState(0);
  const [orderId, setorderId] = useState("");
  const [isverified, setisverified] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [counters, setCounters] = useState(null);
  const [isRefreshingSeats, setIsRefreshingSeats] = useState(false);

  const passesList = Object.values(PASSES_DATA);
  const passCount = passesList.length;

  const activePass = selected
    ? passesList.find((pass) => pass.key === selected)
    : null;

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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelectEmbla = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelectEmbla();
    emblaApi.on('select', onSelectEmbla);
    emblaApi.on('reInit', onSelectEmbla);
  }, [emblaApi, onSelectEmbla]);

  const handleSeatAvail = useCallback(async () => {
    setIsRefreshingSeats(true);
    try {
      const response = await fetch('/api/counter', { cache: 'no-store' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.counter) {
        throw new Error(data.message || 'Unable to fetch seat availability.');
      }
      setCounters(data.counter);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Unable to fetch seat availability.');
    } finally {
      setIsRefreshingSeats(false);
    }
  }, []);

  const getRemainingSeats = (passKey) => {
    const counterKey = {
      general: 'geneSeq',
      gold: 'goldSeq',
      platinum: 'platSeq',
    }[passKey];
    const sold = Number(counters?.[counterKey] || 0);
    return Math.max(0, (PASS_SEAT_CAPS[passKey] || 0) - sold);
  };

  useEffect(() => {
    handleSeatAvail();
  }, [handleSeatAvail]);



  // Load cached purchases and user data on mount
  useEffect(() => {
    try {
      const savedPurchases = localStorage.getItem('tedx_purchased_passes');
      const savedUser = localStorage.getItem('tedx_user_identity');
      if (savedPurchases) setPurchasedPasses(JSON.parse(savedPurchases));
      if (savedUser) setCachedUser(JSON.parse(savedUser));

    } catch (e) {
      console.error("Cache restoration failed", e);
    }
  }, []);

  const handleSyncRef = () => {
    setSyncCtx((prev) => {
      const next = prev + 1;
      if (next === 3) setTimeout(() => setSyncCtx(0), 5000);
      return next;
    });
  };

  const startCheckoutProcess = () => {
    if (!activePass) return;
    setIsModalOpen(true);
  };

  const handleVerifySuccess = (userData) => {
    setCachedUser(userData);
    localStorage.setItem('tedx_user_identity', JSON.stringify(userData));
    setIsModalOpen(false);
    setisverified(true)
    // handlepay(activePass, userData);
  };

  const handleCoupon = () => {
    const normalizedCoupon = couponCode.trim().toUpperCase();
    if (!COUPON_CODES.includes(normalizedCoupon)) {
      setAppliedCoupon('');
      setCouponMessage('Invalid coupon code.');
      return;
    }

    setAppliedCoupon(normalizedCoupon);
    setCouponMessage(`${COUPON_DISCOUNT_PERCENT}% extra discount applied.`);
  };

  const handlepay = async (pass, userData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          amount: getCouponDiscountedPassPrice(pass.price, appliedCoupon) * 100,
          email: userData.email || "",
          passKey: pass.key,
          couponCode: appliedCoupon,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || data.message || 'Unable to create your payment order.');
      const { order, razorpayId } = data;
      if (!order?.id || !razorpayId) throw new Error('Payment order was not created. Please try again.');
      if (!window.Razorpay) throw new Error('Payment service is unavailable. Please refresh and try again.');
      setorderId(order.id);
      const paymentobj = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: getCouponDiscountedPassPrice(pass.price, appliedCoupon) * 100,
        currency: "INR",
        name: EVENT.org,
        description: `${pass.name} Registration`,
        order_id: order.id,
        handler: async function (response) {
          const res = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              razorpayId,
              user: userData,
              passTier: pass.key.replace('pass-', ''),
              totalAmount: getCouponDiscountedPassPrice(pass.price, appliedCoupon) * 100,
              couponCode: appliedCoupon,
            }),
          });

          const result = await res.json().catch(() => ({}));

          if (res.ok && result.success === true) {
            const updatedPasses = { ...purchasedPasses, [pass.key]: true };
            setPurchasedPasses(updatedPasses);
            localStorage.setItem('tedx_purchased_passes', JSON.stringify(updatedPasses));
            setisverified(true)
            setCouponCode("")
            setSelected(null)
            const counterKey = {
              general: 'geneSeq',
              gold: 'goldSeq',
              platinum: 'platSeq',
            }[pass.key];
            if (counterKey) {
              setCounters((currentCounters) => currentCounters
                ? { ...currentCounters, [counterKey]: Number(currentCounters[counterKey] || 0) + 1 }
                : currentCounters);
            }
            await handleSeatAvail();

            // Trigger Success Animation
            setShowSuccessAnim(true);

            setTimeout(() => setShowSuccessAnim(false), 5000);
          } else {
            setErrorMessage(result.error || result.message || 'Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: async () => {
            setErrorMessage('Payment was cancelled. You can try again whenever you are ready.')
            try {
              const res = await fetch("/api/verify-payment/failure",
                {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    failureReason: "Modal Closed by User",
                    order_id: orderId,
                  })
                }
              )
              if (!res.ok) {
                console.error("Failed to sync failure status with backend server.");
              }
            } catch (apiError) {
              console.error("Network error while reporting payment failure:", apiError);
            }
          },
        },
        notes: {
          pass: pass.name,
        },
        prefill: {
          name: userData?.name || "Attendee",
          email: userData?.email || "attendee@example.com",
        },
        theme: { color: "#EB0028" },
      });
      paymentobj.on('payment.failed', async (failure) => {
        // setErrorMessage(failure?.error?.description || 'Payment failed. Please try again.');
        try {
          const res = await fetch("/api/verify-payment/failure",
            {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                failureReason: failure?.error?.description,
                order_id: failure?.error?.metadata?.order_id || orderId,
              })
            }
          )
          if (!res.ok) {
            console.error("Failed to sync failure status with backend server.");
          }
        } catch (apiError) {
          console.error("Network error while reporting payment failure:", apiError);
        }

      });
      paymentobj.open();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Unable to start payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleclick = async () => {
    if (activePass && getRemainingSeats(activePass.key) <= 0) {
      setErrorMessage('This pass is sold out. Please choose another pass.');
      return;
    }
    return isverified ? await handlepay(activePass, cachedUser) : startCheckoutProcess();
  }

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
  const DEFAULT_INITIAL_DATA = {};

  return (
    <div className="page-root">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* SUCCESS CELEBRATION OVERLAY */}
      {showSuccessAnim && (
        <div className="tedx-success-overlay">
          <div className="tedx-success-modal">
            <div className="tedx-success-icon">✓</div>
            <h2>Pass Registration Confirmed!</h2>
            <p>Your identity has been linked to the pass and stored successfully.Check your Email for ticket</p>
            <div className="tedx-confetti-emitter" />
          </div>
        </div>
      )}
      {/* VERIFICATION POPUP MODAL */}
      <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerifySuccess={handleVerifySuccess}
        onError={setErrorMessage}
        passName={activePass?.name}
        initialData={DEFAULT_INITIAL_DATA}
      />

      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage('')} />

      <div className="page-hero">
        <div className="page-hero-label">Tickets</div>
        <h1>Registration & <span className="accent">Passes</span></h1>
        <p className="page-hero-sub">
          Choose your pass and secure your seat for the TEDxIntegralUniversity experience.
        </p>
        <h2 className="early-booking-heading">Get {EARLY_BOOKING_DISCOUNT_PERCENT}% discount if you book your ticket before 15 September</h2>
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
            <div className="page-hero-label" style={{ animation: "bounce" }}>Active discount 15%</div>
            <h2 className="tedx-subtitle">
              <span onPointerDown={handleSyncRef} style={{ cursor: syncCtx > 0 ? 'default' : 'auto', marginTop: "4px" }}> &#40; Participation Certificate</span> For ALL &#41;
            </h2>
          </PremiumScrollReveal>
        </div>

        <div className="tedx-carousel-wrapper">
          <button className="tedx-carousel-nav prev" onClick={scrollPrev} aria-label="Previous Pass">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <div className="embla-viewport" ref={emblaRef}>
            <div className="tedx-carousel">
              {passesList.map((p, idx) => (
                <div key={p.key} className="tedx-carousel-item">
                  <PremiumScrollReveal delay={0.15 * idx}>
                    <Ticket
                      pass={p}
                      isSelected={selected === p.key}
                      isPurchased={Boolean(purchasedPasses[p.key])}
                      userDetails={cachedUser}
                      onSelect={setSelected}
                      ticketLeft={getRemainingSeats(p.key)}
                    />
                  </PremiumScrollReveal>
                </div>
              ))}
            </div>
          </div>

          <button className="tedx-carousel-nav next" onClick={scrollNext} aria-label="Next Pass">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>

          {/* Mobile dot indicators + slide counter + swipe hint */}
          <div className="tedx-carousel-dots">
            {passesList.map((p, idx) => (
              <button
                key={p.key}
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

        <div className={`tedx-island-wrapper`}>
          <div className={`${isverified?"tedx-island":"tedx-island"} ${activePass ? 'visible' : ''}`}>
            {isverified && <div className="tedx-coupon-wrapper">
              
              <label className="tedx-island-lbl" htmlFor="tedx-coupon-code">Coupon code</label>
              <div className="tedx-coupon-controls">
                <input
                  id="tedx-coupon-code"
                  className="tedx-coupon-input"
                  type="text"
                  value={couponCode}
                  onChange={(event) => {
                    setCouponCode(event.target.value);
                    setCouponMessage('');
                  }}
                  placeholder="COUPXX-XXXX"
                  aria-describedby="tedx-coupon-message"
                />
                <button type="button" className="tedx-coupon-button" onClick={handleCoupon}>Apply</button>
              </div>
              {couponMessage && (
                <span id="tedx-coupon-message" className={`tedx-coupon-message ${appliedCoupon ? 'valid' : 'invalid'}`} role="status">
                  {couponMessage}
                </span>
              )}
            </div>}
            <div className={"tedx-island-fields"}>
              <div className="tedx-island-info">
                <div className="tedx-island-col">
                  <span className="tedx-island-lbl">Selected Identity</span>
                  <span className="tedx-island-val">{activePass?.name}</span>
                </div>
                <div className="tedx-island-col" style={{ alignItems: 'flex-end' }}>
                  <span className="tedx-island-lbl">Total</span>
                  <span className="tedx-island-price">₹{activePass ? getCouponDiscountedPassPrice(activePass.price, appliedCoupon).toLocaleString('en-IN') : '0'}</span>
                </div>
              </div>

              {activePass && (
                <div className="tedx-seat-availability">
                  <span className="tedx-island-lbl">Seat Remaining: {String(getRemainingSeats(activePass.key)).padStart(2, '0')}</span>
                  <button
                    type="button"
                    className={`tedx-seat-refresh ${isRefreshingSeats ? 'is-refreshing' : ''}`}
                    onClick={handleSeatAvail}
                    disabled={isRefreshingSeats}
                    aria-label="Refresh seat availability"
                    title="Refresh seat availability"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 11a8.1 8.1 0 0 0-14.9-3L3 11" />
                      <path d="M3 4v7h7" />
                      <path d="M4 13a8.1 8.1 0 0 0 14.9 3L21 13" />
                      <path d="M21 20v-7h-7" />
                    </svg>
                  </button>
                </div>
              )}

              <MagneticButton
                disabled={purchasedPasses[activePass?.key] || (activePass && getRemainingSeats(activePass.key) <= 0)}
                onClick={handleclick}
                verified={isverified}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}