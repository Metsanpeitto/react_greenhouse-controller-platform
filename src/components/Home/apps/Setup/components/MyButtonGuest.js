import React from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import AuthUserContext from "../../../../Session/context";

import "../../../style.css";
var authUser;

class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      text: "",
      isToggleOn: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateButton = this.updateButton.bind(this);
  }

  updateButton = (thisChild, thisValue) => {
    return null;
  };

  handleClick(event) {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
      text: this.props.text,
      color: "black"
    }));

    //this.updateButton(this.props.child, this.state.isToggleOn ? "0" : "1");
  }

  componentDidMount() {
    if (this.props) {
      var text = this.props.text;
      var color = this.props.color;

      var isToggleOn = false;
      if (color == "green") {
        isToggleOn = true;
      } else {
        isToggleOn = false;
      }
      this.setState({ ...{ text: text, color: color, isToggleOn } }, () => {});
    }
    console.log("my button Guest");
  }

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
        <Button
          onClick={this.handleClick}
          variant="contained"
          className="setup-button"
          style={{
            backgroundColor: "white",
            width: "-webkit-fill-available",
            margin: "5%",
            marginBottom: "0%",
            padding: "5%",
            color: this.state.isToggleOn ? "green" : "black"
          }}
        >
          {this.state.text}
          {this.state.isToggleOn ? "ON" : "OFF"}
        </Button>
      </div>
    );
  }
}

export default MyButton;
