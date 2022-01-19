import React from "react";
import { Container, Nav } from "./styled-components";
import "../style.css";

function Navbar(props) {
  return (
    <Nav className="navbar  navbar-expand-lg fixed-top is-white is-dark-text ">
      <Container className="navbar-brand   h1 mb-0 text-large font-medium">
        <img alt="" src={require("./Logo.png")} />{" "}
      </Container>
    </Nav>
  );
}

export default Navbar;
