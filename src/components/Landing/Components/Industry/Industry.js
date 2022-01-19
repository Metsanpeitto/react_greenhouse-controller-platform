import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";
import Footer from "../Footer/Footer";
import imgIndustry from "../../../../img/industryLandscape.png";
import imgRows3 from "../../../../img/rows3.png";
import fadeIndustry from "../../../../img/fadeIndustry.png";
import industryIcon from "../../../../img/industryIcon.png";
import text1 from "./text1";
import text2 from "./text2";
import "../../../style.css";

class Industry extends Component {
  render() {
    return (
      <div className="learn-canvas">
        <div className="learn-header">
          <img className="industryLandscape" src={imgIndustry} />
          <div className="img-fade-text">
            <img className="industryFade" src={fadeIndustry} />
            <strong className="text-x-large learn-text-header">INDUSTRY</strong>
          </div>
        </div>
        <div className="industry-body">
          <div className="industry-body-up ">
            {text1} <img className="industry-icon" src={industryIcon} />
          </div>

          <div className="industry-body-low">
            <img className="imgRows3" src={imgRows3} />
            {text2}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

const IndustryLink = () => (
  <p>
    more about <Link to={ROUTES.INDUSTRY}> Nurumia ></Link>
  </p>
);
export default Industry;
export { IndustryLink };
