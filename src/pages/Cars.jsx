import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCars } from "../api/cars";
import { useFetch } from "../hooks/useFetch";
import CarCard from "../cars/CarCard";
import MakeFilter from "../cars/MakeFilter";
import Spinner from "../ui/Spinner";
import EmptyState from "../ui/EmptyState";

export default function Cars() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMake = searchParams.get("make") || "";

  const { data: cars, status, error } = useFetch((signal) => fetchCars({ signal }), []);

  const makes = useMemo(() => {
    if (!cars) return [];
    return [...new Set(cars.map((c) => c.make))].sort();
  }, [cars]);

  const filteredCars = useMemo(() => {
    if (!cars) return [];
    if (!selectedMake) return cars;
    return cars.filter((c) => c.make === selectedMake);
  }, [cars, selectedMake]);

  function handleSelectMake(make) {
    if (make) {
      setSearchParams({ make });
    } else {
      setSearchParams({});
    }
  }

  if (status === "loading") {
    return <Spinner label="Loading available cars…" />;
  }

  if (status === "error") {
    return (
      <EmptyState
        title="We couldn't load the fleet"
        hint={error || "Please check your connection and try again."}
      />
    );
  }

  return (
    <section className="cars-page">
      <h1 style={{ padding: 0 }}>Available cars</h1>
      <MakeFilter makes={makes} selected={selectedMake} onSelect={handleSelectMake} />

      {filteredCars.length === 0 ? (
        <EmptyState
          title="No cars match that filter"
          hint="Try a different make, or clear the filter to see the whole fleet."
        />
      ) : (
        <div className="car-grid">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
