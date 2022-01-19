import React, { Component } from "react";
import { withFirebase } from "../../../../../../../../Firebase";
import { AuthUserContext } from "../../../../../../../../Session";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Container } from "../../../../../../../components/styled-components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { CreatePrivateChat } from "../CreatePrivateChat.js";

import Chat from "../../../../Chat";

import "../../Panel.css";

var authUser = null;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const options = ["Send a message"];

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      message: "",
      myName: props.user,
      targetUsername: "",
      targetUnitname: "",
      authUser: null,
      localCheck: false,
      globalCheck: true,
      userCheck: false,
      groupCheck: true,
      list: [],
      itemArea: "",
      itemType: "",
      itemUser: "",
      itemGroup: "",
      value: "local",
      value1: "user",
      setValue: "",
      setValue1: "",
      anchorEl: null,
      selectedIndex: 1,
      setSelectedIndex: 1,
      return: null
    };

    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleGroupClick = this.handleGroupClick.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  onSearchChange = obj => {
    if (obj) {
      var data = obj;
      this.props.onSearchChange(data);
    }
  };

  handleChangeArea = event => {
    if (event) {
      var value = event.target.value;
      this.setState({ ...(value = { value }) });
      if (value === "local") {
        this.setState(
          { ...{ local: true, global: false, itemArea: "local" } },
          () => {
            this.doSearch();
          }
        );
      } else {
        this.setState(
          { ...{ local: false, global: true, itemArea: "global" } },
          () => {
            this.doSearch();
          }
        );
      }
    }
  };

  handleChangeType = event => {
    if (event) {
      var value1 = event.target.value;
      this.setState({ ...(value1 = { value1 }) });
      if (value1 === "user") {
        this.setState(
          { ...{ user: true, group: false, itemType: "user" } },
          () => {
            this.doSearch();
          }
        );
      } else {
        this.setState(
          { ...{ user: false, group: true, itemType: "group" } },
          () => {
            this.doSearch();
          }
        );
      }
    }
  };

  handleGroupClick = (group, area, type) => {
    if (group) {
      if (this.state.authUser.username)
        var username = this.state.authUser.username;
      var unitname = this.state.authUser.unitname;
      var data = { group, username, unitname, area, type };

      this.onSearchChange(data);
      return group, username, unitname, area, type;
    }
  };

  handleClickListItem = event => {
    var target = event.currentTarget;
    var targetUsername = event.currentTarget.getAttribute("itemusername");
    var targetUnitname = event.currentTarget.getAttribute("itemunitname");

    if (target) {
      this.setState(
        {
          ...{
            anchorEl: target,
            targetUsername: targetUsername,
            targetUnitname: targetUnitname
          }
        },
        () => {}
      );
    }
  };

  handleUserClickConfirmation = () => {
    var targetUsername = this.state.targetUsername;
    var targetUnitname = this.state.targetUnitname;
    var authUser = this.state.authUser;
    var data = {
      targetUsername: targetUsername,
      targetUnitname: targetUnitname,
      authUser: authUser
    };

    if (targetUsername) {
      console.log(CreatePrivateChat(data, this.props));
      this.onSearchChange(data);
    }
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ ...{ anchorEl: null } }, () => {});
  };

  groupRefLocal = authUser => {
    var unitname = this.state.authUser.unitname;
    this.props.firebase.db
      .ref(`/units/${unitname}/chat/groups/`)
      .limitToLast(10)
      .on("value", item => {
        if (item !== null) {
          var arr = Object.keys(item.val());
          this.setState(
            {
              ...{ list: arr }
            },
            () => {}
          );
        }
      });
    return "OK";
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

  groupRefGlobal = () => {
    this.props.firebase.db
      .ref(`/chat/groups/`)
      .limitToLast(10)
      .on("value", item => {
        if (item !== null) {
          var arr = Object.keys(item.val());
          this.setState(
            {
              ...{ list: arr }
            },
            () => {}
          );
        }
      });
    return "OK";
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

  doSearch = () => {
    if (this.state.authUser) {
      if (this.state.value === "global" && this.state.value1 === "user") {
        this.userRefGlobal();
      }
      if (this.state.value === "global" && this.state.value1 === "group") {
        this.groupRefGlobal();
      }
      if (this.state.value === "local" && this.state.value1 === "user") {
        this.userRefLocal();
      }
      if (this.state.value === "local" && this.state.value1 === "group") {
        this.groupRefLocal();
      }
    }
  };

  componentDidMount(props) {
    this.doSearch();
  }

  render(props) {
    var thisList = this.state.list;
    var thisArea = this.state.value;
    var thisType = this.state.value1;

    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              this.authUser = authUser;
              if (this.state.authUser === null) {
                this.setState({ ...{ authUser: authUser } }, () => {});
              }
            }
          }}
        </AuthUserContext.Consumer>{" "}
        <div className="panel-create">Search for ...</div>
        <div
          className="panel-search-options card"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <FormControl controlid="fieldarea">
            {" "}
            <div className="search-fieldarea">
              <RadioGroup
                aria-label="area"
                name="area"
                value={this.state.value}
                onChange={this.handleChangeArea}
                style={{ display: "-webkit-inline-box", marginBottom: "0%" }}
              >
                <FormControlLabel
                  className="search-local-button"
                  value="local"
                  control={<Radio color="primary" />}
                  label="Local"
                  style={{}}
                />
                <FormControlLabel
                  className="search-global-button"
                  value="global"
                  control={<Radio color="primary" />}
                  label="Global"
                  style={{}}
                />
              </RadioGroup>
            </div>
          </FormControl>

          <FormControl controlid="fieldtype">
            <div className="search-fieldtype">
              <RadioGroup
                aria-label="type"
                name="type"
                value={this.state.value1}
                onChange={this.handleChangeType}
                style={{ display: "-webkit-inline-box", marginBottom: "0%" }}
              >
                <FormControlLabel
                  className="search-user-button"
                  value="user"
                  control={<Radio color="primary" />}
                  label="User"
                  style={{}}
                />
                <FormControlLabel
                  className="search-group-button"
                  value="group"
                  control={<Radio color="primary" />}
                  label="Group"
                  style={{}}
                />
              </RadioGroup>
            </div>
          </FormControl>
        </div>
        <Container className="search-result-canvas is-dark-text-light letter-spacing text-small">
          {this.state.list[0] ? (
            thisList.map((listMap, index) => {
              if (listMap.username) {
                return (
                  <div className="whatever" key={listMap.username}>
                    <List
                      component="nav"
                      aria-label="Device settings"
                      key="theList"
                    >
                      <ListItem
                        key={listMap.username}
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label={listMap.username}
                        onClick={this.handleClickListItem}
                        itemusername={listMap.username}
                        itemunitname={listMap.unitname}
                        style={{
                          paddingTop: "0%",
                          paddingBottom: "0%"
                        }}
                      >
                        <ListItemText
                          primary={listMap.username}
                          secondary={options[this.state.selectedIndex]}
                        />
                      </ListItem>
                    </List>
                    <Menu
                      id="lock-menu"
                      anchorEl={this.state.anchorEl}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: "center",
                        horizontal: "center"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                      }}
                      className="search-user-popup"
                      keepMounted
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === this.state.selectedIndex}
                          onClick={event =>
                            this.handleUserClickConfirmation(
                              listMap.username,
                              listMap.unitname,
                              listMap.area
                            )
                          }
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                );
              } else {
                return (
                  <div className="listGroup" key={Math.random()}>
                    <List
                      component="nav"
                      aria-label="Device settings"
                      key="theList"
                    >
                      <ListItem
                        key={listMap}
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label={listMap.username}
                        onClick={() =>
                          this.handleGroupClick(listMap, thisArea, thisType)
                        }
                        value={listMap}
                        style={{
                          paddingTop: "0%",
                          paddingBottom: "0%"
                        }}
                      >
                        <ListItemText
                          primary={listMap}
                          secondary={options[this.state.selectedIndex]}
                        />
                      </ListItem>
                    </List>
                  </div>
                );
              }
            })
          ) : (
            <p>Waiting parameters</p>
          )}
        </Container>
      </div>
    );
  }
}

export default withFirebase(Search);
