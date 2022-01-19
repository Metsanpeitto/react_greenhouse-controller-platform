import React from "react";
import { Container } from "../../../components/styled-components";
import Grid from "@material-ui/core/Grid";
import ValidField from "./TextField1";
import defaultInputs from "./defaultInputs";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import jsonToSendSetup from "./jsonToSendSetup";
import ButtonPanel from "./ButtonPanelAdmin";
import AuthUserContext from "../../../../Session/context";

// Todo :
//         -End Validation
//         -Let ready Submit ,for The form and for the buttons
//         -Upload the buttons State and the Setup Values Form to firebase
// ah,f,l,p,vi,vo,wh ---> /control/control_state
var authUser = null;

class SetupGridAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: defaultInputs,
      isToggleOn: true,
      valueFromChild: "",
      idFromChild: ""
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleData = this.handleData.bind(this);
    this.parseValues = this.parseValues.bind(this);
    this.inputs = defaultInputs;
  }

  jsonSetup = jsonToSendSetup; // Initializes jsonSetup with same values

  handleData = data => {
    this.inputs[data.id].value = parseInt(data.value);
    this.setState({
      inputs: this.inputs,
      isToggleOn: true
    });
  };

  onKeyPress = e => {
    if (e.key === "Enter") {
      this.onFormSubmit();
      console.log("submitted");
    }
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
      text: this.props.text,
      color: "black"
    }));
    this.parseValues();
    this.updateSetup(this.jsonSetup);
  };

  componentDidUpdate() {
    this.parseValues();
  }

  componentDidMount(props) {
    this.downloadSetup();
    console.log("Setup Admin");
  }

  updateSetup = thisJson => {
    firebase
      .database()
      .ref(`/units/${this.authUser.unitname}/setup/setup_state`)
      .set(thisJson);
  };

  downloadSetup = () => {
    firebase
      .database()
      .ref(`/units/${this.authUser.unitname}/setup/setup_state`)
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        if (data) {
          this.parseBackValues(data);
        }
      });
  };

  parseValues() {
    //df,dv,ov,of,wi,wa,pi,pa,ai,aa,hi,ha,ai,aa,hi,ha
    this.jsonSetup.df = this.state.inputs.daysinflo.value;
    this.jsonSetup.dv = this.state.inputs.daysinveg.value;
    this.jsonSetup.ov = this.state.inputs.houronveg.value;
    this.jsonSetup.of = this.state.inputs.houronflo.value;
    this.jsonSetup.wa = this.state.inputs.watertempmax.value;
    this.jsonSetup.wi = this.state.inputs.watertempmin.value;
    this.jsonSetup.pa = this.state.inputs.waterphmax.value;
    this.jsonSetup.pi = this.state.inputs.waterphmin.value;
    this.jsonSetup.aa = this.state.inputs.tempmax.value;
    this.jsonSetup.ai = this.state.inputs.tempmin.value;
    this.jsonSetup.ha = this.state.inputs.humimax.value;
    this.jsonSetup.hi = this.state.inputs.humimin.value;
  }

  parseBackValues(data) {
    this.inputs.daysinflo.value = data.df;
    this.inputs.daysinveg.value = data.dv;
    this.inputs.houronveg.value = data.ov;
    this.inputs.houronflo.value = data.of;
    this.inputs.watertempmax.value = data.wa;
    this.inputs.watertempmin.value = data.wi;
    this.inputs.waterphmax.value = data.pa;
    this.inputs.waterphmin.value = data.pi;
    this.inputs.tempmax.value = data.aa;
    this.inputs.tempmin.value = data.ai;
    this.inputs.humimax.value = data.ha;
    this.inputs.humimin.value = data.hi;
    this.setState({ inputs: this.inputs });
  }

  render() {
    return (
      <div key={Math.random()}>
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              this.authUser = authUser;
            }
          }}
        </AuthUserContext.Consumer>
        <form className="Form" onSubmit={this.onFormSubmit}>
          <Grid
            className="setup-main-grid"
            container
            style={{
              width: "100%",
              margin: "0%",
              height: "fit-content",
              padding: "0%"
            }}
            spacing={10}
          >
            <Grid
              className="setup-time"
              item
              xs={10}
              sm={10}
              lg={3}
              xl={3}
              style={{
                paddingTop: "1%",
                paddingBottom: "0%",
                height: "100%"
              }}
            >
              <Container className="is-light-text mb-4 padding: 4em">
                <Container className="card grid-card is-card-dark">
                  <Container className="setup-card-heading">
                    <Container className=" is-dark-text-light letter-spacing text-large">
                      Time Parameters
                    </Container>
                  </Container>
                  <ValidField
                    id="daysinveg"
                    handleFromParent={this.handleData}
                    label="Days In Vegetative"
                    value={this.state.inputs.daysinveg.value}
                  />
                  <ValidField
                    id="daysinflo"
                    handleFromParent={this.handleData}
                    label="Days In Flowering"
                    value={this.state.inputs.daysinflo.value}
                  />
                  <ValidField
                    id="houronveg"
                    handleFromParent={this.handleData}
                    label="Hour Light On in Vegetative"
                    value={this.state.inputs.houronveg.value}
                  />

                  <ValidField
                    id="houronflo"
                    handleFromParent={this.handleData}
                    label="Hour Light On Flowering"
                    value={this.state.inputs.houronflo.value}
                  />
                </Container>
              </Container>
            </Grid>

            <Grid
              className="setup-water"
              item
              xs={10}
              sm={10}
              lg={3}
              xl={3}
              style={{
                paddingTop: "1%",
                paddingBottom: "0%",
                height: "100%"
              }}
            >
              <Container className="is-light-text mb-4 padding: 4em;">
                <Container className="card grid-card is-card-dark">
                  <Container className="setup-card-heading">
                    <Container className="is-dark-text-light letter-spacing text-large">
                      Water Parameters
                    </Container>
                  </Container>
                  <ValidField
                    id="watertempmax"
                    handleFromParent={this.handleData}
                    label="Water maximun temperature"
                    value={this.state.inputs.watertempmax.value}
                  />
                  <ValidField
                    id="watertempmin"
                    handleFromParent={this.handleData}
                    label="Water minimun temperature"
                    value={this.state.inputs.watertempmin.value}
                  />
                  <ValidField
                    id="waterphmax"
                    handleFromParent={this.handleData}
                    label="Water maximun ph"
                    value={this.state.inputs.waterphmax.value}
                  />
                  <ValidField
                    id="waterphmin"
                    handleFromParent={this.handleData}
                    label="Water minimun ph"
                    value={this.state.inputs.waterphmin.value}
                  />
                </Container>
              </Container>
            </Grid>
            <Grid
              className="setup-temp"
              item
              xs={10}
              sm={10}
              lg={3}
              xl={3}
              style={{
                paddingTop: "1%",
                paddingBottom: "0%",
                height: "100%"
              }}
            >
              <Container className="is-light-text mb-4 padding: 4em;">
                <Container className="card grid-card is-card-dark">
                  <Container className="setup-card-heading">
                    <Container className="is-dark-text-light letter-spacing text-large">
                      Air Parameters
                    </Container>
                  </Container>
                  <ValidField
                    id="tempmax"
                    handleFromParent={this.handleData}
                    label="Maximun Air Temperature "
                    value={this.state.inputs.tempmax.value}
                  />
                  <ValidField
                    id="tempmin"
                    handleFromParent={this.handleData}
                    label="Minimun Air Temperature "
                    value={this.state.inputs.tempmin.value}
                  />
                  <ValidField
                    id="humimax"
                    handleFromParent={this.handleData}
                    label="Maximun Air Humidity"
                    value={this.state.inputs.humimax.value}
                  />
                  <ValidField
                    id="humimin"
                    handleFromParent={this.handleData}
                    label="Minimun Air Humidity"
                    value={this.state.inputs.humimin.value}
                  />
                </Container>
              </Container>
            </Grid>
            <Grid
              className="setup-buttons-grid"
              item
              xs={10}
              sm={10}
              lg={3}
              xl={3}
              style={{
                paddingTop: "1%",
                paddingBottom: "0%",
                height: "100%"
              }}
            >
              <ButtonPanel {...this.authUser} />
            </Grid>
          </Grid>
          <div className="setup-submit-button-canvas">
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "white",

                paddingLeft: "5%",
                paddingRight: "5%"
              }}
              className="setup-submit-button"
            >
              {this.state.isToggleOn ? "Submit" : "Submitted"}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default SetupGridAdmin;
