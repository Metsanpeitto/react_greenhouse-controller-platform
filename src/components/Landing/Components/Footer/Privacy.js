import React, { Component } from "react";
import Footer from "./Footer";
import privacyText from "./privacyText";

import "../../../style.css";

class Privacy extends Component {
  render() {
    return (
      <div className="privacy-canvas">
        <div className="privacy-header">
          <strong className="text-x-large">PRIVACY POLICY NURUMIA</strong>
        </div>
        <div className="privacy-body">{privacyText}</div>
        <Footer />
      </div>
    );
  }
}

export default Privacy;
