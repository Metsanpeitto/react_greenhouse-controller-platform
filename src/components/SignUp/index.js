import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Container } from "../styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import unitskeleton from "./unitSkeleton.json";

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
  serialnumber: "111",
  error: null,
  checked: false
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.checkboxToggle = this.checkboxToggle.bind(this);
    this.checkSNExists = this.checkSNExists.bind(this);
    this.checkUExists = this.checkUExists.bind(this);
  }

  checkSNExists(ok, error) {
    return this.props.firebase
      .checkSerialNumberExists(this.state.serialnumber, this.state.unitname)
      .then(allow => {
        console.log(allow);
        if (allow === "OK") {
          console.log("Returned");
          ok(allow);
        } else {
          console.log("Error");
          error("Error");
        }
      });
  }

  checkUExists(ok, error) {
    return this.props.firebase
      .checkUnitExists(this.state.unitname)
      .then(allow => {
        console.log(allow);
        if (allow === "OK") {
          console.log("Returned");
          ok(allow);
        } else {
          console.log("Error");
          error("Error");
        }
      });
  }

  creatNU(ok, error) {
    const chat = unitskeleton.chat;
    const setup = unitskeleton.setup;
    const alarm = unitskeleton.alarm;
    const calendar = unitskeleton.calendar;
    const control = unitskeleton.control;
    return this.props.firebase
      .populatenewunit(this.state.unitname)
      .set({ chat, setup, alarm, calendar, control });
  }

  checkboxToggle(serialnumber, unitname) {
    // state is updated first

    this.setState({ checked: !this.state.checked }, () =>
      console.log("boxIsChecked: " + this.state.checked)
    );
    if (this.state.checked === false) {
      this.setState({ serialnumber: undefined, role: "admin" }, () => {});
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
      this.checkUExists(
        allow => {
          console.log(allow);
        },
        error => {
          console.log("Not allowed");
        }
      ).then(() => {
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            console.log(authUser.user.uid);
            const uid = authUser.user.uid;

            this.props.firebase
              .dbRef()
              .child("users")
              .update({ [uid]: { ["unitname"]: unitname } })
              .then(() => {});

            this.props.firebase
              .unit(unitname)
              .child("users")
              .update({ [uid]: { email, username, role, unitname } });

            this.props.firebase
              .globalChat()
              .child("users")
              .update({ [uid]: { email, username, role, unitname } });

            this.props.firebase
              .localChat(unitname)
              .child("users")
              .update({ [uid]: { email, username, role, unitname } });
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
            console.log(error);
          });
      });

      event.preventDefault();
    } else {
      this.checkSNExists(
        allow => {
          console.log(allow);
        },
        error => {
          console.log("Not allowed");
        }
      )
        .then(() => {
          this.creatNU();
        })
        .then(() => {
          this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
              console.log(authUser.user.uid);

              const uid = authUser.user.uid;

              this.props.firebase
                .dbRef()
                .child("users")
                .update({ [uid]: { ["unitname"]: unitname } })
                .then(() => {});

              this.props.firebase
                .unit(unitname)
                .child("users")
                .update({ [uid]: { email, username, role, unitname } });
            })

            .then(() => {
              var newState = {
                unitname: unitname,
                username: username,
                email: email,
                role: role
              };
              //this.setState({ ...INITIAL_STATE })
              this.setState({ newState });
              this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
              this.setState({ error });
              console.log(error);
            });
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
      serialnumber === "" ||
      error === true;

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
        <Container className="is-light-text mb-4  user-card container-signup  is-card-dark">
          <Container
            className="is-dark-text-light letter-spacing signup-title text-large"
            style={{ textAlign: "center" }}
          >
            Sign Up
          </Container>

          <FormControlLabel
            label="Start a New Green House"
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
            className="signup-text"
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
            className="signup-text"
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
            className="signup-text"
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
            className="signup-text"
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
            className="signup-text"
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
              marginLeft: "20%",
              marginTop: "3%"
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
  <p style={{ color: "white" }}>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };
