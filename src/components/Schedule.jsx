"use client";
import { useEffect, useRef, useState } from 'react';
import './Schedule.css';

const LED_STRIP_COUNT = 45;

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
      
      // Maximum distance this timeline can scroll relative to the viewport
      const maxScrolledDistance = scrolledDistance + remainingScroll;
      
      // Distribute progress over whichever distance is shorter to ensure smooth completion
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

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">09:00 AM</div>
    <div className="tl-name">Registration Opens</div>
    <div className="tl-desc">Registration and attendee check-in.</div>
    <span className="tl-tag">Registration</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">10:00 AM</div>
    <div className="tl-name">Welcome Address</div>
    <div className="tl-desc">Welcome address marking the beginning of TEDx Integral University.</div>
    <span className="tl-tag">Opening</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">10:10 AM</div>
    <div className="tl-name">Opening Performance</div>
    <div className="tl-desc">Opening performance by the Outreach team.</div>
    <span className="tl-tag">Performance</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">10:20 AM</div>
    <div className="tl-name">Speaker 1</div>
    <div className="tl-desc">TEDx talk.</div>
    <span className="tl-tag">Talk</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">10:40 AM</div>
    <div className="tl-name">Speaker 2</div>
    <div className="tl-desc">TEDx talk.</div>
    <span className="tl-tag">Talk</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">11:00 AM</div>
    <div className="tl-name">Speaker 3</div>
    <div className="tl-desc">TEDx talk.</div>
    <span className="tl-tag">Talk</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">11:20 AM</div>
    <div className="tl-name">Performer 1</div>
    <div className="tl-desc">Live performance.</div>
    <span className="tl-tag">Performance</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">11:40 AM</div>
    <div className="tl-name">Speaker 4</div>
    <div className="tl-desc">TEDx talk.</div>
    <span className="tl-tag">Talk</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">12:00 PM</div>
    <div className="tl-name">Speaker 5</div>
    <div className="tl-desc">TEDx talk.</div>
    <span className="tl-tag">Talk</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">12:20 PM</div>
    <div className="tl-name">Speaker 6</div>
    <div className="tl-desc">TEDx talk.</div>
    <span className="tl-tag">Talk</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">12:40 PM</div>
    <div className="tl-name">Performer 2</div>
    <div className="tl-desc">Live performance.</div>
    <span className="tl-tag">Performance</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">1:00 PM</div>
    <div className="tl-name">Break</div>
    <div className="tl-desc">Refreshments and networking.</div>
    <span className="tl-tag">Break</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">1:20 PM</div>
    <div className="tl-name">Speaker 7</div>
    <div className="tl-desc">TEDx talk.</div>
    <span className="tl-tag">Talk</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">1:40 PM</div>
    <div className="tl-name">Speaker 8</div>
    <div className="tl-desc">TEDx talk.</div>
    <span className="tl-tag">Talk</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">2:00 PM</div>
    <div className="tl-name">Speaker 9</div>
    <div className="tl-desc">TEDx talk.</div>
    <span className="tl-tag">Talk</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">2:20 PM</div>
    <div className="tl-name">Speaker 10</div>
    <div className="tl-desc">TEDx talk.</div>
    <span className="tl-tag">Talk</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">2:20 PM</div>
    <div className="tl-name">Performer 3</div>
    <div className="tl-desc">Live performance.</div>
    <span className="tl-tag">Performance</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">Closing</div>
    <div className="tl-name">Closing Ceremony</div>
    <div className="tl-desc">Closing ceremony marking the end of the event.</div>
    <span className="tl-tag">Closing</span>
  </div>

  <div className="tl-item">
    <div className="tl-dot"></div>
    <div className="tl-time">Final</div>
    <div className="tl-name">Vote of Thanks</div>
    <div className="tl-desc">Vote of thanks by the organizing committee core team.</div>
    <span className="tl-tag">Closing</span>
  </div>

</div>
      </div>
    </section>
  );
}
