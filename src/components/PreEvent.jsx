import './PreEvent.css';

const preEvents = [
  {
    title: 'The Traitor Game',
    date: '7 September 2026',
    time: '10:00 AM onwards',
    venue: 'CSE Seminar Hall',
  },
  {
    title: 'Banner Reveal',
    date: '17 September 2026',
    time: '10:30 AM onwards',
    venue: 'Front of Central Auditorium',
  },
  {
    title: 'Influencers Meet',
    date: '17 September 2026',
    time: '11:00 AM onwards',
    venue: 'Central Auditorium',
  },
  {
    title: 'Gamers Meet',
    date: '18 September 2026',
    time: '10:00 AM onwards',
    venue: 'CSE Seminar Hall',
  },
];

export default function PreEvent() {
  return (
    <section id="pre-event" className="pre-event-section">
      <p className="section-label fade-in">Before The Main Event</p>
      <h2 className="section-title fade-in">PRE <span className="accent">EVENTS</span></h2>
      <p className="pre-event-sub fade-in">Join the moments building up to TEDxIUL</p>
      <div className="pre-event-grid">
        {preEvents.map((event) => (
          <article className="pre-event-card fade-in" key={event.title}>
            <div className="pre-event-card-top">
              <span className="pre-event-index">PRE EVENT</span>
              <span className="pre-event-mark" aria-hidden="true" />
            </div>
            <h3>{event.title}</h3>
            <dl className="pre-event-details">
              <div>
                <dt>Date</dt>
                <dd>{event.date}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{event.time}</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>{event.venue}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
