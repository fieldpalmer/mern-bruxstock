import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 m-auto">
          <div className="card mt-3">
            <div className="card-header text-center">
              <h4>Register</h4>
            </div>
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
                Have An Account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
