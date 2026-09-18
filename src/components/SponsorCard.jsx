import './SponsorCard.css';

export default function SponsorCard({ sponsor }) {
  return (
    <article className="sponsor-card-item">
      {/* Logo section */}
      <div className="sc-logo-wrap">
        <img
          src={sponsor.logo.src || sponsor.logo}
          alt={sponsor.name}
          className="sc-logo-img"
        />
      </div>

      {/* Text section */}
      <div className="sc-body">
        <h3 className="sc-name">{sponsor.name}</h3>
        <p className="sc-desc">{sponsor.description}</p>
      </div>
    </article>
  );
}
