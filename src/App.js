import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import RecipeIndex from './modules/RecipeIndex';
import AppErrorBoundary from './modules/errorBoundaries/AppErrorBoundary';
import Login from './modules/auth/Login';
import Logout from './modules/auth/Logout';
import Header from './modules/common/Header';
import Auth0Client from './modules/auth/Auth';

class App extends React.Component {
  componentDidMount() {
    document.title = 'In the Mood for Food';
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <AppErrorBoundary>
              <Route path="/" component={RecipeIndex} />
            </AppErrorBoundary>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
