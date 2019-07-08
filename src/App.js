import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import RecipeIndex from './modules/RecipeIndex';
import AppErrorBoundary from './modules/errorBoundaries/AppErrorBoundary';

function App() {
  document.title = 'In the Mood for Food';
  return (
    <div className="app">
      <BrowserRouter>
        <header className="app-main-header">
          <Link to="/">
            In the Mood for Food
          </Link>
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
