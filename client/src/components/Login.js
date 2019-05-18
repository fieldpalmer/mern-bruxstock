import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 m-auto">
          <Link to="/home">
            <i className="fas fa-arrow-left" />
            &nbsp;Back
          </Link>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-md-5 m-auto">
          <div className="card card-body">
            <div className="card-header">
              <h1 className="text-center">Login</h1>
            </div>
            <br />
            <form action="/users/login" method="POST">
              <div className="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
            <p className="lead mt-4 text-center">
              No Account? <a href="/users/register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
