import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import "../../../style.css";

const stateReadings = {
  promiseIsResolved: "false",
  dataLine: {
    labels: [],
    datasets: []
  }
};

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateReadings;
  }

  componentDidMount() {
    this.fetchProps();
  }

  cleanData() {
    this.setState({
      dataLine: []
    });
    stateReadings.dataLine = [];
  }

  fetchProps(props) {
    if (this.props) {
      //this.cleanData();
      stateReadings.dataLine = this.props.dataLine;
      this.setState({
        dataLine: stateReadings.dataLine,
        width: this.props.width
      });
    }
  }

  render() {
    return (
      <div key={Math.random()}>
        <MDBContainer className="readings-chart-container">
          <div className="w-10 " style={{ width: "700px", height: "350px" }}>
            <Line
              key="Line"
              data={this.state.dataLine}
              options={{ responsive: true, maintainAspectRatio: false }}
              className="readings-chart-line"
            />
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default Chart;
