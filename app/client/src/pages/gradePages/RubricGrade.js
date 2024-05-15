import React, { useState } from 'react';
//import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

const RubricGrade = ({classPeriod}) => {
    return (
        <div>
            <PageHeader headerName="Grade Assignment" toNavigate="/home"/>
            
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h2> To be implemented soon, please return home. </h2>
            </div>
        </div>
    );
};
export default RubricGrade;