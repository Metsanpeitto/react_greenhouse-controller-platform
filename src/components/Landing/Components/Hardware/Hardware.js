import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";
import Footer from "../Footer/Footer";
import text1 from "./text1";
import text2 from "./text2";
import text3 from "./text3";

import imgHardware from "../../../../img/hardwareLandscape.png";
import imgFade from "../../../../img/fade.png";
import imgControlPanel from "../../../../img/controlPanel.png";
import "../../../style.css";

class Hardware extends Component {
  render() {
    return (
      <div className="hardware-canvas">
        <div className="hardware-header">
          <img className="hardware-imgHardware" src={imgHardware} />
          <div className="img-fade-text">
            <img className="hardware-imgFade" src={imgFade} />
            <strong className="text-x-large hardware-text-header">
              HARDWARE
            </strong>
          </div>
        </div>
        <div className="hardware-body">
          <div className="hardware-body-up ">{text1}</div>

          <div className="hardware-body-center">
            <img className="hardware-imgControlPanel" src={imgControlPanel} />
            {text2}
          </div>
          <div className="hardware-body-low">{text3}</div>
        </div>

        <Footer />
      </div>
    );
  }
}

const HardwareLink = () => (
  <p>
    more about <Link to={ROUTES.HARDWARE}> Nurumia ></Link>
  </p>
);
export default Hardware;
export { HardwareLink };
