import React from "react";
import { Container } from "../../../components/styled-components";
import "../../../style.css";

class Card extends React.Component {
  render() {
    if (!this.props) {
      return null;
    } else {
      return (
        <Container
          className=" card-value is-light-text "
          style={{ paddingLeft: "5%", paddingRight: "5%" }}
        >
          <Container className="is-dark-text-light letter-spacing text-small">
            <span className=" readings-card-headerValue text-large  ">
              {this.props.headerValue}
            </span>
          </Container>
          <h3 className="readings-card-actualValue text-large pr-2">
            {this.props.actualValue}
          </h3>
        </Container>
      );
    }
  }
}

export default Card;
