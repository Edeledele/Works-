import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import RequireAuth from "./context/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import { BookingsProvider } from "./context/BookingsContext";
import Spinner from "./ui/Spinner";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import Bookings from "./pages/Bookings";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

// Checkout is code-split from the initial bundle — most visitors browsing
// the fleet never reach it, so it's only downloaded when they book.
const Checkout = lazy(() => import("./pages/Checkout"));

export default function App() {
  return (
    <AuthProvider>
      <BookingsProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="cars" element={<Cars />} />
              <Route path="cars/:id" element={<CarDetail />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route
                path="bookings"
                element={
                  <RequireAuth>
                    <Bookings />
                  </RequireAuth>
                }
              />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Suspense fallback={<Spinner label="Loading checkout…" />}>
                      <Checkout />
                    </Suspense>
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BookingsProvider>
    </AuthProvider>
  );
}
