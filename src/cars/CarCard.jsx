import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <article className={`car-card ${!car.available ? "car-card-unavailable" : ""}`}>
      <div className="car-photo-wrap">
        <img src={car.photo} alt={`${car.make} ${car.model}`} loading="lazy" />
        {!car.available && <span className="badge badge-unavailable">Unavailable</span>}
      </div>

      <div className="car-card-body">
        <div className="car-card-top">
          <h3>
            {car.make} {car.model}
          </h3>
          <span className="car-year">{car.year}</span>
        </div>

        <ul className="car-specs">
          <li>{car.bodyType}</li>
          <li>{car.seats} seats</li>
          <li>{car.transmission}</li>
          <li>{car.location}</li>
        </ul>

        <div className="car-card-bottom">
          <span className="car-price">
            {car.pricePerDay.toLocaleString()} <small>ETB/day</small>
          </span>
          {car.available && (
            <Link className="btn btn-primary" to={`/cars/${car.id}`}>
              View details
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
