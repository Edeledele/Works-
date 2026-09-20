import { Link } from "react-router-dom";

const SERVICES = [
  {
    title: "Verified fleet",
    body: "Every car is inspected before it's listed, so the photo matches what shows up.",
  },
  {
    title: "Transparent pricing",
    body: "The price per day you see is the price you pay — no surprise fees at pickup.",
  },
  {
    title: "Flexible dates",
    body: "Change your pick-up or return date from your bookings page, any time.",
  },
  {
    title: "Local support",
    body: "Pickup points across Bole, Piassa, Kazanchis and Sarbet, with a real person to call.",
  },
  {
    title: "Test drives",
    body: "Book a test drive on any car in the fleet before you commit to a rental.",
  },
  {
    title: "Roadside assistance",
    body: "Every rental includes 24/7 roadside support for the length of your booking.",
  },
];

export default function Services() {
  return (
    <section className="cars-page">
      <h1>Our services</h1>
      <p className="page-lede">
        Everything we offer to make renting a car simple, from booking to the day you return the keys.
      </p>

      <div className="service-grid" style={{ marginTop: "2rem" }}>
        {SERVICES.map((s) => (
          <div className="service-card" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <div className="hero-actions" style={{ marginTop: "2.5rem" }}>
        <Link className="btn btn-gold" to="/cars">
          Book a test drive
        </Link>
      </div>
    </section>
  );
}
