import React from 'react';
import './App.css';
import RecipeList from './modules/RecipeList';

function App() {
  return (
    <div className="app">
      <header className="app-main-header">In the Mood for Food</header>
      <div className="app-recipelist"><RecipeList/></div>
    </div>
  );
}

export default App;
