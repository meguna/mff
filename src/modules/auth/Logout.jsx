import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth0Client from './Auth';

class Logout extends Component {
  componentDidMount() {
    const { history } = this.props;
    Auth0Client.signOut();
    history.push('/');
  }

  render() {
    return (
      <div id="auth0-lock-wrapper-box" />
    );
  }
}

export default Logout;
