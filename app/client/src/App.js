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
import NewRubric from './pages/rubricpages/NewRubric';
import ViewSavedRubrics from './pages/rubricpages/ViewSavedRubrics';
import Grade from './pages/Grade';
import RubricGrade from './pages/gradePages/RubricGrade';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useEffect, useState } from "react";
import axios from 'axios';


function App() {
  const responseMessage = (response) => {
    console.log(response);
  };
const errorMessage = (error) => {
    console.log(error);
  };
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      googleLogout();
      setProfile(null);
  };

  
  return (
     <div>

    <GoogleOAuthProvider clientId="78244490523-lobbagoj7mhobmmc9c8uv06164ivbtqr.apps.googleusercontent.com">
     {<BrowserRouter>
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
      </BrowserRouter>}
      </GoogleOAuthProvider>
    
      {}
    
      

    </div>
  );
}

export default App;
