import PageHeader from '../../components/PageHeader';
import { useNavigate } from 'react-router-dom';

export default function MyClasses() {
    const navigate = useNavigate();
    return (
        <div>
            <PageHeader headerName="My Classes" toNavigate="/students" />

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1> to be implemented </h1>
            </body>
        </div>
    )
}