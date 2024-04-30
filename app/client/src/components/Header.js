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
            <header className="App-header" style={{ position: 'fixed', top: 10, left: 10 }}>
                <GoogleOAuthProvider clientId="78244490523-lobbagoj7mhobmmc9c8uv06164ivbtqr.apps.googleusercontent.com">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {profile ? (
                            <div>
                                <img src={profile.picture} alt="user image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                <div style={{ marginLeft: '10px' }}>
                                    <h3>User Logged in</h3>
                                    <p>Name: {profile.name}</p>
                                    <p>Email Address: {profile.email}</p>
                                </div>
                                <button onClick={logOut} style={{ marginLeft: '10px' }}>Log out</button>
                            </div>
                        ) : (
                            <button onClick={login} style={{ fontSize: '20px' }}>Sign in with Google 🚀 </button>
                        )}
                    </div>
                </GoogleOAuthProvider>

                <p>
                    Dashboard
                </p>

                <button className="InfoTab" onClick={() => navigate("/info")}>
                    Info
                </button>


            </header>
        </div>
    )
}