import RubricHeader from '../components/RubricHeader';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

function Table() {
    useEffect(()=> {
        axois.get('http://localhost:3000/rubrics')
        .then(res => console.log(res))
        .catch(er => console.log(er))
    }, [])
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
    var temp = "test";

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
                                
                    <tr>
                        <th colspan = "4">
                            <input type="text" id="Standard" name="RubricStandard" placeholder="Enter Standard Here" className = "RubricInputField"></input>
                        </th>
                    </tr>
                    
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

                    
                </table>
            
                <button
                    type="button"
                    onClick={() => AddStandard("Rubric")}
                    className="InsertRowButton"
                >Add Row</button>

        </div>


    )
}