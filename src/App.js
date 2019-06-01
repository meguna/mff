import React from 'react';
import './App.css';
import RecipeList from './modules/RecipeList';
import RecipeInfo from './modules/RecipeInfo';

function App() {
  return (
    <div className="app">
      <header className="app-main-header">In the Mood for Food</header>
      <div className="app-recipe-wrapper">
        <div className="app-recipelist"><RecipeList /></div>
        <div className="app-recipelist"><RecipeInfo /></div>
      </div>

    </div>
  );
}

export default App;
