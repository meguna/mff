import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';

class AuthButton extends Component {
  componentDidMount() {

  }

  render() {
    const { isAuthenticated, loadingAuth } = this.props;
    if (!loadingAuth) {
      if (!isAuthenticated) {
        return (
          <div className="auth-button-wrapper">
            <Link className="auth-button-link" to="/login">Log In</Link>
          </div>
        );
      }
      return (
        <div className="auth-button-wrapper">
          <Link className="auth-button-link" to="/account">Account</Link>
          <Link className="auth-button-link" to="/logout">Log Out</Link>
        </div>
      );
    }
    return null;
  }
}

AuthButton.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loadingAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AuthButton);
