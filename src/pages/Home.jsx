import { Link } from "react-router-dom";
import { fetchCars } from "../api/cars";
import { useFetch } from "../hooks/useFetch";
import CarCard from "../cars/CarCard";
import Spinner from "../ui/Spinner";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1740263828929-7f539c755936?auto=format&fit=crop&w=1600&q=80";

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
];

export default function Home() {
  const { data: cars, status } = useFetch((signal) => fetchCars({ signal }), []);
  const featured = cars ? cars.slice(0, 3) : [];

  return (
    <div>
      <section className="hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">Rent smarter, drive sooner</p>
          <h1>
            Your next car
            <br />
            <span className="hero-accent">is already parked.</span>
          </h1>
          <p className="hero-body">
            Browse a fleet of well-kept cars across Addis Ababa, pick your dates,
            and book in under two minutes.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-gold" to="/cars">
              Browse the fleet
            </Link>
            <Link className="btn btn-ghost" to="/bookings">
              My bookings
            </Link>
          </div>

          <dl className="hero-stats">
            <div>
              <dt>35+</dt>
              <dd>Cars in the fleet</dd>
            </div>
            <div>
              <dt>6</dt>
              <dd>Makes to choose from</dd>
            </div>
            <div>
              <dt>4</dt>
              <dd>Pickup points in the city</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="services">
        <p className="section-eyebrow">Why RentWise</p>
        <h2>Renting a car shouldn't feel like a negotiation.</h2>
        <div className="service-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="featured">
        <div className="featured-header">
          <div>
            <p className="section-eyebrow">Ready to book</p>
            <h2>Featured cars</h2>
          </div>
          <Link to="/cars" className="text-link">
            View full fleet &rarr;
          </Link>
        </div>

        {status === "loading" && <Spinner label="Loading featured cars…" />}

        {status === "success" && (
          <div className="car-grid">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
