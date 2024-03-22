import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({classPeriod}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/students', { firstName, lastName, classPeriod });
      alert('Student added successfully');
      setFirstName('');
      setLastName('');
    } catch (error) {
      alert('Failed to add student');
    }
  };

return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ marginBottom: '10px' }}>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ marginLeft: '5px' }} />
        </label>
        <br />
        <label style={{ marginBottom: '10px' }}>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ marginLeft: '5px' }} />
        </label>
        <br />
        <button type="submit" style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Save</button>
    </form>
);
};

export default StudentForm;
