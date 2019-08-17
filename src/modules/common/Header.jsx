import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthButton from '../auth/AuthButton';

class Header extends Component {
  componentDidMount() {

  }

  render() {
    const { location } = this.props;
    if (location.pathname === '/welcome' || location.pathname === 'logout') {
      return null;
    }
    return (
      <Fragment>
        <header className="app-main-header">
          <Link className="app-main-header-title" to="/">
            Foodnotes
          </Link>
          <AuthButton />
        </header>
      </Fragment>
    );
  }
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(Header));
