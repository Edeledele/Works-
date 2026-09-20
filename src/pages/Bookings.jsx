import { useBookings } from "../context/BookingsContext";
import EmptyState from "../ui/EmptyState";

export default function Bookings() {
  const { bookings, cancelBooking } = useBookings();

  if (bookings.length === 0) {
    return (
      <EmptyState
        title="No bookings yet"
        hint="Browse the fleet and book a car to see it here."
      />
    );
  }

  return (
    <section>
      <h1>My bookings</h1>
      <ul className="booking-list">
        {bookings.map((b) => (
          <li key={b.id} className="booking-item">
            <div>
              <strong>
                {b.make} {b.model}
              </strong>
              <p>
                {b.pickupDate} &rarr; {b.returnDate}
              </p>
              <p>{b.pricePerDay} ETB/day</p>
            </div>
            <button className="btn btn-secondary" onClick={() => cancelBooking(b.id)}>
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
