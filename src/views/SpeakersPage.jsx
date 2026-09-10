import Link from 'next/link';
import Footer from '../components/Footer';
import SpeakerCard from '../components/SpeakerCard';
import './pages.css';

const SPEAKERS = [
  {
    id: 'sp-1',
    name: 'Vesmir',
    headline: 'Writer, Poet, Content Creator',
    topic: 'Slow Storytelling & Emotional Resilience',
    designation: 'Featured Speaker',
    org: 'Tangerine Circle',
    bio: 'Vesmir is a New Delhi-based independent writer, poet, and cultural organizer who has built a deeply resonant community around slow, raw storytelling. By moving away from brief, hyper-fast digital trends, his platform serves as a vital mirror to modern human vulnerabilities, grief, and emotional resilience. He is also the driving force behind Tangerine Circle, an independent collective dedicated to nurturing alternative creative voices and fine art conversations.',
    photo: '/assets/images/speakers/vesmir.jpg', // update with actual path
    tag: 'Featured Speaker',
    social: {
      instagram: 'https://instagram.com/vesmir', // update if available
      linkedin: null,
      twitter: null,
    },
  },
  {
    id: 'sp-2',
    name: 'Kushal Vijay',
    headline: 'Software Engineer & AI Professional',
    topic: 'Generative AI & Career Building in Tech',
    designation: 'Speaker',
    org: 'Microsoft',
    bio: 'Kushal Vijay is a Microsoft Software Engineer and AI professional who simplifies Generative AI, Python, and backend engineering through his educational content and mentorship. An NIT Jalandhar alumnus, he has delivered over 80 global talks—including at PyCon Japan and Hong Kong—inspiring students and young professionals to build successful careers in tech.',
    photo: '/assets/images/speakers/kushal-vijay.jpg', // update with actual path
    tag: 'Speaker',
    social: {
      linkedin: 'https://linkedin.com/in/kushalvijay', // update if available
      twitter: 'https://twitter.com/kushalvijay', // update if available
      instagram: null,
    },
  },
  {
    id: 'sp-3',
    name: 'Vipul V. Gaur',
    headline: 'Media & Communications Professional',
    topic: 'Storytelling, Communication & Leadership',
    designation: 'Speaker',
    org: 'Repertwahr Festival',
    bio: 'Vipul V. Gaur is a veteran media and communications professional with extensive experience across radio, television, and live events. Known for his work with the Repertwahr Festival, he excels at blending storytelling and cultural programming to connect with diverse crowds. Through his deep industry knowledge, Vipul provides young audiences with practical, engaging insights into creativity, communication, and leadership.',
    photo: '/assets/images/speakers/vipul-gaur.jpg', // update with actual path
    tag: 'Speaker',
    social: {
      linkedin: 'https://linkedin.com/in/vipulvgaur', // update if available
      instagram: null,
      twitter: null,
    },
  },
];

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

        <div className="speakers-page-grid">
          {SPEAKERS.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
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
