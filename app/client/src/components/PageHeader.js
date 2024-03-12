import { useNavigate } from 'react-router-dom';

export default function PageHeader({ headerName, toNavigate }) {
    const navigate = useNavigate();
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    {headerName}
                </p>

                <button onClick={() => navigate(toNavigate)} className="LogoutButton">
                    Back
                </button>
            </header>
        </div>
    )
}