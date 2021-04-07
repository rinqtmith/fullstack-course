import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios(
      `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
    ).then((response) => {
      setWeather(response.data);
    });
  }, [country.capital]);

  if (weather) {
    return (
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="flag" width="200px" height="100%" />
        <h2>Weather in {country.capital}</h2>
        <div>
          <b>temperature: </b> {weather.current.temperature}
        </div>
        <img
          src={weather.current.weather_icons}
          alt="flag"
          width="100px"
          height="100%"
        />
        <div>
          <b>wind: </b> {weather.current.wind_speed} kph direction{" "}
          {weather.current.wind_dir}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Country;
