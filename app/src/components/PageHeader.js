import { useNavigate } from 'react-router-dom';

export default function PageHeader({ headerName }) {
    const navigate = useNavigate();
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    {headerName}
                </p>

                <button onClick={() => navigate("/home")} className="LogoutButton">
                    Back
                </button>
            </header>
        </div>
    )
}