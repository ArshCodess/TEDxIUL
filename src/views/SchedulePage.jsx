import Link from 'next/link';
import Schedule from '../components/Schedule';
import Footer from '../components/Footer';
import './pages.css';
import PreEvent from '../components/PreEvent';

export default function SchedulePage() {
  return (
    <section id='schedulepage' className="page-root">
      <div className="page-hero">
        <div className="page-hero-label">Event Day</div>
        <h1>The <span className="accent">Schedule</span></h1>
        <p className="page-hero-sub">
          September 23, 2026 —Central Auditorium, Integral University, Lucknow.
        </p>
      </div>
      <PreEvent/>
      <div className="page-wrap" style={{ paddingTop: '0' }}>
        <Link href="/" className="page-back-link">Home</Link>
        <Schedule />
      </div>

      <Footer />
    </section>
  );
}
