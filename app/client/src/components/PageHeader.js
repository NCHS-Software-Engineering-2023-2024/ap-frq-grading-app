import { useNavigate } from 'react-router-dom';

export default function PageHeader({ headerName, toNavigate }) {
    const navigate = useNavigate();
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    {headerName}
                </h1>

                <button onClick={() => navigate(toNavigate)} className="LogoutButton">
                    Back
                </button>
            </header>
        </div>
    )
}