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
                <h1> STUDENTS </h1>
            </body>
        </div>
    )
}