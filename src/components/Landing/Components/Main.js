import React from "react";
import BackgroundSlider from "react-background-slider";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import MainBlock2 from "./MainBlock2/MainBlock2";
import { LearnLink } from "./LearnMore/LearnMore";
import Helmet from "react-helmet";
import imgBeautiful from "../../../img/beautiful.png";
import imgFlower from "../../../img/flower.png";

import "../../style.css";

const Main = () => (
  <div>
    <Helmet bodyAttributes={{ style: "background-image : none" }} />
    <div className="img-beautiful-canvas">
      <BackgroundSlider
        className="main-slider"
        images={[imgFlower, imgBeautiful]}
        duration={8}
        transition={2}
      />

      <div>
        <h1
          className="img-beautiful-text  font-bold"
          style={{ color: "white", marginBottom: "0%" }}
        >
          ALWAYS FULL BLOSSOM
        </h1>
      </div>
    </div>

    <div className="main-block">
      <div className="main-block-header">
        <h1 className="text-large " style={{ textAlign: "center" }}>
          Nurumia is we
        </h1>
      </div>

      <div className="main-block-text">
        <h4 className="text-medium" style={{ textAlign: "center" }}>
          Share and mutual aid as fundstones of the plaform. Meet like-minded
          people and grow together an ecosystem where to learn,make a living and
          improve our lives,and the ones we love.
        </h4>
        <div
          className="main-block-link text-small"
          style={{ textAlign: "center" }}
        >
          <LearnLink />
        </div>
      </div>
    </div>

    <div className="main-block2" style={{ textAlign: "center" }}>
      <MainBlock2 />
    </div>
    <div className="community-contact2 text-large bold-text">
      We invite you to experience the application by yourself clicking
      <Link to={ROUTES.SIGN_IN} className="link-signin-webpage ">
        here
      </Link>
    </div>
  </div>
);

export default Main;
