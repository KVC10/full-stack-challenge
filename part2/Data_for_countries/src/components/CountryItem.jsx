import { useEffect } from "react";
import axios from "axios";

const CountryItem = ({ country }) => {
  useEffect(() => {
    const getWeather = () => {
      const api_key = import.meta.env.VITE_API_KEY;
      axios
        .get(
          `https://api.openweathermap.org/data/4.0/onecall/current?q=${country.capital[0]}&appid=${api_key}`,
        )
        .then((res) => console.log(res.data));
    };

    getWeather();
  }, [country]);
  const language = Object.values(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {language.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default CountryItem;
