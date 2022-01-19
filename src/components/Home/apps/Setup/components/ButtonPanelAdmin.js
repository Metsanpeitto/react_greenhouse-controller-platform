import React from "react";
import { Container } from "../../../components/styled-components";
import { withStyles } from "@material-ui/core/styles";
import MyButton from "./MyButtonAdmin";
import stateSetup from "./stateSetup";
import { getData } from "../../getData";
import firebase from "firebase/app";
import "../../../style.css";
import AuthUserContext from "../../../../Session/context";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: 20
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 200
  }
});

var authUser = undefined;

class ButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateSetup;
    this.readSetupButtons = this.readSetupButtons.bind(this);
  }

  componentDidMount() {
    this.readSetupButtons();
    console.log("Button Panel Admin");
  }

  handleChange = name => event => {
    console.log(event.target.value);
    this.setState({
      [name]: event.target.value
    });
  };

  readSetupButtons = () => {
    if (this.authUser !== undefined) {
      firebase
        .database()
        .ref(`/units/${this.authUser.unitname}/control/control_state`)
        .once("value")
        .then(snapshot => {
          const data = snapshot.val();

          if (data !== undefined) {
            this.setState(
              {
                ...{
                  pump: data.p,
                  fan: data.f,
                  valveIn: data.vi,
                  valveOut: data.vo,
                  wHeater: data.wh,
                  aHeater: data.ah,
                  lamp: data.l
                }
              },
              () => {}
            );
            this.setButtonState();
          }
        });
    }
  };

  setButtonState = () => {
    this.state.aHeater === "0"
      ? this.setState({
          color1: stateSetup.black,
          text1: stateSetup.textaHeater + " "
        })
      : this.setState({
          color1: stateSetup.green,
          text1: stateSetup.textaHeater + " "
        });

    this.state.wHeater === "0"
      ? this.setState({
          color2: stateSetup.black,
          text2: stateSetup.textwHeater + " "
        })
      : this.setState({
          color2: stateSetup.green,
          text2: stateSetup.textwHeater + " "
        });

    this.state.pump === "0"
      ? this.setState({
          color3: stateSetup.black,
          text3: stateSetup.textPump + " "
        })
      : this.setState({
          color3: stateSetup.green,
          text3: stateSetup.textPump + " "
        });

    this.state.valveIn === "0"
      ? this.setState({
          color4: stateSetup.black,
          text4: stateSetup.textValveIn + " "
        })
      : this.setState({
          color4: stateSetup.green,
          text4: stateSetup.textValveIn + " "
        });

    this.state.valveOut === "0"
      ? this.setState({
          color5: stateSetup.black,
          text5: stateSetup.textValveOut + " "
        })
      : this.setState({
          color5: stateSetup.green,
          text5: stateSetup.textValveOut + " "
        });

    this.state.lamp === "0"
      ? this.setState({
          color6: stateSetup.black,
          text6: stateSetup.textLamp + " "
        })
      : this.setState({
          color6: stateSetup.green,
          text6: stateSetup.textLamp + " "
        });

    this.state.fan === "0"
      ? this.setState({
          color7: stateSetup.black,
          text7: stateSetup.textFan + " "
        })
      : this.setState({
          color7: stateSetup.green,
          text7: stateSetup.textFan + " "
        });
  };

  render() {
    return (
      <div key={Math.random()}>
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser !== undefined) {
              this.authUser = authUser;
            }
          }}
        </AuthUserContext.Consumer>

        <Container className="setup-button-card-canvas card is-card-dark  ">
          <Container className="setup-buttons-title is-dark-text-light letter-spacing text-large ">
            Actual State of the Actuators
          </Container>
          <div className="setup-div-buttons">
            <MyButton
              color={this.state.color4}
              text={this.state.text4}
              className="button-valvein"
              child="vi"
            />

            <MyButton
              backgroundColor={this.state.backgroundColor2}
              color={this.state.color2}
              text={this.state.text2}
              className="button-waterheater"
              child="wh"
            />

            <MyButton
              color={this.state.color3}
              text={this.state.text3}
              className="button-waterpump"
              child="p"
            />

            <MyButton
              color={this.state.color5}
              text={this.state.text5}
              className="button-valveout"
              child="vo"
            />

            <MyButton
              color={this.state.color6}
              text={this.state.text6}
              className="button-lamp"
              child="l"
            />

            <MyButton
              color={this.state.color7}
              text={this.state.text7}
              className="button-fan"
              child="f"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(ButtonPanel);
