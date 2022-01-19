import React from "react";
import { Container, Nav } from "./styled-components";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import SignOutButton from "./../../SignOut";
import * as ROUTES from "./../../../constants/routes";
import "../style.css";
import { AuthUserContext } from "./../../Session";

const authUser = true;

const MyNavigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {() => <NavigationAuth />}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <Nav className="navbar  navbar-expand-lg fixed-top is-white is-dark-text ">
    <Grid container spacing={10} style={{ height: "65px", paddingLeft: "2%" }}>
      <Grid item style={{ padding: "inherit" }} xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-large font-medium">
          <img alt="" src={require("./Logo.png")} />{" "}
        </Container>
      </Grid>
      <Grid item style={{ padding: "inherit" }} xs={2} sm={2} lg={2} xl={2}>
        <Container
          className="navbar-brand   h1 mb-8 text-small font-medium"
          style={{ paddingTop: 20 }}
        >
          <Link to={ROUTES.LANDING} className="link">
            Landing
          </Link>
        </Container>
      </Grid>
      <Grid item style={{ padding: "inherit" }} xs={2} sm={2} lg={2} xl={2}>
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: 20 }}
        >
          <Link to={ROUTES.HOME} className="link">
            Home
          </Link>
        </Container>
      </Grid>
      <Grid item style={{ padding: "inherit" }} xs={2} sm={2} lg={2} xl={2}>
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: 20 }}
        >
          <Link to={ROUTES.ACCOUNT} className="link">
            Account
          </Link>
        </Container>
      </Grid>
      <Grid item style={{ padding: "inherit" }} xs={2} sm={2} lg={2} xl={2}>
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: 20 }}
        >
          <Link to={ROUTES.ADMIN} className="link">
            Admin
          </Link>
        </Container>
      </Grid>
      <Grid item style={{ padding: "inherit" }} xs={2} sm={2} lg={2} xl={2}>
        <Container
          className="navbar-brand   h1 mb-0 text-small font-medium"
          style={{ paddingTop: "10%" }}
        />
      </Grid>
    </Grid>
  </Nav>
);

const NavigationNonAuth = () => (
  <Nav className="navbar  navbar-expand-lg fixed-top is-white is-dark-text ">
    <Grid container spacing={10}>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-large font-medium">
          GreenHouse Controller
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
          </li>
        </Container>
      </Grid>
      <Grid className="button-lamp-grid" item xs={2} sm={2} lg={2} xl={2}>
        <Container className="navbar-brand   h1 mb-0 text-small font-medium">
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </li>
        </Container>
      </Grid>
    </Grid>
  </Nav>
);

export default MyNavigation;
