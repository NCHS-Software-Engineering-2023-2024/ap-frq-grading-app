import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Info from './pages/Info';
import Rubrics from './pages/Rubrics';
import Students from './pages/Students';
import Assignments from './pages/Assignments';
import NewRubric from './pages/rubricPages/NewRubric';
import ViewSavedRubrics from './pages/rubricPages/ViewSavedRubrics';
import Grade from './pages/Grade';
import RubricGrade from './pages/gradePages/RubricGrade';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/info" element={<Info />} />

          <Route path="/rubrics" element={<Rubrics />} />
          <Route path="/rubrics/new" element={<NewRubric />} />
          <Route path="/rubrics/view" element={<ViewSavedRubrics />} />

          <Route path ="/students" element={<Students />} />

          <Route path ="/assignments" element={<Assignments/>} />

          <Route path="/grade" element={<Grade />} />
          <Route path="/grade/new" element={<RubricGrade/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
