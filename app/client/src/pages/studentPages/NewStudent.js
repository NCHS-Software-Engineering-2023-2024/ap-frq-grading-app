import PageHeader from '../../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Select from 'react-select';
import StudentForm from '../../components/StudentForm';
import { useState } from 'react';

export default function NewStudent() {
    const navigate = useNavigate();
    const options = [
        { value: 'base', label: 'Select...' },
        { value: 'class1', label: 'Period 1' },
        { value: 'class2', label: 'Period 2' },
        { value: 'class3', label: 'Period 3' },
    ];

    const [selectedOpt, setSelectedOpt] = useState(null);
    const [data, setData] = useState(null);
    //const displayForm = <StudentForm classPeriod={selected}/>;

    const handleChange = (selected) => {
        setSelectedOpt(selected);
        //displayForm();
        console.log(`Option selected:`, selected);
    }


    return (
        <div>
            <PageHeader headerName="New Student" toNavigate="/students" />

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column" // Add this line to make the elements stack vertically
            }}>
                <Select options={options} onChange={handleChange}/>
                <br/>
                <div style={{ display: selectedOpt && selectedOpt.value === 'base' ? 'none' : 'flex' }}>
                    <StudentForm classPeriod={selectedOpt} />
                </div>
            </body>
        </div>
    )
}