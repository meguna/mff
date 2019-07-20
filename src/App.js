import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import RecipeIndex from './modules/RecipeIndex';
import AppErrorBoundary from './modules/errorBoundaries/AppErrorBoundary';
import Login from './modules/auth/Login';
import Logout from './modules/auth/Logout';
import AuthButton from './modules/auth/AuthButton';

function App() {
  document.title = 'In the Mood for Food';

  return (
    <div className="app">
      <BrowserRouter>
        <header className="app-main-header">
          <Link className="app-main-header-title" to="/">
            In the Mood for Food
          </Link>
          <AuthButton />
        </header>
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

export default App;
