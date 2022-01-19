import React, { Component } from "react";
import { withFirebase } from "../../../../../../../../Firebase";
import { AuthUserContext } from "../../../../../../../../Session";
import "../../Panel.css";

import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

var authUser = null;

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: " rgb(128, 145, 171)",
        "&$focused": {
          // increase the specificity for the pseudo class
          color: " rgb(128, 145, 171)"
        },
        transform: "scale(0.9)"
      }
    }
  }
});
const styles = theme => ({
  container: {},
  textFieldInput: {},

  input: {
    color: theme.palette.common.white
  },

  cssLabel: {},

  cssOutlinedInput: {},

  cssFocused: {},

  notchedOutline: {}
});

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      username: null,
      group: null,
      chatCreated: null,
      data: null,
      value: ""
    };

    const nameInput = "";
    this.handleChange = this.handleChange.bind(this);
  }

  onCreateChange = obj => {
    if (obj) {
      var data = obj;
      console.log(data);
      this.setState({ ...{ data: data } }, () => {});
      this.props.onCreateChange(data);
    }
  };

  handleChange = event => {
    if (event) {
      var value = event.target.value;
      var area = value.value;

      this.setState({ ...(value = { value }) });
    }
  };

  handleName = name => event => {
    this.setState({ ...{ group: event.target.value } }, () => {});
  };

  createChat = () => {
    if (this.state.authUser) {
      console.log(this.state.authUser);
      const unitname = this.state.authUser.unitname;
      const username = this.state.authUser.username;
      const group = this.state.group;

      if (this.state.value === "local") {
        var data = {
          area: "local",
          type: "group",
          unitname: `${unitname}`,
          username: `${username}`,
          group: `${group}`
        };
        this.setState({ ...{ data: data } });
        this.props.firebase
          .localChat(unitname)
          .child("groups")
          .update({
            [`${group}`]: {
              messages: {
                "-CREATOR": {
                  message: "",
                  author: ` ${username}`
                }
              }
            }
          })
          .then(() => {
            this.localRef();
            this.onCreateChange(data);
          });
      } else {
        var data = {
          area: "global",
          type: "group",
          unitname: `${unitname}`,
          username: `${username}`,
          group: `${group}`
        };
        this.setState({ ...{ data: data } });
        this.props.firebase
          .globalChat(unitname)
          .child("groups")
          .update({
            [`${group}`]: {
              messages: {
                "-CREATOR": {
                  message: "",
                  author: ` ${username}`
                }
              }
            }
          })
          .then(() => {
            this.globalRef();
            this.onCreateChange(data);
          });
      }
    }
  };

  localRef = () => {
    this.props.firebase.db
      .ref(`/units/${this.authUser.unitname}/chat/groups/${this.state.group}/`)
      .once("value")
      .then(snapshot => {
        const group = snapshot.val();
        if (group) {
          this.setState({ ...{ chatCreated: true } });
          return group;
        }
      });
  };

  globalRef = () => {
    this.props.firebase.db
      .ref(`/chat/groups/${this.state.group}/`)
      .once("value")
      .then(snapshot => {
        const group = snapshot.val();
        if (group) {
          this.setState({ ...{ chatCreated: true } });
          return group;
        }
      });
  };

  onSubmit = event => {
    console.log(event.currentTarget);
    console.log(this.state);
    if (this.state.group) {
      if (this.state.value) {
        console.log(this.state);
        this.createChat();
      }
    }
  };

  render() {
    {
      const chatCreated = this.state.chatCreated;
    }
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              this.authUser = authUser;
              if (this.state.authUser === null) {
                this.setState({ ...{ authUser: authUser } }, () => {});
              }
            }
          }}
        </AuthUserContext.Consumer>{" "}
        <div className="panel-create">Create New Chat</div>
        <div
          className="panel-search-options card"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <FormControl component="fieldset" onSubmit={this.onSubmit}>
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
            <ThemeProvider theme={theme}>
              <TextField
                id="name"
                label="Name"
                className="is-dark-text-light"
                value={this.nameInput}
                onChange={this.handleName("name")}
                variant="outlined"
                style={{ color: "gray" }}
                InputLabelProps={{
                  classes: {
                    root: theme.white,
                    focused: "white"
                  }
                }}
                InputProps={{
                  className: styles.input,
                  style: { color: "gray" },
                  classes: {
                    className: styles.input,
                    root: styles.cssOutlinedInput,
                    focused: styles.cssFocused,
                    notchedOutline: styles.notchedOutline
                  },
                  inputMode: "numeric"
                }}
              />
            </ThemeProvider>
          </FormControl>
        </div>
        <Button
          value="chat"
          className="panel-thisUsers"
          variant="contained"
          onClick={this.onSubmit}
          style={{
            color: "rgb(128, 145, 171)",
            backgroundColor: "transparent"
          }}
        >
          Create Chat
        </Button>
        {this.state.chatCreated ? <p>Chat Created !</p> : null}
      </div>
    );
  }
}

export default withFirebase(Create);
