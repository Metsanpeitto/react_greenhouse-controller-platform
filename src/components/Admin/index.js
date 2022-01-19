import React, { Component } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";

import { Container } from "../styled-components";

import "../style.css";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <Container
          className="is-dark-text-light mb-4 user-card  is-card-dark text-large"
          style={{ padding: "1%", margin: "5%", textAlign: "center" }}
        >
          Admin
          {loading && (
            <div className="is-light-text" style={{ textAlign: "center" }}>
              Loading ...{" "}
            </div>
          )}
          <UserList users={users} />
        </Container>
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <Container
    className="is-light-text mb-4 card  is-card-dark"
    style={{ padding: "1%", width: "max-content", alignSelf: "center" }}
  >
    <Container className="is-light-text letter-spacing text-small">
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong className="is-dark-text-light">ID:</strong> {user.uid}
          </span>
          <hr />
          <span>
            <strong className="is-dark-text-light">E-mail:</strong> {user.email}
          </span>
          <hr />
          <span>
            <strong className="is-dark-text-light">Username:</strong>{" "}
            {user.username}
          </span>
        </li>
      ))}
    </Container>
  </Container>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase
)(AdminPage);
