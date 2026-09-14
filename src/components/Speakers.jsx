import SpeakerCard from './SpeakerCard';
import './Speakers.css';
import { SPEAKERS } from '../data/speakersData';

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