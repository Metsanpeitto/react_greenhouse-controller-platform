import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Container } from "../styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import "../style.css";

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

const styles = theme => ({
  container: {},
  textFieldInput: {},

  input: {
    color: theme.palette.common.white
  }
});

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

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.withFirebase
      .doPasswordReset(email)
      .then(() => {
        this.setState = { ...INITIAL_STATE };
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
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <Container
          className="is-light-text mb-4 user-card container-forgot is-card-dark"
          style={{}}
        >
          <Container
            className="is-dark-text-light letter-spacing text-large"
            style={{ textAlign: "center" }}
          >
            I Forgot my Password
          </Container>

          <TextField
            name="email"
            value={this.state.email}
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

          <Button
            disabled={isInvalid}
            type="submit"
            style={{
              backgroundColor: "white",
              color: "black",
              width: "60%",
              marginLeft: "20%",
              marginTop: "3%"
            }}
          >
            Reset My Password
          </Button>

          {error && <p>{error.message}</p>}
        </Container>
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forget Password?</Link>
  </p>
);
export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
