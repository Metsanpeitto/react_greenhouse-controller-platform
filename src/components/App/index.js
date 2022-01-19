import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import MyNavigation from "../Navigation/myIndex";
import LandingPage from "../Landing/Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import LearnMore from "../Landing/Components/LearnMore/LearnMore";
import Community from "../Landing/Components/Community/Community";
import Connection from "../Landing/Components/Connection/Connection";
import Market from "../Landing/Components/Market/Market";
import Industry from "../Landing/Components/Industry/Industry";
import Software from "../Landing/Components/Software/Software";
import Hardware from "../Landing/Components/Hardware/Hardware";
import Privacy from "../Landing/Components/Footer/Privacy";
import Disclaimer from "../Landing/Components/Footer/Disclaimer";
import Sitemap from "../Landing/Components/Footer/Sitemap";
import ScrollToTop from "./ScrollToTop";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => (
  <div className="pattern">
    <Router>
      <ScrollToTop />
      <div>
        <div>
          <MyNavigation />
        </div>
        <div>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route
            exact
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
          <Route exact path={ROUTES.LEARN} component={LearnMore} />
          <Route exact path={ROUTES.COMMUNITY} component={Community} />
          <Route exact path={ROUTES.CONNECTION} component={Connection} />
          <Route exact path={ROUTES.MARKET} component={Market} />
          <Route exact path={ROUTES.INDUSTRY} component={Industry} />
          <Route exact path={ROUTES.SOFTWARE} component={Software} />
          <Route exact path={ROUTES.HARDWARE} component={Hardware} />
          <Route exact path={ROUTES.PRIVACY} component={Privacy} />
          <Route exact path={ROUTES.DISCLAIMER} component={Disclaimer} />
          <Route exact path={ROUTES.SITEMAP} component={Sitemap} />
        </div>
      </div>
    </Router>
  </div>
);

export default withAuthentication(App);
