import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";
import Footer from "../Footer/Footer";
import text1 from "./text1";
import text2 from "./text2";
import text3 from "./text3";

import imgSoftware from "../../../../img/softwareLandscape.png";
import fadeSoftware from "../../../../img/fadeSoftware.png";
import imgSoftwareLaptop from "../../../../img/softwareLaptop.png";
import "../../../style.css";

class Software extends Component {
  render() {
    return (
      <div className="software-canvas">
        <div className="software-header">
          <img className="software-imgSoftware" src={imgSoftware} />
          <div className="img-fade-text">
            <img className="software-imgFade" src={fadeSoftware} />
            <strong className="text-x-large software-text-header">
              SOFTWARE
            </strong>
          </div>
        </div>
        <div className="software-body">
          <div className="software-body-up ">{text1} </div>
          <div className="software-body-center">
            {" "}
            <img
              className="software-imgSoftwareLaptop"
              src={imgSoftwareLaptop}
            />
            {text2}
          </div>
          <div className="software-body-low">{text3}</div>
        </div>

        <Footer />
      </div>
    );
  }
}

const SoftwareLink = () => (
  <p>
    more about <Link to={ROUTES.SOFTWARE}> Nurumia ></Link>
  </p>
);
export default Software;
export { SoftwareLink };
