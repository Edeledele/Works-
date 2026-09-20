export default function Contact() {
  return (
    <section className="cars-page">
      <h1>Contact us</h1>
      <p className="page-lede">
        Questions about a booking, a car, or a test drive? Reach out and we'll get back to you.
      </p>

      <div className="service-grid" style={{ marginTop: "2rem" }}>
        <div className="service-card">
          <h3>Phone</h3>
          <p>+251 11 555 0142
            <br />
            Mon–Sat, 8:00–19:00
          </p>
        </div>
        <div className="service-card">
          <h3>Email</h3>
          <p>hello@rentwise.example</p>
        </div>
        <div className="service-card">
          <h3>Visit</h3>
          <p>Bole Road, Addis Ababa — with pickup points also in Piassa, Kazanchis and Sarbet.</p>
        </div>
      </div>
    </section>
  );
}
