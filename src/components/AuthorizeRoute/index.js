import React, { Fragment } from "react";
import { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export default class AuthorizeRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      authenticated: false
    };
  }

  componentDidMount() {
    this.populateAuthenticationState();
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const redirectUrl = "/login";
    return (
      <Route
        {...rest}
        render={props => {
          if (!this.state.ready) return <Fragment />;

          if (this.state.authenticated) {
            return <Component {...props} />;
          } else {
            return <Redirect to={redirectUrl} />;
          }
        }}
      />
    );
  }

  async populateAuthenticationState() {
    await this.setState({ ready: true, authenticated: true });
  }
}
