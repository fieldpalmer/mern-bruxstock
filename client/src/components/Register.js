import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
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
      <div className="row">
        <div className="col-md-5 m-auto">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form action="/users/register" method="POST">
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    type="name"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                  />
                </div>
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
                    placeholder="Create Password"
                  />
                </div>
                <div className="form-group">
                  <label for="password2">Confirm Password</label>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </form>
            </div>
            <div className="card-footer">
              <p className="lead mt-4 text-center">
                Have An Account? <a href="/users/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
