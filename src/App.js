import React from 'react';
import './App.css';
import AppRouter from './routes';

function App() {
  return (
    <div className="app">
      <header className="app-main-header">In the Mood for Food</header>
			<AppRouter />
    </div>
  );
}

export default App;
