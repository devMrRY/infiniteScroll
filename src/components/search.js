import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Search = React.memo(({ getSearchKeyword }) => {
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const timeOut = setTimeout(() => {
      getSearchKeyword(searchInput);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [searchInput, getSearchKeyword]);

  return (
    <div id="searchBox">
      <input
        id="searchBar"
        placeholder="Search..."
        onChange={e => setSearchInput(e.target.value)}
      />
      <button id="searchBtn">
        <IoIosSearch />
      </button>
    </div>
  );
});

export default Search;