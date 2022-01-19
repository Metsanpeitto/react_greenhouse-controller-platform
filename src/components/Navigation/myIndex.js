import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import ResponsiveMenu from "react-responsive-navbar";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthUserContext } from "../Session";
import { withAuthentication } from "../Session";
import "./Logo.png";
import IconNurumia from "./IconNurumia";
import "../style.css";

const Menu = styled.div`

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1400px) and (max-device-width: 1824px) {
  border-bottom: 2px solid #3f52b5;
  margin: 0%;
  background-color: white;
  flex: 1;
  text-align: start;
  width: 100%;
  height: 100px;
  ul {
    padding-top: 30px;
    margin: %;
  }

  a {
    text-decoration: none;   
    font-size: 20px;
    color: #3f52b5;
    &:hover {
      color: #8895dc;
    }
  }

  img {
    vertical-align: bottom;
    border-style: none;
}

}
 
  @media only screen and (min-width: 1024px) and (max-device-width: 1400px) {
    border-bottom: 2px solid #3f52b5;
    margin: 0%;
    background-color: white;
    flex: 1;
    text-align: start;
    width: 100%;
    height: 60px;
    ul {
      padding-top: 2px;
      padding-left:1%;
      margin: %;
    }
  
    a {
      text-decoration: none;   
      font-size: 20px;
      color: #3f52b5;
      &:hover {
        color: #8895dc;
      }
    }

    img {
      vertical-align: bottom;
      border-style: none;
  }
   
  }

  @media (max-width: 500px) {
    border-bottom: 2px solid #3f52b5;
    margin: 0%;
    background-color: white;
    flex: 1;
    text-align: center;
    width: 100%;
    height:fit-content
    ul {   display: grid;
           padding-top: 3%; 
           margin: 0%;
    }
    li {
      display: block;
      font-size: 1.125rem;
      list-style-type: none;
      margin: 5%;
    }
    a {
      text-decoration: none;
  
      font-size: 20px;
      color: #3f52b5;
      &:hover {
        color: #8895dc;
      }
  }
`;

var auth = false;

const MyNavigation = props => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => {
        if (authUser !== null) {
          if (authUser.username !== undefined) {
            auth = true;
            return <NavigationAuth />;
          } else {
            return <NavigationNonAuth />;
          }
        } else {
          return <NavigationNonAuth />;
        }
      }}
    </AuthUserContext.Consumer>
  </div>
);

//{authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
const NavigationAuth = () => (
  <ResponsiveMenu
    menuOpenButton={<FaBars size={30} color="#3f52b5" />}
    menuCloseButton={<FaTimes size={30} color="#3f52b5" />}
    changeMenuOn="500px"
    largeMenuClassName="large-menu-classname"
    smallMenuClassName="small-menu-classname"
    menu={
      <div>
        <Menu>
          <div className="menuNavAuth">
            <ul className="menu-nav-ul-aut">
              <Link to={ROUTES.HOME} className="link-logo-aut">
                <IconNurumia style={{ height: "40% !important" }} />
              </Link>
              <div className="link-links-aut">
                <Link to={ROUTES.LANDING} className="link-landing">
                  The Platform
                </Link>
                <Link to={ROUTES.HOME} className="link-home">
                  Home
                </Link>
                <Link to={ROUTES.ACCOUNT} className="link-account">
                  Account
                </Link>
              </div>
              <SignOutButton />
            </ul>
          </div>
        </Menu>
      </div>
    }
  />
);

const NavigationNonAuth = props => (
  <ResponsiveMenu
    className="responsive-menu"
    menuOpenButton={<FaBars size={30} color="#3f52b5" />}
    menuCloseButton={<FaTimes size={30} color="#3f52b5" />}
    changeMenuOn="500px"
    largeMenuClassName="large-menu-classname"
    smallMenuClassName="small-menu-classname"
    menu={
      <Menu>
        <div className="menuNavNoAuth">
          <ul className="menu-nav-ul">
            <Link to={ROUTES.LANDING} className="link-logo-noaut">
              <IconNurumia />
            </Link>
            <div className="link-links-noaut">
              <Link to={ROUTES.LANDING} className="link-project-noau ">
                The Platform
              </Link>
              <Link to={ROUTES.SIGN_IN} className="link-noau ">
                Sign In
              </Link>
            </div>
          </ul>
        </div>
      </Menu>
    }
  />
);

export default withAuthentication(MyNavigation);
