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

  componentDidMount() {
    const { login } = this.props;
    login();
  }


  componentDidUpdate() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
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
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

Login.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
