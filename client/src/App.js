import React from "react";
import logo from "./cormorant.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        <br />
        <a
          className="App-link"
          href="https://bruxstock.herokuapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          login
        </a>
      </header>
    </div>
  );
}

export default App;
