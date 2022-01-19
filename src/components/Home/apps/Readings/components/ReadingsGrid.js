import React from "react";
import stateReadings from "./stateReadings";
import { Container } from "../../../components/styled-components";
import Card from "./Card";
import "../../../style.css";

class ReadingsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateReadings;
  }

  render() {
    return (
      <div key={Math.random()}>
        <Container className="user-card temp-grid-card is-card-dark is-light-text mb-9 padding: 4em">
          <Card
            headerValue="Air Temperature"
            actualValue={this.state.readings.temp}
          />

          <Card
            headerValue="Air Humidity"
            actualValue={this.state.readings.humi}
          />

          <Card
            headerValue="Water Temperature"
            actualValue={this.state.readings.wTemp}
          />

          <Card headerValue="Water Ph" actualValue={this.state.readings.wPh} />
        </Container>
      </div>
    );
  }
}

export default ReadingsGrid;
