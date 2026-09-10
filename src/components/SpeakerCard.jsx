import './SpeakerCard.css';

function PersonIcon() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export default function SpeakerCard({ speaker }) {
  const imageSource = typeof speaker.photo === 'string'
    ? speaker.photo
    : speaker.photo?.src || speaker.photo

  const topics = Array.isArray(speaker.topics)
    ? speaker.topics
    : speaker.topic
      ? [speaker.topic]
      : []

  const social = speaker.social || {}

  return (
    <article className="speaker-card">
      <div className="speaker-content">
        <div className="speaker-content-inner">
          <span className="speaker-tag">{speaker.tag || speaker.designation || 'Speaker'}</span>
          <h3 className="speaker-name">{speaker.name}</h3>
          <p className="speaker-headline">{speaker.headline || speaker.topic || 'Topic to be announced'}</p>
          <p className="speaker-bio">{speaker.bio}</p>

          {topics.length > 0 && (
            <div className="speaker-topics">
              {topics.map((topic) => (
                <span key={topic} className="topic-chip">{topic}</span>
              ))}
            </div>
          )}

          {social && (social.linkedin || social.twitter || social.instagram) && (
            <div className="speaker-social">
              {social.linkedin && (
                <a className="social-link" href={social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {social.twitter && (
                <a className="social-link" href={social.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              )}
              {social.instagram && (
                <a className="social-link" href={social.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="speaker-image-container">
        {imageSource ? (
          <img src={imageSource} alt={speaker.name} className="speaker-image" />
        ) : (
          <div className="speaker-image-placeholder">
            <PersonIcon />
            <span>Photo Coming Soon</span>
          </div>
        )}
      </div>
    </article>
  );
}
