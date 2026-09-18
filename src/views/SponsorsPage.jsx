import Link from 'next/link';
import Footer from '../components/Footer';
import SponsorCard from '../components/SponsorCard';
import sponsorsData from '../data/sponsorsData';
import './pages.css';
import './SponsorsPage.css';

export default function SponsorsPage() {
  return (
    <div className="page-root">
      <div className="page-hero">
        <div className="page-hero-label">Partners</div>
        <h1>Our <span className="accent">Sponsors</span></h1>
        <p className="page-hero-sub">
          The organizations that make TEDxIntegralUniversity possible — join us and be part of this movement.
        </p>
      </div>

      <div className="page-wrap">
        <Link href="/" className="page-back-link">← Home</Link>

        <div className="sponsors-detail-grid">
          {sponsorsData.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
