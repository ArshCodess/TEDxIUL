import './SpeakerCardPage.css';

/* ── Icons ────────────────────────────────────────────── */
function PersonIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
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

/* ── Component ────────────────────────────────────────── */
export default function SpeakerCardPage({ speaker }) {
  const src = (() => {
    if (!speaker.photo) return null;
    if (typeof speaker.photo === 'string') return speaker.photo;
    return speaker.photo.src || null;
  })();

  const hasSocial = speaker.instagram || speaker.linkedin;

  return (
    <article className="spkp-card">
      {/* Left — Info */}
      <div className="spkp-info">
        <h2 className="spkp-name">{speaker.name}</h2>
        <p className="spkp-headline">{speaker.headline}</p>

        {speaker.org && (
          <p className="spkp-org">{speaker.org}</p>
        )}

        {speaker.topic && (
          <div className="spkp-topic-wrap">
            <span className="spkp-topic-label">Topic</span>
            <p className="spkp-topic">{speaker.topic}</p>
          </div>
        )}

        <p className="spkp-bio">{speaker.bio}</p>

        {hasSocial && (
          <div className="spkp-social">
            {speaker.instagram && (
              <a
                href={speaker.instagram}
                className="spkp-social-btn spkp-instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.name} on Instagram`}
              >
                <InstagramIcon /> Instagram
              </a>
            )}
            {speaker.linkedin && (
              <a
                href={speaker.linkedin}
                className="spkp-social-btn spkp-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.name} on LinkedIn`}
              >
                <LinkedInIcon /> LinkedIn
              </a>
            )}
          </div>
        )}
      </div>

      {/* Right — Photo */}
      <div className="spkp-photo-wrap">
        {src ? (
          <img src={src} alt={speaker.name} className="spkp-photo" />
        ) : (
          <div className="spkp-photo-placeholder">
            <PersonIcon />
            <span>Photo Coming Soon</span>
          </div>
        )}
      </div>
    </article>
  );
}
