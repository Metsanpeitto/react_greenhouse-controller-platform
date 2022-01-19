import React from "react";
import { Link, withRouter } from "react-router-dom";
import Masonry from "react-masonry-component";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { masonryOptions } from "./export";
import * as ROUTES from "../../../../constants/routes";
import imgCommunity from "../../../../img/community.png";
import imgFarmer from "../../../../img/farmer.png";
import imgMarket from "../../../../img/market.png";
import imgRows from "../../../../img/rows.png";
import imgSoftware from "../../../../img/software.png";
import imgHardware from "../../../../img/hardware.png";
import text, { titles } from "./text";
import "../../../style.css";

const images = [
  imgCommunity,
  imgFarmer,
  imgMarket,
  imgRows,
  imgSoftware,
  imgHardware
];

const routes = [
  ROUTES.COMMUNITY,
  ROUTES.CONNECTION,
  ROUTES.MARKET,
  ROUTES.INDUSTRY,
  ROUTES.SOFTWARE,
  ROUTES.HARDWARE
];

const MainBlock2 = () => (
  <Masonry
    className={"grid main-block2-masonry"}
    elementType={"div"}
    options={masonryOptions}
    disableImagesLoaded={false}
    updateOnEachImageLoad={false}
  >
    {images.map((img, i) => {
      console.log(img);
      return (
        <Link
          key={"link-block2-${}" + i}
          to={routes[i]}
          color="black"
          textDecoration="none"
          className={`main-block-link main-block-link${i}`}
        >
          <div key={i} className={`grow main-block2-grid main-block-grid${i}`}>
            <img style={{}} alt="" src={img} className="main-block2-img " />
            <div className="main-block2-grid-tag">
              <strong className="text-large main-block2-tag">
                {titles[i]}
              </strong>
              <h1 className="text-small main-block2-tag-text">{text[i]}</h1>
            </div>{" "}
          </div>
        </Link>
      );
    })}
  </Masonry>
);
export default MainBlock2;
