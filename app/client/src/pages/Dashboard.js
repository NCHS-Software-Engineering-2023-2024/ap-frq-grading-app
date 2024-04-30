import Header from '../components/Header';
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

export default function Dashboard() {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(sessionStorage.getItem('userId') !== null);

    

    return (
        <div >

            <Header />
                <body style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <button onClick={()=>navigate("/rubrics")} className="DashboardButton">
                        Rubrics
                    </button>

                    <button onClick={()=>navigate("/students")} className="DashboardButton">
                        Students
                    </button>

                    <button onClick={()=>navigate("/assignments")} className="DashboardButton">
                        Assignments
                    </button>

                    <button onClick={()=>navigate("/grade")} className="DashboardButton">
                        Grade
                    </button>
                    
                </body>
            

            
        </div>
    )
}