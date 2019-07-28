import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  signup,
} from '../Actions/index';

class Signup extends Component {
  componentDidMount() {
    const { isAuthenticated, signup } = this.props;
    if (!isAuthenticated) {
      signup();
    }
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

Signup.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Signup.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
