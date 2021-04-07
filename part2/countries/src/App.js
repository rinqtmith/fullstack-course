import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Content from "./components/Content";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFiltered(event.target.value);
  };

  const handleShowButton = (show) => {
    setFiltered(show);
  };

  let filteredCountries = filtered
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(filtered.toLowerCase())
      )
    : countries;

  return (
    <>
      <Filter filtered={filtered} handleFilterChange={handleFilterChange} />

      <Content
        filteredCountries={filteredCountries}
        handleShowButton={handleShowButton}
      />
    </>
  );
};

export default App;
