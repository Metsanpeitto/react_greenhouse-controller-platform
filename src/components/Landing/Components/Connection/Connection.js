import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";
import Footer from "../Footer/Footer";
import text1 from "./text1";
import text2 from "./text2";
import text3 from "./text3";

import imgConnection from "../../../../img/connectionLandscape.png";
import imgConnectionProducer from "../../../../img/connectionProducer.png";
import imgFade from "../../../../img/fadeConnection.png";
import "../../../style.css";

class Connection extends Component {
  render() {
    return (
      <div className="connection-canvas">
        <div className="connection-header">
          <img className="connection-imgConnection" src={imgConnection} />
          <div className="img-fade-text">
            <img className="connection-imgFade" src={imgFade} />
            <strong className="text-x-large connection-text-header">
              CONNECTION
            </strong>
          </div>
        </div>
        <div className="connection-body">
          <div className="connection-body-up">{text1}</div>
          <div className="connection-body-center">
            <img
              className="connection-imgConnectionProducer"
              src={imgConnectionProducer}
            />

            {text2}
          </div>
          <div className="connection-body-low">{text3}</div>
        </div>

        <Footer />
      </div>
    );
  }
}

const ConnectionLink = () => (
  <p>
    more about <Link to={ROUTES.CONNECTION}> Connection ></Link>
  </p>
);
export default Connection;
export { ConnectionLink };
