import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Menu, X } from 'react-feather';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import LangChange from './LangChange';

class HeaderMobile extends Component {
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
            <LangChange />
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

  render() {
    const { location } = this.props;
    const { isMenuOpen } = this.state;

    if (location.pathname === '/welcome' || location.pathname === 'logout') {
      return null;
    }
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
}

HeaderMobile.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  loadingAuth: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withTranslation()(withRouter(HeaderMobile)));
