"use client";
import { useState, useEffect } from 'react';
import './Countdown.css';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    // Target deadline: 26 September 2026 at 9 AM
    const eventDate = new Date('2026-09-26T09:00:00').getTime();

    function tick() {
      const diff = eventDate - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const pad = n => String(Math.floor(n)).padStart(2, '0');
      setTimeLeft({
        days: pad(diff / 86400000),
        hours: pad((diff % 86400000) / 3600000),
        minutes: pad((diff % 3600000) / 60000),
        seconds: pad((diff % 60000) / 1000),
      });
    }

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown">
      <p className="section-label fade-in">Mark Your Calendar</p>
      <h2 className="section-title fade-in">THE <span className="accent">COUNTDOWN</span></h2>
      <p className="cd-sub fade-in">Something extraordinary is about to happen</p>
      <div className="cd-grid fade-in">
        <div className="cd-item">
          <div className="cd-num" id="days">{timeLeft.days}</div>
          <div className="cd-lbl">Days</div>
        </div>
        <div className="cd-sep">:</div>
        <div className="cd-item">
          <div className="cd-num" id="hours">{timeLeft.hours}</div>
          <div className="cd-lbl">Hours</div>
        </div>
        <div className="cd-sep">:</div>
        <div className="cd-item">
          <div className="cd-num" id="minutes">{timeLeft.minutes}</div>
          <div className="cd-lbl">Minutes</div>
        </div>
        <div className="cd-sep">:</div>
        <div className="cd-item">
          <div className="cd-num" id="seconds">{timeLeft.seconds}</div>
          <div className="cd-lbl">Seconds</div>
        </div>
      </div>
    </section>
  );
}