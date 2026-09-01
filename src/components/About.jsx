
import tedxIULogo from '../assets/tedxintegraluniversity_dark.png';
import './About.css';

export default function About() {
  return (
    <section id="about">
      <div>
        <p className="section-label fade-in">About TEDXIUL</p>
        <h2 className="about-heading fade-in">Ideas That Shape The Future</h2>
        <p className="about-body fade-in">
          TEDxIUL brings together visionary speakers, innovators, entrepreneurs, and changemakers to inspire meaningful conversations and impactful ideas.
        </p>
        <p className="about-body fade-in">
          Our theme <strong>"TESSELLATION"</strong> — From Individual Ideas to Collective
          Impact celebrates how distinct perspectives, when placed together form a pattern larger and more beautiful
          than any single piece alone. Like tiles in a mosaic, every voice matters.
        </p>
        <a href="#speakers" className="btn-primary fade-in" style={{ marginTop: '20px', display: 'inline-block' }}>
          Explore Speakers
        </a>
      </div>
      <div className="about-img-box">
  <img src={tedxIULogo.src || tedxIULogo} alt="TEDxIUL Logo" className="about-image" />
</div>
    </section>
  );
}