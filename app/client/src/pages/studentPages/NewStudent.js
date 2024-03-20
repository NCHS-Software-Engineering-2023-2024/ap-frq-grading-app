import PageHeader from '../../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Select from 'react-select';

export default function NewStudent() {
    const navigate = useNavigate();
    const options = [
        { value: 'base', label: 'Select...' },
        { value: 'class1', label: 'Period 1' },
        { value: 'class2', label: 'Period 2' },
        { value: 'class3', label: 'Period 3' },
    ];

    return (
        <div>
            <PageHeader headerName="New Student" toNavigate="/students" />

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Select options={options}/>
            </body>
        </div>
    )
}