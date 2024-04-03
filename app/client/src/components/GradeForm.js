import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const GradeForm = ({ classPeriod }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [assignmentName, setAssignmentName] = useState('');

  const navigate = useNavigate();

  // This is where we would access the rubrics table
  const options = [
    { value: '0', label: 'Select...' },
    { value: '1', label: 'AP Lang' },
    { value: '2', label: 'AP Lit Poetry' },
    { value: '3', label: 'AP Lit Fiction' },
  ];

  const [selectedRubric, setSelectedOpt] = useState(null);
  const [data, setData] = useState(null);

  const handleChange = (selected) => {
    setSelectedOpt(selected);
    console.log(`Option selected:`, selected);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post form data to the server
      const response = await fetch('http://localhost:8000/generate-grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          classPeriod,
          selectedRubric,
          firstName,
          lastName,
          assignmentName,
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      console.log("First: " + firstName);
      console.log("Last: " + lastName);
      console.log("Assignment: " + assignmentName);

      // Navigate to new grade
      navigate("/grade/new");
    } catch (error) {
      alert('Failed to add student');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label style={{ marginBottom: '1px' }}>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ marginLeft: '5px' }} />
      </label>
      <br />
      <label style={{ marginBottom: '1px' }}>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ marginLeft: '5px' }} />
      </label>
      <br />
      <label style={{ marginBottom: '1px' }}>
        Assignment Name:
        <input type="text" value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} style={{ marginLeft: '5px' }} />
      </label>
      <br />

      <div style={{ display: 'flex' }}>
        <h3 style={{ marginRight: '10px ' }}>Select Rubric: </h3>
        <Select options={options} onChange={handleChange} />
      </div>

      <br />

      <button type="submit" style={{
        padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px'
      }}>
        Create
      </button>
    </form>
  );
};
export default GradeForm;
