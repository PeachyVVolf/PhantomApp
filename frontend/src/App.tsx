import React from 'react';
import './App.css';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Phantom App Login</h1>
        <CreateUser/>
      </header>
    </div>
  );
}

export default App;
