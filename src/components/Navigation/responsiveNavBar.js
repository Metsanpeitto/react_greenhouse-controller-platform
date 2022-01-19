import React from "react";
import { Container, Nav } from "./styled-components";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import "./Logo.png";
import "../style.css";

import { AuthUserContext } from "../Session";

const MyNavigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);
const NavigationAuth = () => (
  <Nav className="navbar  navbar-expand-lg fixed-top is-white is-dark-text ">
    <Grid container spacing={10} style={{ height: "65px", paddingLeft: "2%" }}>
      <Grid
        item
        className="navbargrid"
        style={{ padding: "inherit" }}
        xs={10}
        sm={2}
        lg={2}
        xl={2}
      >
        <Container className="navbar-brand   h1 mb-0 text-large font-medium">
          <img
            alt=""
            style={{
              paddingLeft: "1%",
              marginTop: "1%",
              maxHeight: "50px",
              minWidth: "200px"
            }}
            src={require("./Logo.png")}
          />{" "}
        </Container>
      </Grid>
      <Grid
        item
        style={{
          padding: "inherit",
          paddingLeft: "5%"
        }}
        xs={4}
        sm={2}
        lg={2}
        xl={2}
      >
        <Container
          className="navbar-brand   h1 mb-8 text-small font-medium"
          style={{ paddingTop: 20 }}
        >
          <Link to={ROUTES.LANDING} className="link">
            The Project
          </Link>
        </Container>
      </Grid>
      <Grid
        item
        style={{ padding: "inherit", paddingLeft: "15%" }}
        xs={1}
        sm={2}
        lg={2}
        xl={2}
      >
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: 20 }}
        >
          <Link to={ROUTES.HOME} className="link">
            Home
          </Link>
        </Container>
      </Grid>
      <Grid
        item
        style={{ padding: "inherit", paddingLeft: "15%" }}
        xs={1}
        sm={2}
        lg={2}
        xl={2}
      >
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: 20, paddingLeft: "5%" }}
        >
          <Link to={ROUTES.ACCOUNT} className="link">
            Account
          </Link>
        </Container>
      </Grid>

      <Grid
        item
        style={{
          padding: "inherit",
          paddingTop: "0.5%",
          paddingLeft: "10%",
          marginInlineStart: "12%"
        }}
        xs={2}
        sm={2}
        lg={2}
        xl={2}
      >
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: "7%" }}
        >
          <SignOutButton />
        </Container>
      </Grid>
    </Grid>
  </Nav>
);

const NavigationNonAuth = () => (
  <Nav className="navbar  navbar-expand-lg fixed-top is-white is-dark-text ">
    <Grid
      className="navbar-noauth-grid"
      container
      spacing={10}
      style={{ height: "65px", paddingLeft: "2%" }}
    >
      <Grid item xs={2} sm={2} lg={2} xl={2} style={{ padding: "inherit" }}>
        <Container className="navbar-brand   h1 mb-0 text-large font-medium">
          <img alt="" src={require("./Logo.png")} />{" "}
        </Container>
      </Grid>
      <Grid
        className="nav-noauth-grid-landing"
        item
        xs={2}
        sm={2}
        lg={4}
        xl={4}
        style={{ padding: "inherit" }}
      >
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <Link to={ROUTES.LANDING} className="link-noau" style={{ mar: 90 }}>
            The Project
          </Link>
        </Container>
      </Grid>
      <Grid
        className="nav-noauth-grid-signin"
        item
        xs={2}
        sm={2}
        lg={4}
        xl={4}
        style={{ padding: "inherit" }}
      >
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <Link to={ROUTES.SIGN_IN} className="link-noau">
            Sign In
          </Link>
        </Container>
      </Grid>
    </Grid>
  </Nav>
);

export default MyNavigation;
