import PageHeader from '../../components/PageHeader';
import { useNavigate } from 'react-router-dom';

export default function Rubrics() {
    const navigate = useNavigate();
    return (
        <div>
            <PageHeader headerName="Saved Rubrics" toNavigate="/rubrics" />

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