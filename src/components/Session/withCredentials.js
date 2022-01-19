import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withCredentials = Component => {
  class WithCredentials extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        fields: null
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onCredentialsUserListener(
        fields => {
          this.setState({ fields });
        },
        () => {
          this.setState({ fields: null });
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.fields}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithCredentials);
};

export default withCredentials;
