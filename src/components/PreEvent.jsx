import './PreEvent.css';
import '../views/pages.css';

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
    <section id="preevent" className="pre-events-section">
      <p className="section-label">Before Event Day</p>

      <h2 className="section-title">
        PRE-<span className="accent">EVENTS</span>
      </h2>

      <div className="pre-events-list ">

        <div className="pre-event-item aos-animate" data-aos="fade-up">
          <div>
            <div className="pre-event-date">7 SEP</div>
            <div className="pre-event-info">10:30 am</div>
          </div>
          <div className="pre-event-info">
            <h3>Traitor's Game</h3>
            <p className="pre-event-date">&#40;CSE Seminar Hall&#41;</p>
          </div>
        </div>

        <div className="pre-event-item aos-animate" data-aos="fade-up">
          <div>
            <div className="pre-event-date">17 SEP</div>
            <div className="pre-event-info">10:30 am</div>
          </div>
          <div className="pre-event-info">
            <h3>Banner Reveal</h3>
            <p className="pre-event-date">&#40;Front of Central Auditorium&#41;</p>
          </div>
        </div>

        <div className="pre-event-item aos-animate" data-aos="fade-up">
          <div>
            <div className="pre-event-date">17 SEP</div>
            <div className="pre-event-info">11:00 am</div>
          </div>
          <div className="pre-event-info">
            <h3>Influencers Meet</h3>
            <p className="pre-event-date">&#40;Central Auditorium &#41;</p>
          </div>
        </div>
        <div className="pre-event-item aos-animate" data-aos="fade-up">
          <div>
            <div className="pre-event-date">18 SEP</div>
            <div className="pre-event-info">10:00 am</div>
          </div>
          <div className="pre-event-info">
            <h3>Gamers Meet</h3>
            <p className="pre-event-date">&#40;CSE Seminar Hall&#41;</p>
          </div>
        </div>
      </div>
    </section>
  );
}
