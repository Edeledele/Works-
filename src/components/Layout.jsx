import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingsContext";

export default function Layout() {
  const { user, isSignedIn, signOut } = useAuth();
  const { bookings } = useBookings();

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand">
          <span className="brand-mark">R</span> RentWise
        </NavLink>

        <nav className="main-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/cars">Inventory</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="header-actions">
          <NavLink to="/bookings" className="header-link">
            Bookings ({bookings.length})
          </NavLink>

          {isSignedIn ? (
            <button className="header-link header-link--btn" onClick={signOut}>
              Sign out, {user.name}
            </button>
          ) : (
            <NavLink to="/sign-in" className="header-link">
              Sign in
            </NavLink>
          )}

          <NavLink to="/cars" className="btn btn-test-drive">
            Book a Test Drive
          </NavLink>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>RentWise &mdash; a school capstone project. Vehicle data from the NHTSA vPIC API.</p>
      </footer>
    </div>
  );
}
