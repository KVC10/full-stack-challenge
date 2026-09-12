import React from "react";

const Search = ({ search, setSearch, count, setCount }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (count) {
      setCount(null);
    }
    return;
  };
  return (
    <div>
      find countries <input value={search} onChange={handleChange} />
    </div>
  );
};

export default Search;
