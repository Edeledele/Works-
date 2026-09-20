import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useBookings } from "../context/BookingsContext";
import { validateCheckout } from "../checkout/validate";
import Field from "../checkout/Field";

const EMPTY_FIELDS = {
  fullName: "",
  email: "",
  phone: "",
  pickupDate: "",
  returnDate: "",
};

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useBookings();

  const car = location.state?.car;

  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // No car was passed in (e.g. direct URL visit) — send the user to browse.
  if (!car) {
    return <Navigate to="/cars" replace />;
  }

  const errors = validateCheckout(fields);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      pickupDate: true,
      returnDate: true,
    });

    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      // Simulated network delay, like a real booking submission.
      await new Promise((resolve) => setTimeout(resolve, 500));

      addBooking({
        carId: car.id,
        make: car.make,
        model: car.model,
        pricePerDay: car.pricePerDay,
        ...fields,
      });

      navigate("/bookings");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="checkout">
      <Link to={`/cars/${car.id}`} className="back-link">
        &larr; Back to {car.make} {car.model}
      </Link>

      <h1>Confirm your booking</h1>
      <p className="checkout-summary">
        {car.make} {car.model} ({car.year}) &mdash; {car.pricePerDay} ETB/day
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <Field
          label="Full name"
          name="fullName"
          value={fields.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fullName ? errors.fullName : undefined}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : undefined}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          value={fields.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone ? errors.phone : undefined}
        />
        <Field
          label="Pick-up date"
          name="pickupDate"
          type="date"
          value={fields.pickupDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.pickupDate ? errors.pickupDate : undefined}
        />
        <Field
          label="Return date"
          name="returnDate"
          type="date"
          value={fields.returnDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.returnDate ? errors.returnDate : undefined}
        />

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Booking…" : "Confirm booking"}
        </button>
      </form>
    </section>
  );
}
