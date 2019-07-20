import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  logout,
} from '../Actions/index';

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { logout, history } = this.props;
    logout();
    history.push('/');
  }

  render() {
    return (
      <div id="auth0-lock-wrapper-box" />
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

Logout.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
