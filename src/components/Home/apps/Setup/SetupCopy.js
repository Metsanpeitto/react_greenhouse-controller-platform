import React from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import SetupGridAdmin from "./components/SetupGridAdmin";

import SetupGridGuest from "./components/SetupGridGuest";

import "../../style.css";

import { AuthUserContext } from "../../../Session";

const Setup = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <SetupGuest /> : <SetupAdmin />)}
    </AuthUserContext.Consumer>
  </div>
);

const SetupAdmin = () => (
  <BrowserRouter>
    <SetupGridAdmin />
  </BrowserRouter>
);

const SetupGuest = () => (
  <BrowserRouter>
    <SetupGridGuest />
  </BrowserRouter>
);

export default Setup;
