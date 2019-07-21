import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  login,
  signup,
} from '../Actions/index';

class Welcome extends Component {
  componentDidMount() {
  }

  componentDidUpdate() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      history.push('/');
    }
  }

  render() {
    return (
      <div id="welcome">
        <p>Welcome</p>
      </div>
    );
  }
}

Welcome.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  Welcome: PropTypes.func.isRequired,
};

Welcome.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  Welcome,
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
