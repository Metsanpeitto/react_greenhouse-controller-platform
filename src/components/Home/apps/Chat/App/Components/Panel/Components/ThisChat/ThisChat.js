import React, { Component } from "react";
import { Container } from "../../../../../../../components/styled-components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { CreatePrivateChat } from "../CreatePrivateChat.js";

const options = ["Send a message"];

class ThisChat extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.user) {
      console.log(nextProps);
    }
  }

  onSearchChange = obj => {
    if (obj) {
      var data = obj;
      this.props.onSearchChange(data);
    }
  };

  userRefLocal = () => {
    var unitname = this.state.authUser.unitname;
    this.props.firebase.db
      .ref(`/units/${unitname}/chat/users/`)
      .limitToLast(10)
      .on("value", item => {
        if (item !== null) {
          this.setState(
            {
              ...{ list: Object.values(item.val()) }
            },
            () => {}
          );
          return "OK";
        }
      });
  };

  userRefGlobal = () => {
    this.props.firebase.db
      .ref(`/chat/users/`)
      .limitToLast(10)
      .on("value", item => {
        if (item !== null) {
          this.setState(
            {
              ...{ list: Object.values(item.val()) }
            },
            () => {}
          );
          return "OK";
        }
      });
  };

  render(props) {
    return <p>Waiting parameters</p>;
  }
}

export default ThisChat;
