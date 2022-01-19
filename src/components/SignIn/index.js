import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Container } from "../styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Background from "../../img/pattern.png";
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

const SignInPage = () => (
  <div className="signin-canvas">
    <SignInForm />
    <div className="signinLink">
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  checked: true,
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.checkboxToggle = this.checkboxToggle.bind(this);
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkboxToggle() {
    // state is updated first

    this.setState({ checked: !this.state.checked });
    console.log("boxIsChecked: " + this.state.checked);
    if (this.state.checked === true) {
      console.log("Send once the solicitude");
      this.setState({ email: "guest@nurumia.com", password: "password" });
    }
  }

  render() {
    const { email, password, error, checked } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <Container className="container-signin  is-light-text mb-4 user-card  is-card-dark">
          <Container
            className="is-dark-text-light letter-spacing text-large"
            style={{ textAlign: "center", margin: "3%" }}
          >
            SignIn
          </Container>

          <FormControlLabel
            label="Visit as guest."
            style={{ marginLeft: "20%" }}
            control={
              <Checkbox
                name="checked"
                checked={!this.state.checked}
                onClick={this.checkboxToggle}
                value={checked}
                color="primary"
                inputProps={{
                  "aria-label": "secondary checkbox"
                }}
              />
            }
          />

          <TextField
            name="email"
            className="email-signin "
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
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
              inputMode: "email"
            }}
          />
          <TextField
            name="password"
            className="password-signin"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
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
              inputMode: "password"
            }}
          />

          <Button
            disabled={isInvalid}
            className="submit-signin"
            type="submit"
            style={{
              backgroundColor: "white",
              color: "black",
              width: "60%",
              marginLeft: "20%",
              marginTop: "3%"
            }}
          >
            Sign In
          </Button>

          {error && <p>{error.message}</p>}
        </Container>
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
