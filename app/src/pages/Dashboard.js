import Header from '../components/Header';
import {useNavigate} from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <div>
            <Header />

            <body>
                <button onClick={()=>navigate("/home")} className="DashboardButton">
                    Rubrics
                </button>

                <button className="DashboardButton">
                    Students
                </button>

                <button className="DashboardButton">
                    Assignments
                </button>
            </body>
        </div>
    )
}