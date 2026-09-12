import { useState, useEffect } from "react";
import Search from "./components/Search";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [countryArr, setCountryArr] = useState([]);
  const [count, setCount] = useState(null);

  useEffect(() => {
    function getAll() {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((res) => {
          console.log(res.data);
          setCountryArr(res.data);
        });
    }

    getAll();
  }, []);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        count={count}
        setCount={setCount}
      />
      <Countries
        countries={countryArr}
        search={search}
        count={count}
        setCount={setCount}
      />
    </div>
  );
};

export default App;
