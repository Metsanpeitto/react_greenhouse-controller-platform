import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Container } from "../styled-components";
import { createMuiTheme } from "@material-ui/core/styles";

import "../style.css";

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: "white",
        "&$focused": {
          // increase the specificity for the pseudo class
          color: "green"
        }
      }
    }
  }
});
const styles = theme => ({
  container: {},
  textFieldInput: {},

  input: {
    color: theme.palette.common.white
  }
});

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <form onSubmit={this.onSubmit}>
        <Container
          className="is-light-text mb-4  container-password-change user-card  is-card-dark"
          style={{}}
        >
          <Container
            className="is-dark-text-light letter-spacing text-large"
            style={{ textAlign: "center" }}
          >
            Change my Password
          </Container>
          <TextField
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
            margin="normal"
            variant="outlined"
            style={{ width: "60%", marginLeft: "20%" }}
            InputLabelProps={{
              classes: {
                root: theme.white,
                focused: "white"
              }
            }}
            InputProps={{
              className: styles.input,
              style: { color: "white" },
              classes: {
                className: styles.input,
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline
              },
              inputMode: "text"
            }}
          />

          <TextField
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
            className="account-fields"
            margin="normal"
            variant="outlined"
            style={{ width: "60%", marginLeft: "20%" }}
            InputLabelProps={{
              classes: {
                root: theme.white,
                focused: "white"
              }
            }}
            InputProps={{
              className: styles.input,
              style: { color: "white" },
              classes: {
                className: styles.input,
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline
              },
              inputMode: "text"
            }}
          />

          <Button
            disabled={isInvalid}
            type="submit"
            style={{
              backgroundColor: "white",
              color: "black",
              width: "60%",
              marginLeft: "20%",
              marginTop: "2rem"
            }}
          >
            Change My Password
          </Button>

          {error && <p>{error.message}</p>}
        </Container>
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
