import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import RecipeIndex from './modules/RecipeIndex';
import AppErrorBoundary from './modules/errorBoundaries/AppErrorBoundary';
import Login from './modules/auth/Login';
import Logout from './modules/auth/Logout';
import Signup from './modules/auth/Signup';
import Welcome from './modules/Welcome';
import AccountSettings from './modules/AccountSettings';
import Header from './modules/common/Header';
import Auth0Client from './modules/auth/Auth';

export const MOBILE_THRESHOLD = 768;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    const { checkAuthStatus, fetchRecipes, sortMethod } = this.props;

    const cb = () => {
      const { i18n } = this.props;
      fetchRecipes(sortMethod);
      /* language is stored in as the "nickname" parameter. See longer
       * explanation in Auth.js
       */
      const { nickname: lang } = Auth0Client.getProfile();
      i18n.changeLanguage(lang);
    };
    checkAuthStatus(cb);
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const { setScreen } = this.props;
    if (window.innerWidth < MOBILE_THRESHOLD) {
      setScreen('mobile');
    } else {
      setScreen('desktop');
    }
  }

  render() {
    const { loadingAuth, isAuthenticated } = this.props;
    if (loadingAuth) {
      return null;
    }
    return (
      <div className="app">
        <BrowserRouter>
          {!loadingAuth && !isAuthenticated && (
            <Redirect to="/welcome" />
          )}
          <Header />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/account" component={AccountSettings} />
            <Route
              path="/"
              render={props => (
                <AppErrorBoundary>
                  <RecipeIndex {...props} />
                </AppErrorBoundary>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  setScreen: PropTypes.func.isRequired,
  checkAuthStatus: PropTypes.func.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  sortMethod: PropTypes.string.isRequired,
  loadingAuth: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  i18n: PropTypes.shape({
    changeLanguage: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTranslation('common')(App);
