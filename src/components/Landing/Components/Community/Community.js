import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";
import Footer from "../Footer/Footer";
import text1 from "./text1";
import text2 from "./text2";
import text3 from "./text3";

import "../../../style.css";
import imgCommunity from "../../../../img/communityLandscape.png";
import fadeCommunity from "../../../../img/fadeCommunity.png";
import communityIcon from "../../../../img/communityIcon.png";
import chatGlobalIcon from "../../../../img/chatGlobalIcon.png";
import calendarIcon from "../../../../img/calendarIcon.png";

class Community extends Component {
  componentWillMount() {
    window.onbeforeunload = function() {
      window.scrollTo(0, 0);
    };
  }

  render() {
    return (
      <div className="community-canvas">
        <div className="community-header">
          <img className="community-imgBeach" src={imgCommunity} style={{}} />
          <div className="img-beach-text">
            <img className="community-imgFade" src={fadeCommunity} />
            <strong className="text-x-large community-text-header">
              Community
            </strong>
          </div>
        </div>
        <div className="community-body">
          <div className="community-body-up ">
            {text1} <img className="community-icon" src={communityIcon} />
          </div>
          <div className="community-body-center ">
            <img className="chat-global-icon" src={chatGlobalIcon} /> {text2}
          </div>
          <div className="community-body-low">
            {text3}
            <img className="calendar-icon" src={calendarIcon} />
          </div>
          <div className="community-contact text-large bold-text">
            We invite you to experience the application by yourself clicking
            <Link to={ROUTES.SIGN_IN} className="link-signin-webpage ">
              here
            </Link>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

const CommunityLink = () => (
  <p>
    more about <Link to={ROUTES.COMMUNITY}> Nurumia ></Link>
  </p>
);
export default Community;
export { CommunityLink };
