import React, { Component } from "react";

import "./Message.css";

export default class Message extends Component {
  render() {
    if (this.props.userName === this.props.message.userName) {
      return <div className="mymessage">{this.props.message.message}</div>;
    } else {
      return (
        <div className="theirmessage">
          <span className="message_author">{this.props.message.userName}:</span>
          {this.props.message.message}
        </div>
      );
    }
  }
}
