// api/cars.js
// Real vehicle make/model data comes from the free, keyless NHTSA vPIC API.
// Rental-specific data (price, availability, photos) doesn't exist as a free
// public API, so it's generated deterministically from the real model data.
const VPIC_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";

const FLEET_MAKES = ["Toyota", "Honda", "Hyundai", "Kia", "Volkswagen", "Ford"];

const BODY_TYPES = ["Sedan", "SUV", "Hatchback", "Pickup"];

// One representative photo per body type (Unsplash, free license, hotlinked
// via their CDN — no key required). Every car of a given body type shares
// its photo, the way a rental site reuses a stock shot per trim level.
const BODY_TYPE_PHOTOS = {
  Sedan: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d",
  SUV: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb",
  Hatchback: "https://images.unsplash.com/photo-1760688964699-756df18ed485",
  Pickup: "https://images.unsplash.com/photo-1512044712301-ec93bcdef698",
};

export function photoFor(bodyType, width = 600) {
  const base = BODY_TYPE_PHOTOS[bodyType] || BODY_TYPE_PHOTOS.Sedan;
  return `${base}?auto=format&fit=crop&w=${width}&q=80`;
}

// Simple deterministic "random" so the same car always gets the same
// price/seats/availability across renders and reloads (no backend needed).
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function buildCarFromModel(make, model, index) {
  const seed = hashString(`${make}-${model}-${index}`);
  const bodyType = BODY_TYPES[Math.floor(seededRandom(seed) * BODY_TYPES.length)];
  const pricePerDay = 800 + Math.floor(seededRandom(seed + 1) * 22) * 100; // 800 - 3000 ETB
  const seats = [2, 4, 5, 5, 5, 7][Math.floor(seededRandom(seed + 2) * 6)];
  const year = 2019 + Math.floor(seededRandom(seed + 3) * 6);
  const available = seededRandom(seed + 4) > 0.2; // ~80% available

  return {
    id: `${make}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    make,
    model,
    year,
    bodyType,
    seats,
    pricePerDay,
    available,
    transmission: seededRandom(seed + 5) > 0.5 ? "Automatic" : "Manual",
    location: ["Bole", "Piassa", "Kazanchis", "Sarbet"][Math.floor(seededRandom(seed + 6) * 4)],
    photo: photoFor(bodyType),
  };
}

/**
 * Fetches real model names for a handful of fleet makes from NHTSA's public
 * vPIC API, then builds a mock rental inventory on top of them.
 * Accepts an AbortSignal so callers can cancel on unmount (cleanup).
 */
export async function fetchCars({ signal } = {}) {
  const requests = FLEET_MAKES.map((make) =>
    fetch(`${VPIC_BASE}/GetModelsForMake/${encodeURIComponent(make)}?format=json`, { signal }).then(
      (res) => {
        if (!res.ok) throw new Error(`Failed to load models for ${make}`);
        return res.json();
      }
    )
  );

  const results = await Promise.all(requests);

  const cars = [];
  results.forEach((result, makeIndex) => {
    const make = FLEET_MAKES[makeIndex];
    const models = (result.Results || [])
      .map((r) => r.Model_Name)
      .filter(Boolean);

    // dedupe + take a handful per make so the fleet stays a reasonable size
    const uniqueModels = [...new Set(models)].slice(0, 6);

    uniqueModels.forEach((model, i) => {
      cars.push(buildCarFromModel(make, model, i));
    });
  });

  return cars;
}

export async function fetchCarById(id, opts) {
  const cars = await fetchCars(opts);
  const car = cars.find((c) => c.id === id);
  if (!car) throw new Error("Car not found");
  return car;
}
