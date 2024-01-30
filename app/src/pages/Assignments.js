import PageHeader from '../components/PageHeader';
import {useNavigate} from 'react-router-dom';

export default function Assignments() {
    const navigate = useNavigate();
    return (
        <div>
            <PageHeader />
        </div>
    )
}