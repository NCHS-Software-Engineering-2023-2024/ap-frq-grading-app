import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

const RubricGrade = ({classPeriod}) => {
    return (
        <PageHeader headerName="Grade Assignment" toNavigate="/grade"/>
    );
};
export default RubricGrade;