import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Container } from "../styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  unitname: "",
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  role: "worker",
  isAdmin: "",
  isWorker: "",
  isGuest: "",
  serialnumber: "111",
  error: null,
  checked: false
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.checkboxToggle = this.checkboxToggle.bind(this);
  }

  checkboxToggle() {
    // state is updated first

    this.setState({ checked: !this.state.checked }, () =>
      console.log("boxIsChecked: " + this.state.checked)
    );
    if (this.state.checked === false) {
      this.setState({ serialnumber: undefined, role: "admin" }, () => {
        console.log(this.state.serialnumber, this.state.role);
      });
    } else {
      this.setState({ serialnumber: "111", role: "worker" }, () => {
        console.log(this.state.serialnumber, this.state.role);
      });
    }
  }

  onSubmit = event => {
    console.log(this.state.serialnumber, this.state.role);
    const {
      unitname,
      username,
      email,
      passwordOne,
      role,
      serialnumber
    } = this.state;

    if (this.state.checked === false) {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          console.log(authUser.user.uid);
          const uid = authUser.user.uid;
          return this.props.firebase.user(username, unitname).set({
            uid,
            email,
            role
          });
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          this.setState({ error });
          console.log(error);
        });

      event.preventDefault();
    } else {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          console.log(authUser.user.uid);
          const uid = authUser.user.uid;
          return this.props.firebase.user(username, unitname).set({
            uid,
            email,
            role
          });
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          this.setState({ error });
          console.log(error);
        });

      event.preventDefault();
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      unitname,
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      checked,
      serialnumber
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "" ||
      unitname === "" ||
      serialnumber === "";

    const content = this.state.checked ? (
      <TextField
        name="serialnumber"
        value={this.state.serialnumber}
        onChange={this.onChange}
        type="text"
        placeholder="Serial Number"
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
    ) : null;

    return (
      <form onSubmit={this.onSubmit}>
        <Container
          className="is-light-text mb-4 card  is-card-dark"
          style={{ padding: "4%", margin: "5%" }}
        >
          <Container
            className="is-dark-text-light letter-spacing text-large"
            style={{ textAlign: "center" }}
          >
            SignUp
          </Container>

          <FormControlLabel
            label="Start a New Greenhouse"
            style={{ marginLeft: "20%" }}
            control={
              <Checkbox
                name="checked"
                checked={this.state.checked}
                onClick={this.checkboxToggle}
                value={checked}
                color="primary"
                inputProps={{
                  "aria-label": "secondary checkbox"
                }}
              />
            }
          />

          {content}

          <TextField
            name="unitname"
            value={unitname}
            onChange={this.onChange}
            type="text"
            placeholder="Greenhouse Name"
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
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="User Name"
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
            name="email"
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
            name="passwordOne"
            value={passwordOne}
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

          <TextField
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
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
            type="submit"
            style={{
              backgroundColor: "white",
              color: "black",
              width: "60%",
              marginLeft: "20%"
            }}
          >
            Sign Up
          </Button>

          {error && <p>{error.message}</p>}
        </Container>
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };
