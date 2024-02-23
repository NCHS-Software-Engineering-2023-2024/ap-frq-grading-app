import RubricHeader from '../components/RubricHeader';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';



var testRubrics = [
    {
        standard: "Evidence",
        desc1: "one",
        desc2: "two",
        desc3: "three",
        desc4: "four"
    },
    {
        standard: "Thesis",
        desc1: "one",
        desc2: "two",
        desc3: "three",
        desc4: "four"
    },
    {
        standard: "Complication",
        desc1: "one",
        desc2: "two",
        desc3: "three",
        desc4: "four"
    }
]

//USE THIS TO FIND INDEX OF THE STANDARD
function getSubIndex(array, stand){
    for(let i = 0; i < array.length; i++){
        if(((array.at(i)).standard === stand)){
            return i;
        }
    }
    return -1;
}

var newStandard = 0;

function Table() {
    const location = useLocation();
    const [savedRubrics, setRubrics] = useState(testRubrics);
    const [desc1, setDesc1] = useState('');
    const [desc2, setDesc2] = useState('');
    const [desc3, setDesc3] = useState('');
    const [desc4, setDesc4] = useState('');
    const [standard, setStandard] = useState('');
    const [editStandard, setEditStandard] = useState('void')

    const [udesc1, usetDesc1] = useState('');
    const [udesc2, usetDesc2] = useState('');
    const [udesc3, usetDesc3] = useState('');
    const [udesc4, usetDesc4] = useState('');
    const [ustandard, usetStandard] = useState('');

    //Creates new preset row -- Will remove after everythings working more st
    const handleSubmit = (event) => {
        event.preventDefault();
        testRubrics = savedRubrics;
        testRubrics.push({standard: standard, desc1: desc1, desc2: desc2, desc3: desc3, desc4: desc4}); //Will need to tweak for database
        newStandard+=1;
        setRubrics(testRubrics);
        location.reload();
    }

    //Creates new empty row
    const newRow = (event) => {
        event.preventDefault();
        testRubrics = savedRubrics;
        testRubrics.push({standard: "New Standard ("+newStandard+")", desc1: "Enter Desc1", desc2: "Enter Desc2", desc3: "Enter Desc3", desc4: "Enter Desc4"}); //Will need to tweak for database
        newStandard+=1;
        setRubrics(testRubrics);
        location.reload();
    }

    //Enter edit mode
    const handleEdit = (standard) => {
        setEditStandard(standard);
        let index = getSubIndex(savedRubrics, standard);
        usetStandard((savedRubrics.at(index)).standard);
        usetDesc1((savedRubrics.at(index)).desc1);
        usetDesc2((savedRubrics.at(index)).desc2);
        usetDesc3((savedRubrics.at(index)).desc3);
        usetDesc4((savedRubrics.at(index)).desc4);
    }

    //Will need to tweak after adding database 
    //Update Editted contents
    const handleUpdate = (standard) => {
        let index = getSubIndex(savedRubrics, standard);
        let tempRubrics = [];
        tempRubrics = (savedRubrics.slice(0, index)).concat(({standard: standard, desc1: udesc1, desc2: udesc2, desc3: udesc3, desc4: udesc4}),(savedRubrics.slice(index + 1, savedRubrics.length)));
        setEditStandard('void')
        setRubrics(tempRubrics);
    }

    return (
        <div><p>
            Test: {getSubIndex(savedRubrics, "Complication")}
            </p>
            <table>
                    {
                        savedRubrics.map((rubric) => (
                            rubric.standard === editStandard ?
                            <tbody>
                                <tr className='StandardRow'>
                                   <th colSpan = "4"> <input type='text' value={ustandard} onChange={e => usetStandard(e.target.value)}></input> </th>
                                    <th> Action </th>    
                                </tr>
                                <tr className='NumsRow'>
                                    <td> 1 </td>
                                    <td> 2 </td>
                                    <td> 3 </td>
                                    <td> 4 </td>
                                    <td>   </td>
                                </tr>   
                                <tr>
                                    <td> <input type='text' value={udesc1} onChange={e => usetDesc1(e.target.value)}></input> </td>
                                    <td> <input type='text' value={udesc2} onChange={e => usetDesc2(e.target.value)}></input> </td>
                                    <td> <input type='text' value={udesc3} onChange={e => usetDesc3(e.target.value)}></input> </td>
                                    <td> <input type='text' value={udesc4} onChange={e => usetDesc4(e.target.value)}></input> </td>
                                    <td>
                                        <button onClick={() => handleUpdate(editStandard)}> update </button>
                                    </td>
                                </tr>
                            </tbody>
                            :
                        <tbody>
                            <tr className='StandardRow'>
                                <th colSpan = "4"> {rubric.standard} </th>
                                <th> Action </th>    
                            </tr>
                            <tr className='NumsRow'>
                                <td> 1 </td>
                                <td> 2 </td>
                                <td> 3 </td>
                                <td> 4 </td>
                                <td>   </td>
                            </tr>   
                            <tr>
                                <td> {rubric.desc1} </td>
                                <td> {rubric.desc2} </td>
                                <td> {rubric.desc3} </td>
                                <td> {rubric.desc4} </td>
                                <td>
                                    <button onClick={() => handleEdit(rubric.standard)}> edit </button>
                                    <button> delete </button>
                                </td>
                            </tr>
                        </tbody>
                        ))
                    }
            </table>
            <div>
            <form onSubmit={newRow}>
                    <h2>
                    <button type = "submit" value = "submit" className='addStandardButton'> Add Row </button>
                    </h2>
                </form>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <h2>
                    <input type = "text" placeholder="Enter Standard" onChange={e => setStandard(e.target.value)}></input>
                    <input type = "text" placeholder="Enter Desc1" onChange={e => setDesc1(e.target.value)}></input>
                    <input type = "text" placeholder="Enter Desc2" onChange={e => setDesc2(e.target.value)}></input>
                    <input type = "text" placeholder="Enter Desc3" onChange={e => setDesc3(e.target.value)}></input>
                    <input type = "text" placeholder="Enter Desc4" onChange={e => setDesc4(e.target.value)}></input>
                    <button type = "submit" value = "submit" className='addStandardButton'> Add </button>
                    </h2>
                </form>
            </div>
        </div>
    )
}

