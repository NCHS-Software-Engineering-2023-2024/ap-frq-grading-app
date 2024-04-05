import PageHeader from '../components/PageHeader';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import React from 'react';
import Select from 'react-select';
import GradeForm from '../components/GradeForm';

export default function Grade() {
    const navigate = useNavigate();

    const options = [
        { value: '0', label: 'Select...' },
        { value: '1', label: 'Period 1' },
        { value: '2', label: 'Period 2' },
        { value: '3', label: 'Period 3' },
        { value: '4', label: 'Period 4'},
        { value: '5', label: 'Period 5' },
        { value: '6', label: 'Period 6' },
        { value: '7', label: 'Period 7' },
        { value: '8', label: 'Period 8' }
    ];

    const [selectedOpt, setSelectedOpt] = useState(null);
    var classPeriod = "";

    const handleChange = (selected) => {
        setSelectedOpt(selected);
        console.log(`Option selected:`, selected);
        classPeriod = selected.value;
        console.log("Class Period: " + classPeriod);
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
                {selectedOpt && selectedOpt.value === '1' && (
                    <GradeForm classPeriod="1" />
                )}
                {selectedOpt && selectedOpt.value === '2' && (
                    <GradeForm classPeriod="2" />
                )}
                {selectedOpt && selectedOpt.value === '3' && (
                    <GradeForm classPeriod="3" />
                )}
                {selectedOpt && selectedOpt.value === '4' && (
                    <GradeForm classPeriod="4" />
                )}
                {selectedOpt && selectedOpt.value === '5' && (
                    <GradeForm classPeriod="5" />
                )}
                {selectedOpt && selectedOpt.value === '6' && (
                    <GradeForm classPeriod="6" />
                )}
                {selectedOpt && selectedOpt.value === '7' && (
                    <GradeForm classPeriod="7" />
                )}
                {selectedOpt && selectedOpt.value === '8' && (
                    <GradeForm classPeriod="8" />
                )}
            </body>
        </div>
    )
}