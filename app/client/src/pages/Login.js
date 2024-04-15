import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(sessionStorage.getItem('userId') !== null);

    const handleDashboardClick = () => {
        if (sessionStorage.getItem('userId') === null) {
            setIsUserLoggedIn(false);
            alert("You need to sign in first to view the dashboard");
        } else {
            setIsUserLoggedIn(true);
            navigate("/home");
        }
    };

    useEffect(() => {
        setIsUserLoggedIn(sessionStorage.getItem('userId') !== null);
    }, []);

    const handleLogout = () => {
        // Clear the session storage
        sessionStorage.clear();
        setIsUserLoggedIn(false);
        // Redirect the user to the home page
        navigate("/");
      };

    useEffect(() => {
        const handleStorageChange = () => {
            setIsUserLoggedIn(sessionStorage.getItem('userId') !== null);
        };

        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div>
            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh",
            }}>
                
                <button onClick={()=>navigate("/home")} className="DashboardButton" style={{ fontSize: "70px", width: "300px", height: "150px" }}>
                    Log In
                </button>
            </body>
        </div>
    )
}

