import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Dashboard
        </p>

        <button className="InfoTab">
          Info
        </button>

        <button className="LogoutButton">
          Logout
        </button>
      </header>

      <body>
        <button className="DashboardButton">
          Rubrics
        </button>

        <button className="DashboardButton">
          Students
        </button>

        <button className="DashboardButton">
          Assignments
        </button>
      </body>
    </div>
  );
}

export default App;
