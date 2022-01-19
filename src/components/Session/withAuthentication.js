import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          this.setState({
            uid: authUser.uid,
            email: authUser.email,
            unitname: authUser.unitname,
            role: authUser.role,
            username: authUser.username
          });
        },
        () => {
          this.setState({});
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
