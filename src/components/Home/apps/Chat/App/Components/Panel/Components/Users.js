import React, { Component } from "react";
import { withFirebase } from "../../../../../../../Firebase";
import { AuthUserContext } from "../../../../../../../Session";
import "../Panel.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

var authUser = null;

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      message: "",
      list: [],
      myName: props.user,
      authUser: null,
      locally: false,
      globally: false,
      value: "",
      setValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
    // this.messageRef = this.messageRef.bind(this);
    //  this.pushChat = this.pushChat.bind(this);
  }

  handleChange = event => {
    if (event) {
      var value = event.target.value;
      this.setState({ ...(value = { value }) });
      console.log(value);
    }
  };

  componentDidMount() {}

  render(props) {
    {
      if (props !== undefined) {
        console.log(props);
        this.componentWillReceiveProps(props);
        // this.listenMessages(props);
      }
    }
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              console.log(authUser);
              this.authUser = authUser;
            }
          }}
        </AuthUserContext.Consumer>{" "}
        <div className="panel-create">Create New Chat</div>
        <div
          className="options card"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <FormControl component="fieldset">
            {" "}
            <FormLabel component="legend" style={{ marginBottom: "0%" }}>
              Area
            </FormLabel>
            <RadioGroup
              aria-label="area"
              name="area1"
              value={this.state.value}
              onChange={this.handleChange}
              style={{ display: "block", marginBottom: "0%" }}
            >
              <FormControlLabel
                value="local"
                control={<Radio color="primary" />}
                label="Local"
                style={{
                  marginLeft: "0%",
                  marginRight: "2%",
                  marginBottom: "0%",
                  verticalAlign: "middle",
                  width: "fit-content"
                }}
              />
              <FormControlLabel
                value="global"
                control={<Radio color="primary" />}
                label="Global"
                style={{
                  marginLeft: "0%",
                  marginRight: "2%",
                  marginBottom: "0%",
                  verticalAlign: "middle",
                  width: "fit-content"
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default withFirebase(Users);
