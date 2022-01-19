import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";
import Footer from "../Footer/Footer";
import imgMarket from "../../../../img/marketLandscape.png";
import fadeMarket from "../../../../img/fadeMarket.png";
import marketIcon from "../../../../img/marketIcon.png";
import imgMarketFarmer from "../../../../img/marketFarmer.png";
import text1 from "./text1";
import text2 from "./text2";
import "../../../style.css";

class Market extends Component {
  render() {
    return (
      <div className="market-canvas">
        <div className="market-header">
          <img className="market-imgMarket" src={imgMarket} />
          <div className="img-fade-text">
            <img className="market-imgFade" src={fadeMarket} />
            <strong className="text-x-large community-text-header">
              MARKET
            </strong>
          </div>
        </div>
        <div className="market-body">
          <div className="market-body-up ">
            {text1} <img className="market-icon" src={marketIcon} />
          </div>

          <div className="market-body-low">
            <img className="market-imgMarketFarmer" src={imgMarketFarmer} />
            {text2}
            {}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

const MarketLink = () => (
  <p>
    more about <Link to={ROUTES.MARKET}> Nurumia ></Link>
  </p>
);
export default Market;
export { MarketLink };
