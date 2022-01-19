import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";
import Footer from "../Footer/Footer";
import Overlay from "../FormOverlay/Overlay";
import text1 from "./text1";
import text2 from "./text2";
import text3 from "./text3";
import text4 from "./text4";

import imgBeach from "../../../../img/beachLandscape2.png";
import imgPipes from "../../../../img/pipes.png";
import imgFade100 from "../../../../img/fade100.png";

import "../../../style.css";

class LearnMore extends Component {
  render() {
    return (
      <div className="learn-canvas">
        <div className="learn-header">
          <img className="learn-imgBeach" src={imgBeach} />
          <div className="img-fade-text">
            <img className="learn-imgFade100" src={imgFade100} />
            <strong className="text-x-large learn-text-header">
              LEARN MORE
            </strong>
          </div>
        </div>
        <div className="learn-body">
          <div className="learn-body-up ">{text1}</div>
          <img className="learn-imgPipes" src={imgPipes} />
          <div className="learn-body-low">
            {text2}
            {text3}
          </div>
        </div>
        <div className="learn-contact">
          {text4}
          <Overlay />
        </div>
        <Footer />
      </div>
    );
  }
}

const LearnLink = () => (
  <p>
    Learn more about <Link to={ROUTES.LEARN}> Nurumia ></Link>
  </p>
);
//const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default LearnMore;
export { LearnLink };
