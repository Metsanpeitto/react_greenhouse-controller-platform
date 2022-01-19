import React, { Component } from "react";
import { Container } from "../../../../../components/styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { withFirebase } from "../../../../../../Firebase";
import { AuthUserContext } from "../../../../../../Session";
import Create from "./Components/Create/Create";
import Search from "./Components/Search/Search";
import ThisChat from "./Components/ThisChat/ThisChat";

import "./Panel.css";

var authUser = null;

const buttonStyle = {
  color: "white",
  backgroundColor: "rgba(213, 213, 213, 0.21)"
};

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      message: "",
      list: [],
      myName: props.user,
      authUser: null,
      clickedCreate: null,
      clickedSearch: null,
      clickedChat: null,
      createPrivate: null
    };
    this.messageRef = this.messageRef.bind(this);
    this.pushMessage = this.pushMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  messageRef = () => {
    this.props.firebase.db
      .ref(`/units/${this.authUser.unitname}/chat/messages/`)
      .once("value")
      .then(snapshot => {
        const message = snapshot.val();
        if (message) {
          return message;
        }
      });
  };

  pushMessage = newItem => {
    if (newItem !== undefined && this.state.authUser.unitname !== undefined) {
      this.props.firebase.db
        .ref(`/units/${this.authUser.unitname}/chat/messages/`)
        .push(newItem);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      let shortName = nextProps.user;
      var thisState = {
        ...{ userName: shortName, authUser: nextProps.authUser }
      };
      this.setState({ ...thisState }, () => {});

      this.messageRef();
      this.listenMessages();
    }
  }

  componentDidMount(props) {
    if (props !== undefined) {
      this.componentWillReceiveProps(props);
      this.listenMessages(props);
    }
  }

  handleChange(event) {
    this.setState({ ...{ message: event.target.value } });
  }

  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message
      };
      this.pushMessage(newItem);
      this.setState({ ...{ message: "" } });
    }
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }

  handleClick = event => {
    if (event) {
      var target = event.currentTarget.value;
      if (target === "search") {
        this.setState({
          ...{ clickedSearch: true, clickedChat: null, clickedCreate: null }
        });
      }
      if (target === "create") {
        this.setState({
          ...{ clickedSearch: null, clickedChat: null, clickedCreate: true }
        });
      }
      if (target === "chat") {
        this.setState({
          ...{ clickedSearch: null, clickedChat: true, clickedCreate: null }
        });
      }
    }
  };

  render(props) {
    {
      if (props !== undefined) {
        this.componentWillReceiveProps(props);
        this.listenMessages(props);
      }

      var clickedSearch = this.state.clickedSearch;
      var clickedCreate = this.state.clickedCreate;
      var clickedChat = this.state.clickedChat;
    }
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              this.authUser = authUser;
            }
          }}
        </AuthUserContext.Consumer>
        <Container className=" panel-grid-card card  is-card-dark">
          <Container className="card-heading">
            <Container className="is-dark-text-light letter-spacing text-small">
              <div className="panel-card is-card-dark">
                <div className="panel-buttons">
                  <Button
                    value="create"
                    className="panel-create panel-button"
                    variant="contained"
                    style={{
                      color: clickedCreate ? "white" : "rgb(128, 145, 171)",
                      backgroundColor: "transparent"
                    }}
                    onClick={this.handleClick}
                  >
                    Create New Chat
                  </Button>

                  <Button
                    value="search"
                    className="panel-search"
                    variant="contained"
                    style={{
                      color: clickedSearch ? "white" : "rgb(128, 145, 171)",
                      backgroundColor: "transparent"
                    }}
                    onClick={this.handleClick}
                  >
                    Search
                  </Button>
                </div>
                <div className="panel-main-card  is-card-dark">
                  {clickedSearch ? (
                    <Search
                      {...this.state}
                      onSearchChange={this.props.onSearchChange}
                      val={this.state.val}
                    />
                  ) : null}
                  {clickedCreate ? (
                    <Create
                      {...this.state}
                      onCreateChange={this.props.onCreateChange}
                    />
                  ) : null}
                </div>
              </div>
            </Container>
          </Container>
        </Container>
      </div>
    );
  }
}

export default withFirebase(Panel);
