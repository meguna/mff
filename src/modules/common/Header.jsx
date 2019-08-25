import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Menu, X } from 'react-feather';
import AuthButton from '../auth/AuthButton';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  }

  renderMenuItems() {
    const { loadingAuth, isAuthenticated, t } = this.props;
    if (!loadingAuth) {
      if (!isAuthenticated) {
        return (
          <div className="menu-items-wrapper">
            <Link className="menu-item" to="/login" onClick={this.toggleMenu}>
              {t('common:header.login')}
            </Link>
          </div>
        );
      }
      return (
        <Fragment>
          <Link className="menu-item" to="/account" onClick={this.toggleMenu}>
            {t('common:header.account')}
          </Link>
          <Link className="menu-item" to="/logout" onClick={this.toggleMenu}>
            {t('common:header.logout')}
          </Link>
        </Fragment>
      );
    }
    return null;
  }

  renderMobile() {
    const { isMenuOpen } = this.state;
    return (
      <div className="mobile-header-wrapper">
        <header className="app-main-header">
          <Link className="app-main-header-title" to="/">
            Foodnotes
          </Link>
          <button
            type="button"
            onClick={this.toggleMenu}
            onKeyDown={this.toggleMenu}
            tabIndex="-1"
          >
            {!isMenuOpen && <Menu color="white" />}
            {isMenuOpen && <X color="white" />}
          </button>
        </header>
        {isMenuOpen && this.renderMenuItems()}
      </div>
    );
  }

  render() {
    const { location, screen } = this.props;
    if (location.pathname === '/welcome' || location.pathname === 'logout') {
      return null;
    }
    if (screen === 'mobile') {
      return this.renderMobile();
    }

    /* default desktop header */
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
  loadingAuth: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  screen: PropTypes.string.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withTranslation()(withRouter(Header)));
