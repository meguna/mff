import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import './styles.css';

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
        <header className="welcome-header">
          <p>Foodnotes</p>
          <div className="welcome-action-login-wrapper">
            <Link className="welcome-action-login" to="/login">Log In</Link>
          </div>
        </header>
        <section className="section-1">
          <div className="section-title-wrapper">
            <h1 className="section-title">
              Experimenting in the kitchen has never felt better.
            </h1>
            <p className="section-caption">
              Designed with serious cooking and baking enthusiasts in mind,
              Foodnotes is a free recipe manager that helps you build complex
              recipes then track then search them.
            </p>
          </div>
        </section>
        <div className="links-row">
          <Link className="welcome-action-filled" to="/signup">Sign Up</Link>
          <Link className="welcome-action-filled" to="/">Try without Signing Up</Link>
        </div>
        <div className="down-button-wrapper-wrapper">
          <p className="down-button-desc">scroll to read more</p>
          <div className="down-button-wrapper">
            <ChevronDown />
          </div>
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
