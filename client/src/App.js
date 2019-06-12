import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar";
import Landing from "./components/Landing";
// import Home from "./components/Home";
import Gallery from "./components/gallery/Gallery";
import Manager from "./components/Manager";
import store from "./store";

// check for auth token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // store.dispatch(getCurrentProfile());

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // clear profile
    // store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="container-fluid">
            <AppNavbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/gallery" component={Gallery} />
              <Route path="/manager" component={Manager} />
            </Switch>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
