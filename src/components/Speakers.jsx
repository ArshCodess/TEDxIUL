import SpeakerCard from './SpeakerCard';
import './Speakers.css';

const SPEAKERS = [
  {
    id: 'sp-1',
    name: 'Speaker TBA',
    headline: 'Topic to be announced',
    topic: 'Topic to be announced',
    designation: 'Featured Speaker',
    org: 'Organisation TBA',
    bio: 'Details about this speaker will be announced soon. Stay tuned for a lineup of visionary thinkers and change-makers joining us at TEDxIntegralUniversity 2026.',
    photo: null,
    tag: 'Featured Speaker',
  },
  {
    id: 'sp-2',
    name: 'Speaker TBA',
    headline: 'Topic to be announced',
    topic: 'Topic to be announced',
    designation: 'Speaker',
    org: 'Organisation TBA',
    bio: 'Details about this speaker will be announced soon. Stay tuned for a lineup of visionary thinkers and change-makers joining us at TEDxIntegralUniversity 2026.',
    photo: null,
    tag: 'Speaker',
  },
  {
    id: 'sp-3',
    name: 'Speaker TBA',
    headline: 'Topic to be announced',
    topic: 'Topic to be announced',
    designation: 'Speaker',
    org: 'Organisation TBA',
    bio: 'Details about this speaker will be announced soon. Stay tuned for a lineup of visionary thinkers and change-makers joining us at TEDxIntegralUniversity 2026.',
    photo: null,
    tag: 'Speaker',
  },
  {
    id: 'sp-4',
    name: 'Speaker TBA',
    headline: 'Topic to be announced',
    topic: 'Topic to be announced',
    designation: 'Speaker',
    org: 'Organisation TBA',
    bio: 'Details about this speaker will be announced soon. Stay tuned for a lineup of visionary thinkers and change-makers joining us at TEDxIntegralUniversity 2026.',
    photo: null,
    tag: 'Speaker',
  },
];

export default function Speakers() {
  return (
    <section id="speakers">
      <p className="section-label fade-in">The Voices</p>
      <h2 className="section-title fade-in">OUR <span className="accent">SPEAKERS</span></h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px' }} className="fade-in">
        Meet the incredible thinkers who will share their stories at TEDxIntegralUniversity 2026.
      </p>
      <div className="speakers-grid">
        {SPEAKERS.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>
    </section>
  );
}