import PageHeader from '../components/PageHeader';
import {useNavigate} from 'react-router-dom';

export default function Rubrics() {
    const navigate = useNavigate();
    return (
        <div>
            <PageHeader headerName="Rubrics" toNavigate="/home" />

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <button className="DashboardButton" onClick={() => navigate('/rubrics/new')}>New Rubric</button>
                <button className="DashboardButton" onClick={() => navigate('/rubrics/view')}>Saved Rubrics</button>
            </body>
        </div>
    )
}