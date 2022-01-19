import React, { Component } from "react";
import firebase from "firebase";
import Form from "./Components/Form/Form";
import Panel from "./Components/Panel/Panel";
import { AuthUserContext } from "../../../../Session";

import "../../../style.css";
import "./Chat.css";

var authUser = null;

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      authUser: null,
      dataSearch: null,
      dataThisChat: null
    };
  }

  onSearchChange = val => {
    if (val) {
      this.setState({ ...{ dataSearch: val } });
    }
  };

  onThisChatChange = val => {
    if (val) {
      this.setState({ ...{ dataThisChat: val } });
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: this.authUser.username, authUser: this.authUser });
    });
  }

  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleLogOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="chat-canvas">
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              this.authUser = authUser;
            }
          }}
        </AuthUserContext.Consumer>
        <div className="app grid-container">
          <div className="app__list grid-item ">
            <Form {...this.state} onThisChatChange={this.onThisChatChange} />
          </div>
          <div className="app__groups grid-item ">
            <Panel
              onSearchChange={this.onSearchChange}
              onCreateChange={this.onSearchChange}
            ></Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
