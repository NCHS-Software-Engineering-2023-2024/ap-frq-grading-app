import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

export default function Header() {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(sessionStorage.getItem('userId') !== null);

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
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    return (
        <div className="App">
            <header className="App-header">
            <GoogleOAuthProvider clientId="78244490523-lobbagoj7mhobmmc9c8uv06164ivbtqr.apps.googleusercontent.com">
                <br />
                {profile ? (
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                        <button className="LogoutButton" onClick={logOut}>Log Out</button>
                        <br />
                        <br />
                        <br />

                        <div style = {{ padding: '10px', textAlign: 'left'}}>
                        <img src={profile.picture} alt="user image" />
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <br />
                        <br />
                    </div>
                    </div>
                    
                ) : (
                    <button className="LogoutButton" onClick={login}>Sign In With Google 🚀 </button>
                )}
                </GoogleOAuthProvider>

                <h1>
                Dashboard
                </h1>

                <button className="InfoTab" onClick={()=>navigate("/info")}>
                    Info
                </button>

                
            </header>
        </div>
    )
}