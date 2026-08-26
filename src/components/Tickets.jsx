import './Tickets.css';

const ticketTiers = [
  {
    key: 'general',
    name: 'General',
    price: '₹799',
    description: 'Perfect for first-time attendees',
    features: ['Full Auditorium Access', 'All Talks', 'Back Seating', 'Refreshments', 'Key Rings'],
    featured: false,
  },
  {
    key: 'gold',
    name: 'Gold',
    price: '₹1,699',
    description: 'Enjoy a premium experience with added comfort',
    features: ['Full Auditorium Access', 'All Talks', 'Middle Seating', 'Diary & Pen', 'Meal & Refreshments'],
    featured: true,
    tag: 'Most Popular',
  },
  {
    key: 'platinum',
    name: 'Platinum',
    price: '₹2,099',
    description: 'The ultimate experience for premium attendees',
    features: ['Full Auditorium Access', 'All Talks', 'Front-Row Seating', 'TEDx Kit', 'Meal & Refreshments', 'Meet & Greet with Speakers'],
    featured: false,
  },
  {
    key: 'faculty',
    name: 'Faculty',
    price: '₹2,599',
    description: 'An exclusive experience for faculty members',
    features: ['Full Auditorium Access', 'All Talks', 'VIP Seating', 'TEDx Kit', 'Meal & Refreshment', 'Meet & Greet with Speakers'],
    featured: false,
  },
];

export default function Tickets() {
  return (
    <section id="tickets">
      <p className="section-label fade-in">Secure Your Spot</p>
      <h2 className="section-title fade-in">EVENT <span className="accent">TICKETS</span></h2>
      <p className="tickets-sub fade-in">Choose the pass that fits your experience</p>
      <div className="tickets-grid">
        {ticketTiers.map((ticket) => (
          <div key={ticket.name} className={`ticket-card ${ticket.featured ? 'featured' : ''}`}>
            {ticket.tag && <div className="ticket-ribbon">{ticket.tag}</div>}
            <div className="ticket-header">
              <div className="ticket-type">{ticket.name}</div>
              <div className="ticket-price">{ticket.price}</div>
              <div className="ticket-period">Per Person</div>
              <p className="ticket-description">{ticket.description}</p>
            </div>
            <div className="ticket-divider"></div>
            <ul className="ticket-features">
              {ticket.features.map((feature) => (
                <li key={feature}><span className="tick">✓</span> {feature}</li>
              ))}
            </ul>
            <a href={`/register/form?pass=${ticket.key}`} className={ticket.featured ? 'btn-primary ticket-btn' : 'btn-outline ticket-btn'}>
              Get {ticket.name} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}