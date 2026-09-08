"use client";
import { useEffect, useRef, useState } from 'react';
import './Schedule.css';

const LED_STRIP_COUNT = 45;

const SCHEDULE_DATA = [
  { time: '09:00 AM', name: 'Registration Opens', desc: 'Registration and attendee check-in.', tag: 'Registration' },
  { time: '10:00 AM', name: 'Welcome Address', desc: 'Welcome address marking the beginning of TEDx Integral University.', tag: 'Opening' },
  { time: '10:10 AM', name: 'Opening Performance', desc: 'Opening performance by the Outreach team.', tag: 'Performance' },
  { time: '10:20 AM', name: 'Speaker 1', desc: 'TEDx talk.', tag: 'Talk' },
  { time: '10:40 AM', name: 'Speaker 2', desc: 'TEDx talk.', tag: 'Talk' },
  { time: '11:00 AM', name: 'Speaker 3', desc: 'TEDx talk.', tag: 'Talk' },
  { time: '11:20 AM', name: 'Performer 1', desc: 'Live performance.', tag: 'Performance' },
  { time: '11:40 AM', name: 'Speaker 4', desc: 'TEDx talk.', tag: 'Talk' },
  { time: '12:00 PM', name: 'Speaker 5', desc: 'TEDx talk.', tag: 'Talk' },
  { time: '12:20 PM', name: 'Speaker 6', desc: 'TEDx talk.', tag: 'Talk' },
  { time: '12:40 PM', name: 'Performer 2', desc: 'Live performance.', tag: 'Performance' },
  { time: '1:00 PM', name: 'Break', desc: 'Refreshments and networking.', tag: 'Break' },
  { time: '1:20 PM', name: 'Speaker 7', desc: 'TEDx talk.', tag: 'Talk' },
  { time: '1:40 PM', name: 'Speaker 8', desc: 'TEDx talk.', tag: 'Talk' },
  { time: '2:00 PM', name: 'Speaker 9', desc: 'TEDx talk.', tag: 'Talk' },
  { time: '2:20 PM', name: 'Speaker 10', desc: 'TEDx talk.', tag: 'Talk' },
  { time: '2:20 PM', name: 'Performer 3', desc: 'Live performance.', tag: 'Performance' },
  { time: 'Closing', name: 'Closing Ceremony', desc: 'Closing ceremony marking the end of the event.', tag: 'Closing' },
  { time: 'Final', name: 'Vote of Thanks', desc: 'Vote of thanks by the organizing committee core team.', tag: 'Closing' }
];

const ScheduleCard = ({ time, name, desc, tag, isLast }) => {
  const cardRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        // For the last card, we increase the bottom margin so it triggers earlier
        // because it might not be able to scroll up high enough if it's near the page bottom.
        rootMargin: isLast ? '-20% 0px 0px 0px' : '-20% 0px -50% 0px',
        threshold: 0
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLast]);

  return (
    <div 
      className={`tl-item schedule-card ${isActive ? 'schedule-card--active' : ''}`} 
      tabIndex={0} 
      ref={cardRef}
    >
      <div className="schedule-card-content">
        <div className="tl-time">{time}</div>
        <div className="tl-name schedule-card-title">{name}</div>
        <div className="tl-desc">{desc}</div>
        <span className="tl-tag">{tag}</span>
      </div>
    </div>
  );
};

export default function Schedule({ hideHeader = false }) {
  const timelineRef = useRef(null);
  const [activeStrips, setActiveStrips] = useState(0);

  useEffect(() => {
    let animationFrame;

    const updateProgress = () => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      const bounds = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startLine = viewportHeight * 0.72;
      const endLine = viewportHeight * 0.28;
      
      const idealTravelDistance = Math.max(bounds.height + startLine - endLine, 1);
      const scrolledDistance = startLine - bounds.top;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const maxScrollTop = Math.max(0, scrollHeight - viewportHeight);
      const remainingScroll = Math.max(0, maxScrollTop - scrollTop);
      
      const maxScrolledDistance = scrolledDistance + remainingScroll;
      const travelDistance = Math.max(1, Math.min(idealTravelDistance, maxScrolledDistance));
      
      const rawProgress = scrolledDistance / travelDistance;
      const progress = Math.min(1, Math.max(0, rawProgress));
      
      const activeCount = progress >= 1 ? LED_STRIP_COUNT : Math.ceil(progress * LED_STRIP_COUNT);
      setActiveStrips(activeCount);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="schedule">
      {!hideHeader && (
        <>
          <p className="section-label fade-in">Event Schedule</p>
          <h2 className="section-title fade-in">THE <span className="accent">DAY</span></h2>
        </>
      )}
      <div className="schedule-timeline-layout">
        <aside className="schedule-progress" aria-label="Schedule scroll progress">
          <div className="schedule-progress-sticky" aria-hidden="true">
            {Array.from({ length: LED_STRIP_COUNT }, (_, index) => (
              <span
                className={`schedule-led-strip${index < activeStrips ? ' active' : ''}`}
                key={index}
              />
            ))}
          </div>
        </aside>
        <div className="timeline" ref={timelineRef}>
          {SCHEDULE_DATA.map((event, index) => (
            <ScheduleCard 
              key={index} 
              time={event.time} 
              name={event.name} 
              desc={event.desc} 
              tag={event.tag}
              isLast={index === SCHEDULE_DATA.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
