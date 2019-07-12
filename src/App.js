import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import RecipeIndex from './modules/RecipeIndex';
import AppErrorBoundary from './modules/errorBoundaries/AppErrorBoundary';
import { useAuth0 } from './react-auth0-wrapper';

function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  document.title = 'In the Mood for Food';

  return (
    <div className="app">
      <BrowserRouter>
        <header className="app-main-header">
          <Link to="/">
            In the Mood for Food
          </Link>

          <div>
            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => loginWithRedirect({})}
              >
                Log in
              </button>
            )}

            {isAuthenticated && (
              <button onClick={() => logout()} type="button">Log out</button>
            )}
          </div>

        </header>
        <Switch>
          <AppErrorBoundary>
            <Route path="/" component={RecipeIndex} />
          </AppErrorBoundary>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
