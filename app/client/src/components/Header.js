import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(sessionStorage.getItem('userId') !== null);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                Dashboard
                </p>

                <button className="InfoTab" onClick={()=>navigate("/info")}>
                    Info
                </button>

                <button onClick={()=>navigate("/")} className="LogoutButton">
                    Log Out
                </button>
            </header>
        </div>
    )
}