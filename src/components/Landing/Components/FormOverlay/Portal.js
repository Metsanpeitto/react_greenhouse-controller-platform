import React from "react";
import ReactDOM from "react-dom";

import "./formStyle.css";

class Portal extends React.Component {
  componentDidMount() {
    this.portal = document.createElement("div");
    this.portal.setAttribute("class", "overlay overlay-anim");
    document.body.appendChild(this.portal);
    ReactDOM.render(this.props.children, this.portal);
  }

  componentWillUnmount() {
    document.body.removeChild(this.portal);
  }

  render() {
    return null;
  }
}

export default Portal;
