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
                <h1> RUBRICS </h1>
                <button onClick={() => navigate('/rubrics/new')}>New Rubric</button>
            </body>
        </div>
    )
}