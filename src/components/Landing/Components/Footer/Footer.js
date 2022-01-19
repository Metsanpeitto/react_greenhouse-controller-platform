import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";
import "./footer.css";

import "../../../style.css";

/**  */

const Footer = () => (
  <div className="footer-canvas ">
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo1" style={{ fontFamily: "Pacifico" }}>
          We are here to help you
        </h1>

        <h2 className="footer__contact">Contact</h2>

        <address>33670 Waldenberg 70. Morea d'Ayer . Spain</address>
        <a className="footer__btn" href="mailto:admin@nurumia..com">
          Email Us
        </a>
        <p className="legal">&copy; 2019 Nurumia. All rights reserved.</p>
      </div>

      <div className="footer__nav">
        <div className="nav__item">
          {" "}
          <h2 className="nav__title">Legal</h2>
          <div className="nav__ul">
            <Link to={ROUTES.PRIVACY} className="fnav__ul__item ">
              Privacy Policy
            </Link>
            <Link to={ROUTES.DISCLAIMER} className="fnav__ul__item ">
              Disclaimer
            </Link>
          </div>
          <span className="legal__links ">
            Made with <span className="heart">♥</span> remotely from Waldenberg
          </span>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
