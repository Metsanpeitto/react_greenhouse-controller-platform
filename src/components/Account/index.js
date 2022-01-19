import React from "react";
import { AuthUserContext } from "../Session";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization } from "../Session";

import { Container } from "../styled-components";

import "../style.css";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      console.log(authUser),
      (
        <div className="container-account">
          <Container
            className="is-light-text mb-4 container-account-card user-card  is-card-dark"
            style={{}}
          >
            <Container className="is-dark-text-light letter-spacing text-small account-fields">
              <h1 className="text-large" style={{ textAlign: "center" }}>
                Account:
              </h1>
              <h2
                className="text-large"
                style={{ color: "white", textAlign: "center" }}
              >
                {" "}
                {authUser.email}
              </h2>
            </Container>
          </Container>

          <PasswordChangeForm />
        </div>
      )
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
