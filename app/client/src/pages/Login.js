import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  // This function will be called upon a successful login
  const handleSuccess = (credentialResponse) => {
    // If you are using the authorization code flow, you will receive a code to be exchanged for an access token
    const authorizationCode = credentialResponse.code;

    // Send the authorization code to your backend server
    fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: authorizationCode }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from your backend server
      console.log('Login successful, backend response:', data);
    })
    .catch(error => {
      // Handle errors in communicating with your backend server
      console.error('Error exchanging authorization code:', error);
    });
  };

  const handleError = (errorResponse) => {
    console.error('Google login failed', errorResponse);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        flow="auth-code"
      />
    </div>
  );
}

export default Login;


/*export function SignIn() 


  
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
        </div>)*/