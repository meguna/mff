import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <div>
          <Link to="/login">Log In</Link>
        </div>
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Welcome.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  Welcome,
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
