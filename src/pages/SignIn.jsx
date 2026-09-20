import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [name, setName] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/bookings";

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    signIn(name.trim());
    navigate(from, { replace: true });
  }

  return (
    <section className="sign-in">
      <h1>Sign in</h1>
      <p>This is a mock sign-in for the capstone demo &mdash; any name works.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Abel Tesfaye"
          required
        />
        <button className="btn btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </section>
  );
}
