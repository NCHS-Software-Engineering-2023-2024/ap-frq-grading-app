import Header from '../components/Header';
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google';


export default function Dashboard() {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(sessionStorage.getItem('userId') !== null);

    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div >

            <Header />

            <GoogleOAuthProvider clientId="78244490523-lobbagoj7mhobmmc9c8uv06164ivbtqr.apps.googleusercontent.com">
                <h2>React Google Login</h2>
                <br />
                <br />
                {profile ? (
                    <div>
                        <img src={profile.picture} alt="user image" />
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <br />
                        <br />
                        <button onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <button onClick={login}>Sign in with Google 🚀 </button>
                )}
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
            </GoogleOAuthProvider>

            
        </div>
    )
}