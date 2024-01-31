import { useNavigate } from 'react-router-dom';

export default function RubricHeader() {
    const navigate = useNavigate();
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Rubrics
                </p>

                <button onClick={() => navigate("/home")} className="LogoutButton">
                    Back
                </button>
            </header>
        </div>
    )
}