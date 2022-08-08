import React from "react";
import Carrousel from "../components/carrousel/Carrousel";
import Header from "../components/general-components/Header";
import NavBar from "../components/general-components/NavBar";
import SearchBar from "../components/general-components/SearchBar";
export default function NewHome() {
  return (
    <div>
      <Header />
      <SearchBar />
      <NavBar />
      <Carrousel />
    </div>
  );
}
