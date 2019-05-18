import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="row my-5">
        <div className="col-md-4 m-auto my-4">
          <div className="text-center">
            <h1>
              <i className="fas fa-2x fa-hamsa mb-5" />
            </h1>
          </div>
          <div className="card my-4">
            <div className="card-header">
              <h4 className="text-center pt-2">Enter</h4>
            </div>
            <div className="card-body btn-group px-4 my-4" role="group">
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
            <div className="card-footer">
              <p className="small text-center mt-2">
                don't worry, we ain't gonna sell your data
              </p>
            </div>
          </div>
          <p className="text-center mt-4">or</p>
          <div className="card">
            <Link to="gallery" className="btn btn-lg btn-danger">
              Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
