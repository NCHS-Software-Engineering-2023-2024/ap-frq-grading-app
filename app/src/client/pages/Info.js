import Header from '../components/Header';
import PageHeader from '../components/PageHeader';

export default function Info() {
    return (
        <div>
            <PageHeader headerName="Info" toNavigate="/home"/>
            
            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <h1> ABOUT </h1>
            </body>
        </div>
    )
}