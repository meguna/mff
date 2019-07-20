import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  login,
} from '../Actions/index';

class Login extends Component {
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
      <div id="mff-lock-container" />
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
