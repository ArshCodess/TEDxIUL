import './Contact.css';

export default function Contact({ hideHeader = false }) {
  return (
    <section id="contact">
      <div className="contact-inner">
        <div>
          {!hideHeader && (
            <>
              <p className="section-label fade-in">Say Hello</p>
              <h2 className="contact-heading fade-in">Get In <span className="accent">Touch</span></h2>
              <p className="contact-sub fade-in">Have a question or want to collaborate? Send us a message.</p>
            </>
          )}
          <div className="form-row">
            <div className="ff">
              <label>Full Name</label>
              <input type="text" placeholder="Your full name" />
            </div>
            <div className="ff">
              <label>Email Address</label>
              <input type="email" placeholder="you@email.com" />
            </div>
          </div>
          <div className="ff">
            <label>Subject</label>
            <input type="text" placeholder="What's this about?" />
          </div>
          <div className="ff">
            <label>Message</label>
            <textarea rows="5" placeholder="Your message..."></textarea>
          </div>
          <button className="btn-primary contact-submit">Send Message →</button>
        </div>
        <div className="contact-info-col fade-in">
          <div className="cd-row">
            <div className="cd-icon">✉</div>
            <div>
              <div className="cd-lbl2">Email Us</div>
              <div className="cd-val">tedxiul@gmail.com</div>
            </div>
          </div>
          <div className="cd-row">
            <div className="cd-icon">📍</div>
            <div>
              <div className="cd-lbl2">Find Us</div>
              <div className="cd-val">Integral University, Dasauli,<br />Kursi Road, Lucknow – 226026</div>
            </div>
          </div>
          <div className="cd-row">
            <div className="cd-icon">📞</div>
            <div>
              <div className="cd-lbl2">Call Us</div>
              <div className="cd-val">+91 XXXXX XXXXX</div>
            </div>
          </div>
          <div className="socials">
            <a className="soc-btn" href="https://www.instagram.com/tedxiul/" target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a className="soc-btn" href="https://linkedin.com/company/tedxintegraluniversity" target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}