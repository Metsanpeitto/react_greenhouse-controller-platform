import React from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import SetupGridAdmin from "./components/SetupGridAdmin";
import SetupGridGuest from "./components/SetupGridGuest";

import "../../style.css";

import { AuthUserContext } from "../../../Session";

const Setup = () => (
  <div className="setup-canvas">
    <AuthUserContext.Consumer>
      {authUser => {
        if (authUser.role) {
          if (authUser.role === "admin") {
            return <SetupAdmin {...authUser} />;
          }

          if (authUser.role === "worker") {
            return <SetupGuest {...authUser} />;
          }
        }
      }}
    </AuthUserContext.Consumer>
  </div>
);

const SetupAdmin = authUser => (
  <BrowserRouter>
    <SetupGridAdmin {...authUser} />
  </BrowserRouter>
);

const SetupGuest = () => (
  <BrowserRouter>
    <SetupGridGuest />
  </BrowserRouter>
);

export default Setup;
