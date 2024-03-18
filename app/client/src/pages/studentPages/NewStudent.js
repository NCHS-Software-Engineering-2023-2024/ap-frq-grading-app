import PageHeader from '../../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import React, { useState, useEffect } from 'react';

export default function Rubrics() {
    const navigate = useNavigate();
    const baseURL = "http://localhost:8000/"

    async function postData(url = "", data = {}) {
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    // dummy data for now, will access database once I find out how to get values in there
    const options = [
        { value: 'base', label: 'Select...'},
        { value: 'class1', label: '1' },
        { value: 'class2', label: '2' },
        { value: 'class3', label: '3' }
    ];

    const [message, setMessage] = useState('');
    const [class1, setClass1] = useState('');
    const [class2, setClass2] = useState('');
    const [class3, setClass3] = useState('');

    useEffect(() => {
        fetch(`${baseURL}message`)
          .then((res) => res.json())
          .then((data) => {setMessage(data.message);}
          );
         fetch(`${baseURL}result1`)
          .then((res) => res.json())
          .then((data) => {setClass1(data.class1);}
          ); 
         fetch(`${baseURL}result2`)
          .then((res) => res.json())
          .then((data) => {setClass2(data.class2);}
          ); 
         fetch(`${baseURL}result3`)
          .then((res) => res.json())
          .then((data) => {setClass3(data.class3);}
          ); 
      }, []);

    const [selectedOption, setSelectedOption] = useState(null);
    const [data, setData] = useState(null);

    const handleChange = (selected) => {
        setSelectedOption(selected);
        console.log('Option Selected: ', selected);

        if (selected.value === 'class1') {
            fetch(`${baseURL}class1`)
                .then(response => response.json())
                .then(data => setData(data)) 
                .catch(error => console.error('Error:', error));;
        } else if (selected.value === 'class2') {
            fetch(`${baseURL}class2`)
                .then(response => response.json())
                .then(data => setData(data)) 
                .catch(error => console.error('Error:', error));;
        } else if (selected.value === 'class3') {
            fetch(`${baseURL}class3`)
                .then(response => response.json())
                .then(data => setData(data)) 
                .catch(error => console.error('Error:', error));;
        }
    }

    return (
        <div>
            <PageHeader headerName="New Student" toNavigate="/students" />

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Select options={options} onChange={handleChange}/>
            </body>
        </div>
    )
}