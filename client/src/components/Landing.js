import React from "react";
import { Link } from "react-router-dom";
// import Home from "./Home";
import logo from "../../src/cormorant.png";

export default function Landing() {
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: "#000000" }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>NEW BRUXSTOCK COMING IN HOT</code>
        </p>
        <a
          className="App-link"
          href="https://bruxstock.herokuapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          view old site
        </a>
        <Link to="/home">check on progress</Link>
      </header>
    </div>
  );
}
