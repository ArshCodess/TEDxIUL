"use client";
import { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    q: "What is TEDx?",
    a: "TEDx events are independently organized events licensed by TED that bring communities together to share ideas worth spreading."
  },
  {
    q: "What is TEDxIntegralUniversity?",
    a: "TEDxIntegralUniversity is the official TEDx event hosted at Integral University, bringing together innovators, leaders, and changemakers."
  },
  {
    q: 'What does the theme "Tessellation" mean?',
    a: "Tessellation represents how individual ideas, perspectives, and experiences come together to create meaningful collective impact."
  },
  {
    q: "Who can attend TEDxIntegralUniversity?",
    a: "The event is open to students, faculty, professionals, and anyone passionate about ideas. Tickets are available on this website."
  },
  {
    q: "Why should I attend TEDxIntegralUniversity?",
    a: "You'll gain insights from inspiring speakers, connect with like-minded individuals, and experience ideas that can spark personal and professional growth."
  },
  {
    q: "How can I register for the event?",
    a: "Registration details and ticket information will be announced through the official TEDxIntegralUniversity website and social media channels."
  },
  {
    q: "Will there be a participation certificate?",
    a: "Yes, attendees will receive a participation certificate after successfully attending the event."
  },
  {
    q: "Who are the speakers at TEDxIntegralUniversity?",
    a: "Speaker announcements will be made soon. Stay connected with our official platforms for updates."
  },
  {
    q: "Is TEDx the same as TED?",
    a: "No. TED is the global organization, while TEDx events are independently organized under a TED license."
  },
  {
    q: "Can I interact with speakers?",
    a: "Depending on the event schedule, networking and interaction opportunities may be available."
  },
  {
    q: "What can I expect from the event?",
    a: "Expect inspiring talks, engaging discussions, networking opportunities, and a day filled with innovative ideas."
  },
  {
    q: "Can students from other institutions attend?",
    a: "Yes. The event welcomes students from Integral University as well as other institutions."
  },
  {
    q: "Will food and refreshments be provided?",
    a: "Yes, refreshments and meals will be provided according to the ticket category and event schedule."
  },
  {
    q: "How can I stay updated about TEDxIntegralUniversity?",
    a: "Follow our official website and social media channels for the latest announcements and updates."
  },
];

const INITIAL_VISIBLE = 4;

export default function FAQ({ hideHeader = false }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq">
      {!hideHeader && (
        <>
          <h2 className="faq-main-title fade-in">
            <span className="faq-white">Got </span><span className="faq-red">Questions?</span>
          </h2>
          <p className="faq-subtitle fade-in">
            Everything you need to know before joining the TEDxIntegralUniversity experience.
          </p>
        </>
      )}

      <div className="faq-list">
        {visibleFaqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-q${openIndex === index ? ' open' : ''}`}
              onClick={() => handleToggle(index)}
            >
              {faq.q} <span className="icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            <div className={`faq-a${openIndex === index ? ' open' : ''}`}>
              {faq.a}
            </div>
          </div>
        ))}
      </div>

      {faqs.length > INITIAL_VISIBLE && (
        <div className="faq-toggle-wrap">
          <button className="faq-view-more" onClick={() => { setShowAll(!showAll); setOpenIndex(null); }}>
            {showAll ? 'View Less ↑' : `View More (${faqs.length - INITIAL_VISIBLE} more) ↓`}
          </button>
        </div>
      )}
    </section>
  );
}