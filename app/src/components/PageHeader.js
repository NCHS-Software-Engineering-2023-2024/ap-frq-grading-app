import { useNavigate } from 'react-router-dom';

export default function PageHeader() {
    const navigate = useNavigate();
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Other Page
                </p>

                <button onClick={() => navigate("/home")} className="LogoutButton">
                    Back
                </button>
            </header>
        </div>
    )
}