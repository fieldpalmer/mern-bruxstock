import React, { Component } from "react";
// import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";

// import logo from "./logo.svg";
import "./App.css";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Register from "./components/Register";
import Login from "./components/Login";

class App extends Component {
  state = {
    auth: {
      user: "userObj",
      isAuthenticated: Boolean
    },
    art: [{}]
  };

  render() {
    return (
      <div>
        <nav class="navbar navbar-default navbar-static-top">
          <div class="container">
            <h3>Bruxstock</h3>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
