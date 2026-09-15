import Link from 'next/link';
import Footer from '../components/Footer';
import SpeakerCardPage from '../components/SpeakerCardPage';
import './pages.css';
import { SPEAKERS } from '../data/speakersData';

export default function SpeakersPage() {
  return (
    <div className="page-root">
      <div className="page-hero">
        <div className="page-hero-label">Speakers</div>
        <h1>Meet the <span className="accent">Speakers</span></h1>
        <p className="page-hero-sub">
          Incredible thinkers, innovators, and storytellers sharing ideas worth spreading at TEDxIntegralUniversity 2026.
        </p>
      </div>

      <div className="page-wrap">
        <Link href="/" className="page-back-link">Home</Link>

        <div className="speakers-page-list">
          {SPEAKERS.map((speaker) => (
            <SpeakerCardPage key={speaker.id} speaker={speaker} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
            More speakers to be announced soon — follow us for updates.
          </p>
          <Link href="/register" className="btn-primary">Register to Attend</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
