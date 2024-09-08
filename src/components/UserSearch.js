import React, { useState } from "react";
import SearchButton from "./SearchButton";

function UserSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Очищаем ошибку при изменении значения
    if (value === "") {
      onSearch("");
    }
  };

  const handleReset = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="container-search">
      <input
        className="input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by username..."
      />
      <SearchButton query={query} onReset={handleReset} />
    </form>
  );
}

export default UserSearch;
