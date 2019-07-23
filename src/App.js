import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipeIndex from './modules/RecipeIndex';
import AppErrorBoundary from './modules/errorBoundaries/AppErrorBoundary';
import Login from './modules/auth/Login';
import Logout from './modules/auth/Logout';
import Welcome from './modules/Welcome';
import Header from './modules/common/Header';
import { login, checkAuthStatus, fetchRecipes } from './modules/Actions/index';

class App extends React.Component {
  componentDidMount() {
    document.title = 'In the Mood for Food';
    const { checkAuthStatus, isAuthenticated, history } = this.props;
    checkAuthStatus()
      .finally(() => {
        console.log("finally")
        if (!isAuthenticated) {
          history.push('/welcome');
        }
      });
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          {/* Don't display header on welcome page */}
          {window.location.pathname !== '/welcome' && <Header />}
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/welcome" component={Welcome} />
            <Route
              exact
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
};

const mapStateToProps = state => state;

const mapDispatchToProps = { login, checkAuthStatus, fetchRecipes };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
