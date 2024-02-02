import PageHeader from '../components/PageHeader';
import {useNavigate} from 'react-router-dom';

export default function Assignments() {
    const navigate = useNavigate();
    return (
        <div>
            
            <PageHeader headerName="Assignments" />

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1> ASSIGNMENTS </h1>
            </body>
        </div>
    )
}