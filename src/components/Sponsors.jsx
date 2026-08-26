import './Sponsors.css';
import iulLogo from '../assets/iul-A.png';

export default function Sponsors() {
  return (
    <section id="sponsors">
      <p className="section-label fade-in">Our Partners</p>
      <h2 className="section-title fade-in">OUR <span className="accent">SPONSORS</span></h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px' }} className="fade-in">
        Sponsorship opportunities are open. Be part of this movement.
      </p>
      <div className="sp-row">
        <div className="sp-box featured">
          <img
            src={iulLogo.src || iulLogo}
            alt="Integral University"
            className="sp-logo"
          />
        </div>
        <div className="sp-box">Sponsor TBA</div>
        <div className="sp-box">Sponsor TBA</div>
        <div className="sp-box">Sponsor TBA</div>
      </div>
    </section>
  );
}