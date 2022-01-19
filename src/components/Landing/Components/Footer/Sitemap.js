import React, { Component } from "react";
import Footer from "./Footer";
import sitemap from "./sitemap.xml";

import "../../../style.css";

class Sitemap extends Component {
  render() {
    return (
      <div className="sitemap-canvas">
        <div className="sitemap-header">
          <strong className="text-x-large">SITE MAP</strong>
        </div>
        <div className="sitemap-body">{sitemap}</div>
        <Footer />
      </div>
    );
  }
}

export default Sitemap;
