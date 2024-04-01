import PageHeader from '../components/PageHeader';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import React from 'react';
import Select from 'react-select';
import GradeForm from '../components/GradeForm';

export default function Grade() {
    const navigate = useNavigate();

    const options = [
        { value: 'base', label: 'Select...' },
        { value: 'class1', label: 'Period 1' },
        { value: 'class2', label: 'Period 2' },
        { value: 'class3', label: 'Period 3' },
        { value: 'class4', label: 'Period 4'},
        { value: 'class5', label: 'Period 5' },
        { value: 'class6', label: 'Period 6' },
        { value: 'class7', label: 'Period 7' },
        { value: 'class8', label: 'Period 8' }
    ];

    const [selectedOpt, setSelectedOpt] = useState(null);
    const [data, setData] = useState(null);

    const handleChange = (selected) => {
        setSelectedOpt(selected);
        console.log(`Option selected:`, selected);
    }

    return (
        <div>
            <PageHeader headerName="Grading" toNavigate="/home" />

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <br />
                <div style={{ display: 'flex' }}>
                    <h3 style={{marginRight: '10px'}}> Select Class Period: </h3>
                    <Select options={options} onChange={handleChange}/>
                </div>
                <br/>
                <div style={{ display: selectedOpt && selectedOpt.value === 'base' ? 'none' : 'flex' }}>
                    <GradeForm classPeriod={selectedOpt} />
                </div>
            </body>
        </div>
    )
}