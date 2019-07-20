import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Auth0Client from './Auth';
import {
  login,
  logout,
} from '../Actions/index';
import './styles.css';

class AuthButton extends Component {
  componentDidMount() {

  }

  render() {
    const isAuth = Auth0Client.isAuthenticated();
    if (!isAuth) {
      return <div className="auth-button"><Link to="/login">Log In</Link></div>;
    }
    return <div className="auth-button"><Link to="/logout">Log Out</Link></div>;
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  login,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
