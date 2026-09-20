import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchCarById } from "../api/cars";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../ui/Spinner";
import EmptyState from "../ui/EmptyState";

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: car, status, error } = useFetch(
    (signal) => fetchCarById(id, { signal }),
    [id]
  );

  if (status === "loading") return <Spinner label="Loading this car…" />;

  if (status === "error") {
    return (
      <EmptyState
        title="We couldn't find that car"
        hint={error || "It may have been removed from the fleet."}
      />
    );
  }

  return (
    <section className="car-detail">
      <Link to="/cars" className="back-link">
        &larr; Back to all cars
      </Link>

      <div className="car-detail-photo">
        <img src={car.photo.replace("w=600", "w=1200")} alt={`${car.make} ${car.model}`} />
      </div>

      <h1>
        {car.make} {car.model} <span className="car-year">({car.year})</span>
      </h1>

      <dl className="spec-list">
        <div>
          <dt>Body type</dt>
          <dd>{car.bodyType}</dd>
        </div>
        <div>
          <dt>Seats</dt>
          <dd>{car.seats}</dd>
        </div>
        <div>
          <dt>Transmission</dt>
          <dd>{car.transmission}</dd>
        </div>
        <div>
          <dt>Pickup location</dt>
          <dd>{car.location}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>{car.pricePerDay} ETB/day</dd>
        </div>
      </dl>

      {car.available ? (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/checkout", { state: { car } })}
        >
          Book this car
        </button>
      ) : (
        <p className="badge badge-unavailable">Currently unavailable</p>
      )}
    </section>
  );
}
