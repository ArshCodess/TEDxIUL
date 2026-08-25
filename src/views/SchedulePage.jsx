import Link from 'next/link';
import Schedule from '../components/Schedule';
import Footer from '../components/Footer';
import './pages.css';

export default function SchedulePage() {
  return (
    <div className="page-root">
      <div className="page-hero">
        <div className="page-hero-label">Event Day</div>
        <h1>The <span className="accent">Schedule</span></h1>
        <p className="page-hero-sub">
          September 23, 2026 —Central Auditorium, Integral University, Lucknow.
        </p>
      </div>
<div className="pre-events-section">
  <p className="section-label">Before Event Day</p>

  <h2 className="section-title">
    PRE-<span className="accent">EVENTS</span>
  </h2>

  <div className="pre-events-list">

    <div className="pre-event-item">
      <div className="pre-event-date">13 SEP</div>
      <div className="pre-event-info">
        <h3>Banner Unfolding Ceremony</h3>
      </div>
    </div>

    <div className="pre-event-item">
      <div className="pre-event-date">14–18 SEP</div>
      <div className="pre-event-info">
        <h3>Marketing Campaign</h3>
      </div>
    </div>

    <div className="pre-event-item">
      <div className="pre-event-date">15 SEP</div>
      <div className="pre-event-info">
        <h3>Treasure Hunt</h3>
      </div>
    </div>

    <div className="pre-event-item">
      <div className="pre-event-date">17 SEP</div>
      <div className="pre-event-info">
        <h3>TEDx Quiz</h3>
      </div>
    </div>

    <div className="pre-event-item">
      <div className="pre-event-date">19 SEP</div>
      <div className="pre-event-info">
        <h3>Escape Room</h3>
      </div>
    </div>

    <div className="pre-event-item">
      <div className="pre-event-date">20–22 SEP</div>
      <div className="pre-event-info">
        <h3>Speaker Reveal Campaign</h3>
      </div>
    </div>

  </div>
</div>
      <div className="page-wrap" style={{ paddingTop: '0' }}>
        <Link href="/" className="page-back-link">Home</Link>
        <Schedule />
      </div>

      <Footer />
    </div>
  );
}
