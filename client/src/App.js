import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AppNavbar from "./components/common/AppNavbar";
import Landing from "./components/landing/Landing";
import Gallery from "./components/gallery/Gallery";
import Portfolio from "./components/portfolio/Portfolio";
import Dashboard from "./components/manage/Dashboard";
import Upload from "./components/manage/Upload";
import ViewItem from "./components/item/ViewItem";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/common/Footer";
import PrivateRoute from "./components/private-route/PrivateRoute";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import bgImg from "./img/cartographer.png";
import Decision from "./components/decision/Decision";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div
          className="App"
          style={{ backgroundImage: `url(${bgImg})`, height: "100vh" }}
        >
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/decision" component={Decision} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/upload" component={Upload} />
              <Route path="/portfolio/:userid" component={Portfolio} />
              <Route path="/view/:filename" component={ViewItem} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
