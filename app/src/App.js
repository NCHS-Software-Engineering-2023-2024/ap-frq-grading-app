import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Info from './pages/Info';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
