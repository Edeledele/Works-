# RentWise — Car Rental Capstone

A car rental frontend: browse a fleet, filter by make, view a car's detail
page, sign in, and book it through a validated checkout form.

## The problem

Renting a car locally usually means calling around or comparing scattered
listings. RentWise centralizes browsing and booking into one flow.

## The user

Someone who needs a car for a few days and wants to compare price, seats,
and pickup location before booking.

## Screens

| Screen        | Route         | What it does                                         |
|---------------|---------------|-------------------------------------------------------|
| Home          | `/`           | Intro + link into the fleet                            |
| Cars          | `/cars`       | Fetched fleet, filter by make (stored in the URL)       |
| Car Detail    | `/cars/:id`   | One car's specs, "Book this car"                        |
| Sign in       | `/sign-in`    | Mock sign-in (any name)                                 |
| Checkout      | `/checkout`   | Validated booking form — guarded, lazy-loaded            |
| My Bookings   | `/bookings`   | Your bookings, guarded by sign-in                        |

## Data source

Real vehicle makes & models come from the free, keyless
[NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/). Rental-specific data
(price, seats, availability, location) is generated deterministically on
top of that real data, since no free public rental-inventory API exists.

## State design

| State                | Where it lives                                  |
|----------------------|--------------------------------------------------|
| Selected make filter | The URL (`?make=Toyota`) — shareable, survives refresh |
| Fetched cars         | The `Cars` / `CarDetail` components (via `useFetch`)    |
| Bookings             | `BookingsContext` — a `useReducer` store, persisted to `localStorage`, read from multiple screens |
| Signed-in user       | `AuthContext` — rarely changes, needed by the route guard |
| Checkout form fields | The `Checkout` component only                          |

## Running it

```bash
npm install
npm run dev
```

## Requirements checklist (Days 26–34)

- Composed components, props, keys, conditional rendering — `CarCard`,
  `MakeFilter`, `Field`
- Controlled form + state/events — sign-in and checkout forms
- Data fetched in an effect, with cleanup — `useFetch` (AbortController)
- A custom hook + a store — `useFetch`, `BookingsContext`
- Nested routes, a dynamic route, a guarded route — `Layout` + `Outlet`,
  `/cars/:id`, `RequireAuth`
- Validation, an error boundary, one lazy route — `validate.js`,
  `ErrorBoundary`, `lazy(() => import("./pages/Checkout"))`
