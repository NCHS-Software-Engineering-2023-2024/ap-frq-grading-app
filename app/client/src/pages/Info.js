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
                <h1 className='DevHeader'> DEVELOPERS 
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br></h1>
                
                <p>
                    Stefan Ilic (Class of 2026)
                    <br></br>Kaushik Srinivasan (Class of 2024)
                    <br></br>Hyder Rizvi (Class of 2024)
                </p>
            </body>
        </div>
    )
}