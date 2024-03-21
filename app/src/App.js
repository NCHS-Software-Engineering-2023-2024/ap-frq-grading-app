import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Info from './pages/Info';
import Rubrics from './pages/Rubrics';
import Students from './pages/Students';
import Assignments from './pages/Assignments';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/info" element={<Info />} />
          <Route path="/rubrics" element={<Rubrics />} />
          <Route path ="/students" element={<Students />} />
          <Route path ="/assignments" element={<Assignments/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
