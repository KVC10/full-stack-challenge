import { useState } from "react";
import CountryItem from "./CountryItem";

const Countries = ({ count, setCount, countries, search }) => {
  const filter = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  const handleShow = (name) => {
    const item = filter.find((el) => el.name.common === name);
    setCount(item);
  };

  if (search === "") return null;

  if (filter.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (count) {
    return <CountryItem country={count} />;
  }

  if (filter.length === 1) {
    return <CountryItem country={filter[0]} />;
  }

  return (
    <div>
      {filter.map((country) => (
        <div key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => handleShow(country.name.common)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
