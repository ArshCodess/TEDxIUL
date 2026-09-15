'use client';
import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './SpeakerCardHome.css';

/* ── Icons ────────────────────────────────────────────── */
function PersonIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ── Helpers ──────────────────────────────────────────── */
function getImgSrc(photo) {
  if (!photo) return null;
  if (typeof photo === 'string') return photo;
  return photo.src || null;
}

/* ── Component ────────────────────────────────────────── */
export default function SpeakerCardHome({ speakers }) {
  const [activeId, setActiveId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center' });

  const activeSpeaker = speakers.find((s) => s.id === activeId) ?? null;

  /* Toggle expand — clicking same thumb closes, different opens */
  const handleThumbClick = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  /* Track Embla scroll for dots */
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      {/* ══════════════════════════════
          DESKTOP — photo row + expand
         ══════════════════════════════ */}
      <div className="spkh-desktop">
        <div className="spkh-thumb-row" role="list" aria-label="Speaker photos">
          {speakers.map((speaker) => {
            const src = getImgSrc(speaker.photo);
            const isActive = speaker.id === activeId;
            return (
              <button
                key={speaker.id}
                id={`speaker-thumb-${speaker.id}`}
                className={`spkh-thumb${isActive ? ' active' : ''}`}
                role="listitem"
                onClick={() => handleThumbClick(speaker.id)}
                aria-expanded={isActive}
                aria-label={`${isActive ? 'Close' : 'View'} ${speaker.name}`}
                title={speaker.name}
              >
                <div className="spkh-thumb-ring">
                  {src ? (
                    <img src={src} alt={speaker.name} className="spkh-thumb-img" />
                  ) : (
                    <div className="spkh-thumb-placeholder"><PersonIcon /></div>
                  )}
                </div>
                <span className="spkh-thumb-name">{speaker.name}</span>
              </button>
            );
          })}
        </div>

        {/* Animated expand panel */}
        <div className={`spkh-expand-wrapper${activeId ? ' open' : ''}`} aria-live="polite">
          <div className="spkh-expand-inner">
            {activeSpeaker && (
              <button
                className="spkh-expanded-card"
                onClick={() => setActiveId(null)}
                aria-label={`Close details for ${activeSpeaker.name}`}
              >
                {/* Photo */}
                <div className="spkh-exp-photo-wrap">
                  {getImgSrc(activeSpeaker.photo) ? (
                    <img
                      src={getImgSrc(activeSpeaker.photo)}
                      alt={activeSpeaker.name}
                      className="spkh-exp-photo-img"
                    />
                  ) : (
                    <div className="spkh-exp-photo-placeholder"><PersonIcon /></div>
                  )}
                </div>

                {/* Info */}
                <div className="spkh-exp-info">
                  <h3 className="spkh-exp-name">{activeSpeaker.name}</h3>
                  <p className="spkh-exp-headline">{activeSpeaker.headline}</p>
                  {activeSpeaker.topic && (
                    <p className="spkh-exp-topic">"{activeSpeaker.topic}"</p>
                  )}
                  <p className="spkh-exp-bio">{activeSpeaker.bio}</p>

                  {(activeSpeaker.instagram || activeSpeaker.linkedin) && (
                    <div className="spkh-exp-social">
                      {activeSpeaker.instagram && (
                        <a
                          href={activeSpeaker.instagram}
                          className="spkh-social-btn spkh-instagram"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${activeSpeaker.name} on Instagram`}
                        >
                          <InstagramIcon /> Instagram
                        </a>
                      )}
                      {activeSpeaker.linkedin && (
                        <a
                          href={activeSpeaker.linkedin}
                          className="spkh-social-btn spkh-linkedin"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${activeSpeaker.name} on LinkedIn`}
                        >
                          <LinkedInIcon /> LinkedIn
                        </a>
                      )}
                    </div>
                  )}

                  <span className="spkh-close-hint">Click anywhere to close ✕</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          MOBILE — Embla Carousel
         ══════════════════════════════ */}
      <div className="spkh-mobile">
        <div className="spkh-carousel-viewport" ref={emblaRef}>
          <div className="spkh-carousel-container">
            {speakers.map((speaker, i) => {
              const src = getImgSrc(speaker.photo);
              return (
                <div key={speaker.id} className="spkh-carousel-slide" aria-label={`Speaker ${i + 1} of ${speakers.length}`}>
                  <div className="spkh-mobile-card">
                    {/* Photo top */}
                    <div className="spkh-mobile-photo-wrap">
                      {src ? (
                        <img src={src} alt={speaker.name} className="spkh-mobile-photo-img" />
                      ) : (
                        <div className="spkh-mobile-photo-placeholder"><PersonIcon /></div>
                      )}
                    </div>

                    {/* Info bottom */}
                    <div className="spkh-mobile-info">
                      <h3 className="spkh-exp-name">{speaker.name}</h3>
                      <p className="spkh-exp-headline">{speaker.headline}</p>
                      {speaker.topic && (
                        <p className="spkh-exp-topic">"{speaker.topic}"</p>
                      )}
                      {(speaker.instagram || speaker.linkedin) && (
                        <div className="spkh-exp-social" style={{ marginTop: '16px' }}>
                          {speaker.instagram && (
                            <a
                              href={speaker.instagram}
                              className="spkh-social-btn spkh-instagram"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <InstagramIcon /> Instagram
                            </a>
                          )}
                          {speaker.linkedin && (
                            <a
                              href={speaker.linkedin}
                              className="spkh-social-btn spkh-linkedin"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LinkedInIcon /> LinkedIn
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots + counter */}
        <div className="spkh-dots-wrap">
          <div className="spkh-dots" role="tablist" aria-label="Speaker navigation">
            {speakers.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === selectedIndex}
                className={`spkh-dot${i === selectedIndex ? ' active' : ''}`}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to speaker ${i + 1}`}
              />
            ))}
          </div>
          <p className="spkh-counter">{selectedIndex + 1} / {speakers.length}</p>
        </div>
      </div>
    </>
  );
}
