export default function MakeFilter({ makes, selected, onSelect }) {
  return (
    <div className="make-filter" role="group" aria-label="Filter by make">
      <button
        className={!selected ? "chip chip-active" : "chip"}
        onClick={() => onSelect("")}
      >
        All makes
      </button>
      {makes.map((make) => (
        <button
          key={make}
          className={selected === make ? "chip chip-active" : "chip"}
          onClick={() => onSelect(make)}
        >
          {make}
        </button>
      ))}
    </div>
  );
}
