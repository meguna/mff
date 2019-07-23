import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
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
    const { checkAuthStatus, fetchRecipes, sortMethod } = this.props;
    checkAuthStatus()
      .then(() => {
        fetchRecipes(sortMethod);
      });
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          {/* Don't display header on welcome page */}
          {window.location.pathname !== '/welcome' && <Header />}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/welcome" component={Welcome} />
            <AppErrorBoundary>
              <Route path="/" component={RecipeIndex} />
            </AppErrorBoundary>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
