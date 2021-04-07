const Filter = ({ filtered, handleFilterChange }) => (
  <div>
    find countries <input value={filtered} onChange={handleFilterChange} />
  </div>
);

export default Filter;
