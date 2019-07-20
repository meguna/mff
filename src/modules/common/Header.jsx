import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthButton from '../auth/AuthButton';
import { checkAuthStatus } from '../Actions/index';

class Header extends Component {
  componentDidMount() {
    const { checkAuthStatus } = this.props;
    // checkAuthStatus();
  }

  render() {
    return (
      <Fragment>
        <header className="app-main-header">
          <Link className="app-main-header-title" to="/">
            In the Mood for Food
          </Link>
          <AuthButton />
        </header>
      </Fragment>
    );
  }
}

Header.propTypes = {
  checkAuthStatus: PropTypes.func.isRequired,
};

Header.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  checkAuthStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
