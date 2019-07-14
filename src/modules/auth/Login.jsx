import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  login,
} from '../Actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const { login, isAuthenticated, history } = this.props;
    if (!isAuthenticated) {
      login();
    } else {
      history.push('/');
    }
  }

  render() {
    return (
      <div id="auth0-lock-wrapper-box" />
    );
  }
}

Login.propTypes = {
};

Login.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
