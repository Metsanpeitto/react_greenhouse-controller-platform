import React, { Component } from "react";
import Footer from "./Footer";
import disclaimerText from "./disclaimerText";

import "../../../style.css";

class Disclaimer extends Component {
  render() {
    return (
      <div className="disclaimer-canvas">
        <div className="disclaimer-header">
          <strong className="text-x-large">Disclaimer</strong>
        </div>
        <div className="disclaimer-body">{disclaimerText}</div>
        <Footer />
      </div>
    );
  }
}

export default Disclaimer;
