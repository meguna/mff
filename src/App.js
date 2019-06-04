import React from 'react';
import './App.css';
import RecipeIndex from './modules/RecipeIndex';

function App() {
  return (
    <div className="app">
      <header className="app-main-header">In the Mood for Food</header>
			<RecipeIndex />
    </div>
  );
}

export default App;
