import React, { Component } from "react";
import { Container } from "../../../../../components/styled-components";
import { Button } from "@material-ui/core";
import Message from "../Message/Message";
import { withFirebase } from "../../../../../../Firebase";
import { AuthUserContext } from "../../../../../../Session";
import "./Form.css";

var authUser = null;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      message: "",
      list: [],
      myName: props.user,
      authUser: null,
      dataSearch: null,
      unitname: null,
      group: null,
      ref: null,
      background: "rgb(128, 145, 171)",
      backgroundImage: null,
      disabled: true
    };

    this.messageLocalGroupRef = this.messageLocalGroupRef.bind(this);
    this.messageGlobalGroupRef = this.messageGlobalGroupRef.bind(this);

    this.pushMessage = this.pushMessage.bind(this);
  }

  messageLocalGroupRef = (unitname, group, chatpublic, group1, group2) => {
    var ref = null;
    if (group) {
      if (chatpublic === true) {
        ref = this.props.firebase.db.ref(
          `/units/${unitname}/chat/groups/${group}/messages/`
        );
      } else {
        ref = this.props.firebase.db.ref(
          `/units/${unitname}/chat/groups-private/${group1}/messages/`
        );
      }

      ref.limitToLast(10).on("value", message => {
        console.log(
          `Looking for messages in ${unitname} with the name ${group1} because chatpublic is ${chatpublic}`
        );
        if (message.val()) {
          var thisObj = Object.values(message.val());
          console.log(thisObj);

          this.setState(
            {
              ...{
                list: Object.values(thisObj),
                ref: ref,
                group: group,
                background: "white",
                backgroundImage: null,
                disabled: false
              }
            },
            () => {
              console.log(this.state.group);
            }
          );
        } else {
          console.log("try with " + `${group2}`);

          ref = this.props.firebase.db.ref(
            `/units/${unitname}/chat/groups-private/${group2}/messages/`
          );
          group = group2;

          ref.limitToLast(10).on("value", message => {
            var things = message.val();

            if (message.val()) {
              var thisObj = Object.values(message.val());
              this.setState(
                {
                  ...{
                    list: Object.values(thisObj),
                    ref: ref,
                    group: group,
                    background: "white",
                    backgroundImage: null,
                    disabled: false
                  }
                },
                () => {
                  console.log(this.state.group);
                }
              );
            }
          });
        }
      });
    }
  };

  messageGlobalGroupRef = (group, chatpublic) => {
    var ref = null;
    if (group) {
      if (chatpublic === true) {
        ref = this.props.firebase.db.ref(`/chat/groups/${group}/messages/`);
      } else {
        ref = this.props.firebase.db.ref(
          `/chat/groups-private/${group}/messages/`
        );
      }
      ref.limitToLast(10).on("value", message => {
        var thisObj = Object.values(message.val());
        if (thisObj) {
          this.setState(
            {
              list: Object.values(thisObj),
              ref: ref,
              background: "white",
              backgroundImage: "none",
              disabled: false
            },
            () => {}
          );
        }
      });
    }
  };

  pushMessage = newItem => {
    if (newItem !== undefined && this.state.authUser.unitname !== undefined) {
      var ref;
      console.log(this.state.ref);

      if (this.state.ref) {
        ref = this.state.ref;
        console.log(ref);
        console.log(newItem);
        ref.push(newItem);
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      let shortName = nextProps.user;
      let unitname = "unit1";
      let group = "main-group";
      let group1 = null;
      let group2 = null;
      let area = null;
      let type = null;
      let chatPublic = null;

      var thisState = {
        ...{
          userName: shortName,
          authUser: nextProps.authUser,
          dataSearch: nextProps.dataSearch
        }
      };

      this.setState({ ...thisState }, () => {});

      if (nextProps.dataSearch) {
        unitname = nextProps.dataSearch.unitname;
        group = nextProps.dataSearch.group;
        group1 = nextProps.dataSearch.group1;
        group2 = nextProps.dataSearch.group2;

        area = nextProps.dataSearch.area;
        type = nextProps.dataSearch.type;
        chatPublic = true;

        this.setState(
          { ...{ userName: nextProps.dataSearch.username } },
          () => {}
        );

        if (nextProps.dataSearch.chatPublic === false) {
          chatPublic = false;
        }
        console.log(nextProps.dataSearch.chatPublic);

        if (area === "local") {
          if (type === "group") {
            this.messageLocalGroupRef(
              unitname,
              group,
              chatPublic,
              group1,
              group2
            );
          }
        } else {
          if (type === "group") {
            this.messageGlobalGroupRef(group, chatPublic, group1, group2);
          }
        }
      }
    }
  }

  componentDidMount(props) {
    if (props !== undefined) {
      this.componentWillReceiveProps(props);
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

  onThisChatChange = obj => {
    if (obj) {
      var data = obj;
      this.props.onThisChatChange(data);
    }
  };

  render(props) {
    {
      var group = null;

      if (this.state.group) {
        group = this.state.group;
      }
      if (props !== undefined) {
        this.componentWillReceiveProps(props);
        if (this.state.dataSearch.group) {
          group = this.state.dataSearch.group;
        }
      }

      if (this.state.dataSearch) {
        if (this.state.dataSearch.group) {
          group = this.state.dataSearch.group;
        }
      }

      var classMessage = "form__message";

      if (this.state.background === "white") {
        classMessage = "form__message2";
      }
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
        <Container className="card is-dark-text-light chat-grid-card  is-card-dark">
          <div className="chat-title">{group ? group : "No chat"}</div>

          <Container className="card-heading">
            <Container className="is-dark-text-light letter-spacing text-small">
              <div className="form">
                <div
                  className={classMessage}
                  style={{
                    background: this.state.background
                  }}
                >
                  {this.state.list.map((item, index) => (
                    <Message
                      key={index}
                      message={item}
                      userName={this.state.userName}
                    />
                  ))}
                </div>
              </div>
            </Container>
            <div className="form__row">
              <input
                className="form__input"
                type="text"
                placeholder="Type message"
                value={this.state.message}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
                disabled={this.state.disabled ? true : false}
              />
              <Button
                style={{
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "grey"
                }}
                className="form__button"
                onClick={this.handleSend.bind(this)}
                disabled={this.state.disabled ? true : false}
              >
                send
              </Button>
            </div>
          </Container>
        </Container>
      </div>
    );
  }
}

export default withFirebase(Form);
