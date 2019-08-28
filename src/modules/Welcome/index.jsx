import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import { withTranslation } from 'react-i18next';
import LangChange from './components/LangChange';
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
    const { t, screen } = this.props;
    return (
      <div id="welcome">
        <header className="welcome-header">
          <Link className="w-main-title-link" to="/welcome">
            {t('common:welcome.app-name')}
          </Link>
          <LangChange />
        </header>
        <section className="section-1">
          <div className="section-title-wrapper">
            <h1 className="section-title">
              {t('common:welcome.big-title')}
            </h1>
            <p className="section-caption">
              {t('common:welcome.big-desc')}
            </p>
          </div>
          <div className="links-row">
            <Link className="welcome-action-unfilled" to="/signup">
              {t('common:header.signup')}
            </Link>
            <Link className="welcome-action-unfilled" to="/login">
              {t('common:header.login')}
            </Link>
          </div>
          {(screen !== 'mobile') && (
            <img
              className="kitchen-table-image"
              src="/api/welcomeimages/kitchen_table_1x.png"
              srcSet="/api/welcomeimages/kitchen_table_1x.png 1x,
                /api/welcomeimages/kitchen_table_2x.png 2x"
              alt="kitchen table illustration"
            />
          )}
          {(screen !== 'mobile') && (
            <img
              className="cookie-desktop-image"
              src="/api/welcomeimages/desktop_cookie_1x.png"
              srcSet="/api/welcomeimages/desktop_cookie_1x.png 1x,
                /api/welcomeimages/desktop_cookie_2x.png 2x"
              alt="monkey chef illustration"
            />
          )}
          {(screen === 'mobile') && (
            <img
              className="cookie-mobile-image"
              src="/api/welcomeimages/mobile_cookie_1x.png"
              srcSet="/api/welcomeimages/mobile_cookie_1x.png 1x,
                /api/welcomeimages/mobile_cookie_2x.png 2x"
              alt="monkey chef illustration"
            />
          )}
          {(screen !== 'mobile') && (
            <img
              className="recipe-corner-image"
              src="/api/welcomeimages/recipe_corner_1x.png"
              srcSet="/api/welcomeimages/recipe_corner_1x.png 1x,
                /api/welcomeimages/recipe_corner_2x.png 2x"
              alt="abstract recipe illustration"
            />
          )}
          {(screen !== 'mobile') && (
            <div className="down-button-wrapper-wrapper">
              <p className="down-button-desc">{t('common:welcome.scroll')}</p>
              <a href="#section-2" className="down-button-wrapper">
                <ChevronDown />
              </a>
            </div>
          )}
        </section>
        <section className="section-2">
          <h1 className="section-title regular-section-title" id="section-2">
            {t('common:welcome.features')}
          </h1>
          <div className="w-feature-row-wrapper">
            <div className="w-feature-wrapper">
              <img
                className="w-feature-image"
                src="/api/welcomeimages/complexity_1x.png"
                srcSet="/api/welcomeimages/complexity_1x.png 1x,
                  /api/welcomeimages/complexity_2x.png 2x"
                alt="ramen illustration"
              />
              <h3 className="w-feature-section-title">
                {t('common:welcome.complex-title')}
              </h3>
              <p className="w-feature-description">
                {t('common:welcome.complex-desc')}
              </p>
            </div>
            <div className="w-feature-wrapper">
              <img
                className="w-feature-image"
                src="/api/welcomeimages/mobility_1x.png"
                srcSet="/api/welcomeimages/mobility_1x.png 1x,
                  /api/welcomeimages/mobility_2x.png 2x"
                alt="pizza in single slice wrapper illustration"
              />
              <h3 className="w-feature-section-title">
                {t('common:welcome.mobile-title')}
              </h3>
              <p className="w-feature-description">
                {t('common:welcome.mobile-desc')}
              </p>
            </div>
            <div className="w-feature-wrapper">
              <img
                className="w-feature-image"
                src="/api/welcomeimages/sortsearch_1x.png"
                srcSet="/api/welcomeimages/sortsearch_1x.png 1x,
                  /api/welcomeimages/sortsearch_2x.png 2x"
                alt="cupcakes illustration"
              />
              <h3 className="w-feature-section-title">
                {t('common:welcome.ss-title')}
              </h3>
              <p className="w-feature-description">
                {t('common:welcome.ss-desc')}
              </p>
            </div>
          </div>
        </section>
        <section className="section-3">
          <h1 className="section-title regular-section-title" id="section-2">
            {t('common:welcome.screenshots')}
          </h1>
          <div className="w-sshot-wrapper-wrapper">
            <div className="w-sshot-wrapper">
              <img
                className="w-sshot-image"
                src="/api/welcomeimages/listview_1x.png"
                srcSet="/api/welcomeimages/listview_1x.png 1x,
                  /api/welcomeimages/listview_2x.png 2x"
                alt="cupcakes illustration"
              />
              <div className="w-sshot-info">
                <h3 className="w-sshot-title">{t('common:welcome.view-title')}</h3>
                <p className="w-sshot-desc">{t('common:welcome.view-desc')}</p>
              </div>
            </div>
            <div className="w-sshot-wrapper">
              <img
                className="w-sshot-image"
                src="/api/welcomeimages/editview_1x.png"
                srcSet="/api/welcomeimages/editview_1x.png 1x,
                  /api/welcomeimages/editview_2x.png 2x"
                alt="cupcakes illustration"
              />
              <div className="w-sshot-info">
                <h3 className="w-sshot-title">{t('common:welcome.edit-title')}</h3>
                <p className="w-sshot-desc">{t('common:welcome.edit-desc')}</p>
              </div>
            </div>
          </div>
        </section>
        <footer className="welcome-footer">
          <img
            src="/api/welcomeimages/github.svg"
            className="footer-gh-logo"
            alt="github logo"
          />
          <a href="https://github.com/meguna/inthemoodforfood">
            {t('common:welcome.github')}
          </a>
          <p>{t('common:welcome.cp')}</p>
        </footer>
      </div>
    );
  }
}

Welcome.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

Welcome.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  Welcome,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Welcome));
