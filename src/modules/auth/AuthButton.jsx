import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import LangChange from '../common/LangChange';
import './styles.css';

class AuthButton extends Component {
  componentDidMount() {

  }

  render() {
    const { isAuthenticated, loadingAuth, t } = this.props;
    if (!loadingAuth) {
      if (!isAuthenticated) {
        return (
          <div className="auth-button-wrapper">
            <LangChange />
            <Link className="auth-button-link" to="/login">
              {t('common:header.login')}
            </Link>
          </div>
        );
      }
      return (
        <div className="auth-button-wrapper">
          <LangChange />
          <Link className="auth-button-link" to="/account">
            {t('common:header.account')}
          </Link>
          <Link className="auth-button-link" to="/logout">
            {t('common:header.logout')}
          </Link>
        </div>
      );
    }
    return null;
  }
}

AuthButton.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loadingAuth: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withTranslation()(AuthButton));
