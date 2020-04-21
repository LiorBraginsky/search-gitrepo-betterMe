import React from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import List from "./components/List/List";
import Pagination from "./components/Pagination/Pagination";

export default function App() {
  return (
    <div className="container">
      <SearchBar />
      <Pagination />
      <List />
    </div>
  );
}
