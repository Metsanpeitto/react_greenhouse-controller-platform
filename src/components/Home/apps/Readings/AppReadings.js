import React, { Component } from "react";
import { Container } from "../../components/styled-components";
import Chart from "./components/Chart";
import ReadingsGrid from "./components/ReadingsGrid";
import MY_STATE from "./components/stateReadings";
import { getData } from "./../getData";
import "bootstrap/dist/css/bootstrap.css";
import Grid from "@material-ui/core/Grid";
import "../../style.css";
import AuthUserContext from "../../../Session/context";

var authUser = undefined;

class AppReadings extends Component {
  constructor(props) {
    super(props);
    this.state = MY_STATE;
  }

  fetchJson = () => {
    console.log("try to get data");

    getData(
      "https://cors-anywhere.herokuapp.com/http://nurumia.com/WebAppChart.php"
    )
      .then(data => {
        console.log(data);
        this.setState({ key: data.id, json: data });
        let len = this.state.json.length;

        if (len > 6) {
          this.cleanData();
          MY_STATE.dataLineTemperature.datasets[0].label = "Air Temperature";
          MY_STATE.dataLineTemperature.datasets[1].label = "Water Temperature";
          MY_STATE.readings.temp = this.state.json[len - 1].temp;
          MY_STATE.readings.wTemp = this.state.json[len - 1].humi;
          MY_STATE.readings.humi = this.state.json[len - 1].humi;
          MY_STATE.readings.wPh = this.state.json[len - 1].wPh;

          for (var i = 0; i < this.state.json.length; ) {
            MY_STATE.dataLineTemperature.datasets[0].data[i] = this.state.json[
              i
            ].temp;

            MY_STATE.dataLineTemperature.datasets[1].data[i] = this.state.json[
              i
            ].wTemp;

            MY_STATE.dataLineTemperature.labels[i] = i;

            i++;
          }
          if (this.state.dataLineTemperature.datasets[0].data.length > 20) {
            this.setState({
              dataLineTemperature: MY_STATE.dataLineTemperature,
              readings: MY_STATE.readings
            });
          }
        }
      })
      .catch();
  };

  cleanData() {
    MY_STATE.dataLineTemperature.datasets[0].data = [];
    MY_STATE.dataLineTemperature.labels = [];
  }

  componentDidMount(props) {
    this.fetchJson();
    //fetch("http://jsonplaceholder.typicode.com/todos")
  }

  render() {
    return (
      <div className="readings-canvas">
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              this.authUser = authUser;
            }
          }}
        </AuthUserContext.Consumer>
        <Grid
          key="3"
          container
          spacing={8}
          style={{
            width: "95%",
            margin: "0%",
            alignItems: "center",
            paddingTop: "0%",
            paddingBottom: "1%"
          }}
        >
          <Grid
            item
            xs={10}
            sm={10}
            lg={6}
            xl={6}
            className="readings-grid-chart"
            style={{
              paddingTop: "0%",
              paddingBottom: "0%"
            }}
          >
            <Container className="chart-grid-card  is-card-dark is-dark-text-light letter-spacing text-small">
              <h3 className="chart-title-text-large ">Temperature Reading</h3>
              <div className="chart-canvas">
                <Chart dataLine={this.state.dataLineTemperature} />
              </div>
            </Container>
          </Grid>

          <Grid
            item
            xs={10}
            sm={5}
            lg={2}
            xl={2}
            className="readings-grid-readings"
            style={{}}
          >
            <Container className=" readings-grid-card is-card-dark is-dark-text-light letter-spacing text-small">
              <h3 className="readings-title-text-large ">Last Readings</h3>

              <ReadingsGrid />
            </Container>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AppReadings;
