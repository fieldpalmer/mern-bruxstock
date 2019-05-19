import React, { Component } from "react";
// import { Router } from "react-router";
import { Route, Switch, Link } from "react-router-dom";

// import logo from "./logo.svg";
import "./App.css";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Register from "./components/Register";
import Login from "./components/Login";
import Manager from "./components/Manager";

class App extends Component {
  // state = {
  //   auth: {
  //     user: "userObj",
  //     isAuthenticated: Boolean
  //   },
  //   art: [{}]
  // };

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Bruxstock
            </Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/manager">Manager</Link>
            <Link to="/Home">Login</Link>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/manager" component={Manager} />
        </Switch>
      </div>
    );
  }
}

export default App;
