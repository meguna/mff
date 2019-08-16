import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeIndex from './modules/RecipeIndex';
import AppErrorBoundary from './modules/errorBoundaries/AppErrorBoundary';
import Login from './modules/auth/Login';
import Logout from './modules/auth/Logout';
import Signup from './modules/auth/Signup.jsx';
import Welcome from './modules/Welcome';
import AccountSettings from './modules/AccountSettings';
import Header from './modules/common/Header';

class App extends React.Component {
  componentDidMount() {
    document.title = 'In the Mood for Food';
    const { checkAuthStatus, fetchRecipes, sortMethod } = this.props;
    checkAuthStatus()
      .then((res) => {
      })
      .catch((err) => {
      })
      .finally(() => {
        fetchRecipes(sortMethod);
      });
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
  checkAuthStatus: PropTypes.func.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  sortMethod: PropTypes.string.isRequired,
  loadingAuth: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default App;
