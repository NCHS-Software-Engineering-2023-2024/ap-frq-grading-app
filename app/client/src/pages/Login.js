import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
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

