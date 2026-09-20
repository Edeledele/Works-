import { createContext, useContext, useEffect, useReducer } from "react";

const BookingsContext = createContext(null);
const STORAGE_KEY = "rentwise.bookings";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function bookingsReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.booking];
    case "cancel":
      return state.filter((b) => b.id !== action.id);
    default:
      return state;
  }
}

export function BookingsProvider({ children }) {
  const [bookings, dispatch] = useReducer(bookingsReducer, undefined, loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  function addBooking(booking) {
    dispatch({ type: "add", booking: { ...booking, id: crypto.randomUUID() } });
  }

  function cancelBooking(id) {
    dispatch({ type: "cancel", id });
  }

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error("useBookings must be used inside a BookingsProvider");
  return ctx;
}
