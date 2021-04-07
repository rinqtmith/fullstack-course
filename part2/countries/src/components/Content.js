import Country from "./Country";

const Content = ({ filteredCountries, handleShowButton }) => {
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length !== 1) {
    return (
      <>
        {filteredCountries.map((country) => (
          <div key={country.name}>
            {country.name}
            <button onClick={() => handleShowButton(country.name)}>show</button>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <div>
        <Country country={filteredCountries[0]} />
      </div>
    );
  }
};

export default Content;
