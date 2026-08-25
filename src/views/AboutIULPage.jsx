import Link from 'next/link';
import Footer from '../components/Footer';
import './pages.css';
import iulCampus from "../assets/IUL-Drone.png";

export default function AboutIULPage() {
  return (
    <div className="page-root">
      <div className="page-hero">
        <div className="page-hero-label">About</div>
        <h1>
          About <span className="accent">Integral University</span>
        </h1>
        <p className="page-hero-sub">
          A premier institution committed to excellence in education,
          research, innovation, and holistic development.
        </p>
      </div>

      <div className="page-wrap">
        <Link href="/" className="page-back-link">
          Home
        </Link>

        <div className="about-page-content">
          <div className="about-layout">

            {/* LEFT SIDE */}
            <div className="about-text">

              <h2>
                About <span className="accent">IUL</span>
              </h2>

              <p>
                Established in 2004, Integral University, Lucknow, is one of
                North India's leading multidisciplinary universities,
                recognized for its commitment to academic excellence,
                innovation, research, and inclusive education. Offering
                programs across engineering, medical sciences, management,
                law, architecture, pharmacy, humanities, and more, the
                university nurtures talent through a holistic learning
                environment.
              </p>

              <p>
                With students from across India and numerous countries around
                the world, Integral University promotes diversity,
                creativity, leadership, and entrepreneurship. Its emphasis
                on experiential learning, modern infrastructure, and industry
                collaboration prepares graduates to become confident
                professionals and responsible global citizens.
              </p>

              <div className="about-highlight-box">
                <p>
                  "Integral University empowers minds to innovate, inspire,
                  and lead with knowledge, integrity, and compassion."
                </p>
              </div>

              <h2>
                Campus &amp; <span className="accent">Facilities</span>
              </h2>

              <p>
                Located on a 120-acre modern green campus in Lucknow,
                Integral University offers state-of-the-art classrooms,
                advanced research laboratories, a central library,
                innovation and incubation centres, sports complexes,
                auditoriums, healthcare facilities, and vibrant student
                spaces. The campus is designed to foster academic excellence
                while providing a dynamic environment for personal and
                professional growth.
              </p>

              <h2>
                Location &amp; <span className="accent">Access</span>
              </h2>

              <p>
                Integral University is situated at Kursi Road, Lucknow,
                Uttar Pradesh, offering convenient connectivity by road,
                rail, and air. The campus is approximately 30 km from
                Chaudhary Charan Singh International Airport and is easily
                accessible from major railway stations and key locations
                across the city, making it an ideal destination for students
                and visitors alike.
              </p>

              <div className="about-cta-row">
                <a
                  href="https://www.iul.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Visit IUL Website
                </a>

                <Link href="/venue" className="btn-primary">
                  Venue &amp; Directions
                </Link>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="about-image">
              <img src={iulCampus.src || iulCampus} alt="Integral University" className="about-large-image" />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
