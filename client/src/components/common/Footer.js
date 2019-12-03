import React from "react";

export default function Footer() {
  return (
    <footer className="page-footer font-small pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase">Beaux's Art</h5>
            <p>
              Let us know of any annoying bugs you find or optimization
              suggestions you have
            </p>
          </div>
          <hr className="clearfix w-100 d-md-none pb-3" />
          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Site Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!">Home</a>
              </li>
              <li>
                <a href="#!">Gallery</a>
              </li>
              <li>
                <a href="#!">Register</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Contact Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!">Send a Message</a>
              </li>
              <li>
                <a href="#!">Read T.O.S.</a>
              </li>
              <li>
                <a href="#!">Just wanna chat?</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3">
        © 2019 Copyright:
        <a href="gfieldp.me"> BRXTK LLC</a>
      </div>
    </footer>
  );
}
