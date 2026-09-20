export default function AboutUs() {
  return (
    <section className="cars-page">
      <h1>About RentWise</h1>
      <p className="page-lede">
        RentWise started as a school capstone project with a simple goal: make renting a car in
        Addis Ababa as easy as booking a taxi.
      </p>

      <div className="service-grid" style={{ marginTop: "2rem" }}>
        <div className="service-card">
          <h3>Our story</h3>
          <p>
            We built RentWise to fix the friction of renting a car locally — confusing pricing,
            slow replies, and no way to see the fleet before showing up. Vehicle data is pulled
            live from the NHTSA vPIC API.
          </p>
        </div>
        <div className="service-card">
          <h3>What we stand for</h3>
          <p>
            Honest listings, upfront pricing, and a booking flow you can finish in a couple of
            minutes without calling anyone.
          </p>
        </div>
        <div className="service-card">
          <h3>Where we operate</h3>
          <p>
            Pickup points across Bole, Piassa, Kazanchis and Sarbet, with more neighborhoods on
            the way as the fleet grows.
          </p>
        </div>
      </div>
    </section>
  );
}
