import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Auth0Client from './Auth';
import {
  login,
} from '../Actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      history.push('/');
    }
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  handlePassChange(e) {
    e.preventDefault();
    this.setState({ pass: e.target.value });
  }

  handleSubmit(e) {
    const { email, pass } = this.state;
    e.preventDefault();
    const nonce = Math.floor(Math.random() * 100000);
    console.log(nonce);
    sessionStorage.setItem('stateid', nonce);
    Auth0Client.signIn(email, pass);
  }

  render() {
    const { email, pass } = this.state;
    return (
      <form id="auth0-lock-wrapper-box" onSubmit={this.handleSubmit}>
        <label>
          <input
            type="email"
            placeholder="email address"
            value={email}
            onChange={this.handleEmailChange}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="password"
            value={pass}
            onChange={this.handlePassChange}
          />
        </label>
        <input type="submit" />
      </form>
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
