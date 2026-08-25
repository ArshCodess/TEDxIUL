import './Tickets.css';

const ticketTiers = [
  {
    name: 'General',
    price: '₹799',
    description: 'Perfect for first-time attendees',
    features: ['Full-day event access', 'Welcome kit & goodies', 'Lunch & refreshments', 'Certificate of participation'],
    featured: false,
  },
  {
    name: 'Gold',
    price: '₹1699',
    description: 'Enjoy a premium experience with added comfort',
    features: ['Everything in General', 'Priority seating', 'Networking lounge access', 'Exclusive merch bundle'],
    featured: true,
    tag: 'Recommended',
  },
  {
    name: 'Platinum',
    price: '₹2099',
    description: 'The ultimate experience for VIP attendees',
    features: ['Everything in Gold', 'Front-row seating', 'Meet & greet access', 'VIP refreshments'],
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
            <a href="#contact" className={ticket.featured ? 'btn-primary ticket-btn' : 'btn-outline ticket-btn'}>
              Get {ticket.name} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}