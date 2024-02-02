import Header from '../components/Header';
import {useNavigate} from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <div >
            <Header />

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <button onClick={()=>navigate("/rubrics")} className="DashboardButton">
                    Rubrics
                </button>

                <button onClick={()=>navigate("/students")} className="DashboardButton">
                    Students
                </button>

                <button onClick={()=>navigate("/assignments")} className="DashboardButton">
                    Assignments
                </button>
            </body>
        </div>
    )
}