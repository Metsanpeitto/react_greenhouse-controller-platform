import React from "react";
import { withFirebase } from "../Firebase";
import { Button } from "@material-ui/core";
import "../style.css";

const SignOutButton = ({ firebase }) => (
  <Button
    type="button"
    variant="contained"
    className="signOutButton"
    onClick={firebase.doSignOut}
    style={{
      backgroundColor: "white",
      border: 1
    }}
  >
    SignOut
  </Button>
);

export default withFirebase(SignOutButton);