/*  
function AddStandard(Rubric) {
    var table = document.getElementById(Rubric);
    var Standard = table.insertRow();
    Standard.className  = "RubricInputField";
    //Standard.colspan = 4;
    var Numerals = table.insertRow();
    var Description = table.insertRow();
    var Standard1 = Standard.insertCell(0);
    Standard1.colspan = 4;
    

    Standard1.innerHTML = "NEW CELL1";                                    
}
*/

export default function Rubrics() {
    
    const navigate = useNavigate();
    const [title, setTitle] = useState("Example Rubric");

    return (

        
        <div>
            <RubricHeader />

            
            <>
            <h1 className = "RubricTitle">{title}</h1>

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                
            <input type="text" id="Title" name="RubricTitle" placeholder="Enter Title Here"  className = "RubricTitleInput"></input>
            
            <button
                type="button"
                onClick={() => setTitle(document.getElementById('Title').value)}
                className="ConfirmTitleButton"
            >Confirm</button>

            </body>
            </>
            
            
            
                
            
            {Table()}
                
        </div>


    )
}


/*

<table className="RubricOutline" id="Rubric">
                    <thead>       
                        <tr>
                            <th colSpan = "4">
                                <input type="text" id="Standard" name="RubricStandard" placeholder="Enter Standard Here" className = "RubricInputField"></input>
                            </th>
                        </tr>
                    </thead>

                    <tbody>    
                        <tr>
                            <th> 1 </th>
                            <th> 2 </th>
                            <th> 3 </th>
                            <th> 4 </th>
                        </tr>

                        <tr>
                            <td> <input type="text" id="Description1" name="Description1" placeholder="Enter Description Here" className = "RubricInputField"></input> </td>
                            <td> <input type="text" id="Description1" name="Description1" placeholder="Enter Description Here" className = "RubricInputField"></input> </td>
                            <td> <input type="text" id="Description1" name="Description1" placeholder="Enter Description Here" className = "RubricInputField"></input> </td>
                            <td> <input type="text" id="Description1" name="Description1" placeholder="Enter Description Here" className = "RubricInputField"></input> </td>
                        </tr>
                    </tbody>
                    
                </table>

*/