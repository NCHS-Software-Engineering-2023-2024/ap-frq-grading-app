import RubricHeader from '../components/RubricHeader';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

let testRubrics = [
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

function Table() {
    const [savedRubrics, setRubrics] = useState(testRubrics);

    return (
        <div>
            <table>
                <thead>
                    
                    <tr> 
                        <th colSpan = "5"> Example </th>
                    </tr>
                    
                </thead>


                    {
                        savedRubrics.map((rubric) => (
                        <tbody>
                            <tr>
                                <th colSpan = "4"> {rubric.standard} </th>
                                <th> Action </th>    
                            </tr>
                            <tr>
                                <td> 1 </td>
                                <td> 2 </td>
                                <td> 3 </td>
                                <td> 4 </td>
                            </tr>   
                            <tr>
                                <td> {rubric.desc1} </td>
                                <td> {rubric.desc2} </td>
                                <td> {rubric.desc3} </td>
                                <td> {rubric.desc4} </td>
                                <td>
                                    <button> edit </button>
                                    <button> delete </button>
                                </td>
                            </tr>
                        </tbody>
                        ))
                    }
            </table>
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
            
            {Table()}
                
        </div>


    )
}