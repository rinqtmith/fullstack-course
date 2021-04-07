const Filter = ({ filtered, handleFilterChange }) => (
  <div>
    filter shown with <input value={filtered} onChange={handleFilterChange} />
  </div>
);

export default Filter;
