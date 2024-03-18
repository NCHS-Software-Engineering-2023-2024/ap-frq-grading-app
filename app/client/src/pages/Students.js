import PageHeader from '../components/PageHeader';
import {useNavigate} from 'react-router-dom';

export default function Students() {
    const navigate = useNavigate();
    return (
        <div>
            <PageHeader headerName="Students" toNavigate="/home" />

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <button className="DashboardButton" onClick={() => navigate('/students/new')}>New Student</button>
                <button className="DashboardButton" onClick={() => navigate('/students/view')}>My Classes</button>
                <button className="DashboardButton" onClick={() => navigate('/students/upload')}>Upload Classes</button>
            </body>
        </div>
    )
}