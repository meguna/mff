import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  login,
} from '../Actions/index';
import './styles.css';

class AuthButton extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <div className="auth-button"><Link to="/login">Log In</Link></div>;
    }
    return <div className="auth-button"><Link to="/logout">Log Out</Link></div>;
  }
}

AuthButton.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

AuthButton.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
