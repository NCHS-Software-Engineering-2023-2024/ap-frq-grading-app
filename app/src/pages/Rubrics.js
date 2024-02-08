import RubricHeader from '../components/RubricHeader';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import ReactDOM from 'react-dom/client';


  


export default function Rubrics() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("Example Rubric");
    var temp = "test";

    return (

        
        <div>
            <RubricHeader />

            <>
            <h1 className = "RubricTitle">{title}</h1>

            <input type="text" id="Title" name="RubricTitle" placeholder="Enter Title Here"  className = "EnterName"></input>

            <button
                type="button"
                onClick={() => setTitle(document.getElementById('Title').value)}
                className="ConfirmName"
            >Confirm</button>
            </>
            

            <table className="RubricOutline">
            
                <input type="text" id="Standard" name="RubricStandard" placeholder="Enter Standard Here"></input>
                
                
                <tr>
                    <th> 1 </th>
                    <th> 2 </th>
                    <th> 3 </th>
                    <th> 4 </th>
                </tr>

                <tr>
                    <td> <input type="text" id="Description1" name="Description1" placeholder="Enter Description Here"></input> </td>
                    <td> <input type="text" id="Description1" name="Description1" placeholder="Enter Description Here"></input> </td>
                    <td> <input type="text" id="Description1" name="Description1" placeholder="Enter Description Here"></input> </td>
                    <td> <input type="text" id="Description1" name="Description1" placeholder="Enter Description Here"></input> </td>
                </tr>

                
            </table>
            
        </div>


    )
}