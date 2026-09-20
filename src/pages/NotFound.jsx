import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="empty-state">
      <p className="empty-title">Page not found</p>
      <p className="empty-hint">
        That page doesn't exist. <Link to="/">Go back home</Link>.
      </p>
    </section>
  );
}
