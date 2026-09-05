import Link from 'next/link';
import Footer from '../components/Footer';
import './pages.css';
import tedxIULogo from "../assets/tedxintegraluniversity_red.png";

export default function AboutTEDxIULPage() {
  return (
    <div className="page-root">
      <div className="page-hero">
        <div className="page-hero-label">About</div>
        <h1>About <span className="accent">TEDxIUL</span></h1>
        <p className="page-hero-sub">
          Where ideas meet purpose, voices inspire change, and a community comes together to shape the future.
        </p>
      </div>

      <div className="page-wrap">
        <Link href="/" className="page-back-link">Home</Link>

        <div className="about-page-content">
          <div className="about-layout">

            {/* LEFT — text content */}
            <div className="about-text">

              <h2>Our <span className="accent">Story</span></h2>
              <p>
                TEDxIntegralUniversity marks the inaugural TEDx event hosted at Integral University, Lucknow.
                As the university's first independently organized TEDx experience, it represents a milestone
                in fostering meaningful conversations, bold ideas, and collaborative innovation.
              </p>
              <p>
                Bringing together students, researchers, entrepreneurs, educators, artists, and changemakers,
                TEDxIntegralUniversity creates a platform where diverse perspectives converge to inspire
                curiosity, encourage dialogue, and spark real-world impact. Guided by TED's mission of{' '}
                <strong>Ideas Worth Spreading</strong>, our event celebrates the belief that every individual
                carries an idea capable of creating positive change.
              </p>

              <div className="about-highlight-box">
                <p>
                  "Like pieces in a tessellation, every idea has its own shape — but together they create
                  something far greater than any one perspective could achieve."
                </p>
              </div>

              <h2>Our <span className="accent">Theme</span></h2>
              <div className="theme-block">
                <p className="theme-title">TESSELLATION — From Individual Ideas to Collective Impact.</p>
                <p>
                  Inspired by the mathematical concept of tessellation, where individual shapes fit seamlessly
                  together to create a unified pattern, our theme reflects the strength found in diversity,
                  collaboration, and shared purpose.
                </p>
              </div>
              <p>
                Every speaker, attendee, volunteer, and partner contributes a unique perspective. Alone, each
                idea holds value; together, they form a larger vision capable of inspiring innovation and
                meaningful change. TESSELLATION is more than this year's theme — it is an invitation to
                discover how our individual experiences connect to build something extraordinary.
              </p>

              <h2>Our <span className="accent">Vision</span></h2>
              <p>
                Our vision is to cultivate a culture where curiosity fuels innovation, dialogue bridges
                disciplines, and ideas empower action. Through TEDxIntegralUniversity, we aspire to create
                an inclusive platform that connects students, professionals, researchers, creators, and
                leaders who believe in the transformative power of knowledge and conversation. As the first
                TEDx event at Integral University, we hope to establish a lasting tradition that inspires
                future generations to think critically, lead compassionately, and contribute confidently
                to society.
              </p>

              <div className="about-cta-row">
                <Link href="/speakers" className="btn-primary">Meet the Speakers</Link>
                <Link href="/register" className="btn-outline">Register Now</Link>
              </div>

            </div>

            {/* RIGHT — image */}
            <div className="about-image">
              <img src={tedxIULogo.src || tedxIULogo} alt="TEDxIntegralUniversity" className="about-large-image" />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
