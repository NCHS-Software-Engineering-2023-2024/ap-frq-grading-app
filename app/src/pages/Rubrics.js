import RubricHeader from '../components/RubricHeader';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom/client';
import axios from 'axios';



var testNames = [
    { value: 0, label: 'Example Rubric' },
    { value: 1, label: 'Test' }
  ];

const styles = {
    option: (provided, state) => ({
      provided,
      fontWeight: state.isSelected ? "bold" : "normal",
      color: "black",
      backgroundColor: state.data.color,
      fontSize: state.selectProps.myFontSize
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#AE0000",
      fontSize: state.selectProps.myFontSize
    }),
    menu: (base) => ({
        ...base,
        width: "max-content",
        minWidth: "100%"
   })
  };

var testRubrics = [
    [{
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
    }],
//Test rubric
    [{
        standard: "A",
        desc1: "one",
        desc2: "two",
        desc3: "three",
        desc4: "four"
    },
    {
        standard: "B",
        desc1: "one",
        desc2: "two",
        desc3: "three",
        desc4: "four"
    },
    {
        standard: "C",
        desc1: "one",
        desc2: "two",
        desc3: "three",
        desc4: "four"
    }]
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
    const [savedNames, setNames] = useState([testNames]);
    const [savedRubrics, setRubrics] = useState(testRubrics);
    const [currentRubric, setCurrentRubric] = useState(testRubrics.at(0));
    const [currentNum, setCurrentNum] = useState((testNames.at(0).value));
    const [currentTitle, setCurrentTitle] = useState((testNames.at(0)).label);
    const [initRubrics, setInitRubrics] = useState([])
    const [initNames, setInitNames] = useState([])

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/rubricsInfo')
        .then(res => setData(organizeSQL(res.data)))
        .catch(er => console.log(er));
        //console.log(data);
        //(data);
    })

    const organizeSQL = (sql) => {
        let tempRubrics = [];
        let tempNames = [];
        let dataItem = 0;
        console.log(sql);
        for(let i = 0; i <= sql.at(11).rubricNum; i++){
            let thisName = [];
            let thisRubric = [];
            let maxrubricItem = 0;

            thisName.push({value: sql.at(dataItem).rubricNum, label: sql.at(dataItem).rubricTitle})

            while(sql.at(maxrubricItem).rubricNum == i && maxrubricItem < sql.length - 1){
                console.log("TEST " + maxrubricItem);
                maxrubricItem++
            }

            maxrubricItem--;

            for(let j = 0; j <= sql.at(maxrubricItem - 1).standardNum; j++){
                console.log(dataItem + ", " + maxrubricItem);
                thisRubric.push({standard: sql.at(dataItem).standard, desc1: sql.at(dataItem).cellDesc, desc2: sql.at(dataItem + 1).cellDesc, desc3: sql.at(dataItem + 2).cellDesc, desc4: sql.at(dataItem + 3).cellDesc});
                dataItem += 4;  
                console.log("a");
            }
            tempRubrics.push(thisRubric);
            tempNames.push(thisName);
            console.log("b");
        }

        
        console.log(tempRubrics);
        console.log(tempNames);

        setNames(tempNames);
        setRubrics(tempRubrics);
        setCurrentRubric(tempRubrics.at(0));
        setCurrentNum(tempNames.at(0).value);
        setCurrentTitle(tempNames.at(0).label);


    }

    //const [desc1, setDesc1] = useState('');
    //const [desc2, setDesc2] = useState('');
    //const [desc3, setDesc3] = useState('');
    //const [desc4, setDesc4] = useState('');
    //const [standard, setStandard] = useState('');
    const [editStandard, setEditStandard] = useState('void')

    const [udesc1, usetDesc1] = useState('');
    const [udesc2, usetDesc2] = useState('');
    const [udesc3, usetDesc3] = useState('');
    const [udesc4, usetDesc4] = useState('');   
    const [ustandard, usetStandard] = useState('');

    //Creates new preset row -- Will remove after everythings working more 
    /* 
    const handleSubmit = (event) => {
        event.preventDefault();
        testRubrics = savedRubrics;
        testRubrics.push({standard: standard, desc1: desc1, desc2: desc2, desc3: desc3, desc4: desc4}); //Will need to tweak for database
        newStandard+=1;
        setRubrics(testRubrics);
    }
    */

    const decideRubric = (obj) => {
        setCurrentNum(obj.value);
        setCurrentTitle(obj.label);
        setCurrentRubric(savedRubrics.at(obj.value));
    }

    //IN PROGRESS
    const addRubric = () => {
        let tempRubric = ([{
            standard: "Default Standard",
            desc1: "one",
            desc2: "two",
            desc3: "three",
            desc4: "four"
        }]);
        setCurrentNum(savedNames.length);
        setCurrentTitle("New Rubric");
        setCurrentRubric(tempRubric);
        
        savedRubrics.push(tempRubric);
        savedNames.push({value: (savedNames.length), label: "New Rubric"});
        console.log(savedRubrics);
    }

    const deleteRubric = () => {
        var num = 99;
        if(currentNum!== 0){
            num = savedNames.length - 2
        }
        else{
            num = 1;
        }
        setCurrentNum(num);
        setCurrentTitle(savedNames.at(num).label);
        setCurrentRubric(savedRubrics.at(num));

        let tempRubrics = [];
        let tempNames = []
        if(savedRubrics.length > 1){
            if(currentNum!==0){
                for(let i = 0; i < currentNum; i++){
                    tempRubrics.push(savedRubrics.at(i));
                    tempNames.push(savedNames.at(i));
                }
                for(let i = currentNum + 1; i < savedRubrics.length; i++){
                    tempRubrics.push(savedRubrics.at(i));
                    tempNames.push(savedNames.at(i));
                }
            }
            else{
                for(let i = 1; i < savedRubrics.length; i++){
                    tempRubrics.push(savedRubrics.at(i));
                    tempNames.push(savedNames.at(i));
                }
            }
        }
        setRubrics(tempRubrics)
        setNames(tempNames)
    }

    //Creates new empty row
    const newRow = () => {
        let tempRubric = currentRubric;
        tempRubric.push({standard: "New Standard ("+newStandard+")", desc1: "Enter Desc1", desc2: "Enter Desc2", desc3: "Enter Desc3", desc4: "Enter Desc4"}); //Will need to tweak for database
        newStandard+=1;
        setCurrentRubric(tempRubric);

        //Update the saved rubrics
        let tempRubrics = [];
        if(savedRubrics.length > 1){
            if(currentNum!==0){
                for(let i = 0; i < currentNum; i++){
                    tempRubrics.push(savedRubrics.at(i));
                }
                tempRubrics.push(currentRubric);
                for(let i = currentNum + 1; i < savedRubrics.length; i++){
                    tempRubrics.push(savedRubrics.at(i));
                }
            }
            else{
                tempRubrics.push((currentRubric));
                for(let i = 1; i < savedRubrics.length; i++){
                    tempRubrics.push(savedRubrics.at(i));
                }
            }
        }
        else{
            tempRubrics.push(currentRubric);
        }
        setRubrics(tempRubrics)
    }

    //Enter edit mode
    const handleEdit = (standard) => {
        setEditStandard(standard);
        let index = getSubIndex(currentRubric, standard);
        usetStandard((currentRubric.at(index)).standard);
        usetDesc1((currentRubric.at(index)).desc1);
        usetDesc2((currentRubric.at(index)).desc2);
        usetDesc3((currentRubric.at(index)).desc3);
        usetDesc4((currentRubric.at(index)).desc4);
        
    }
    
    const handleDelete = (standard) => {
        let index = getSubIndex(currentRubric, standard);
        let tempRubric = [];
        if(currentRubric.length > 1){
            tempRubric = (currentRubric.slice(0, index)).concat((currentRubric.slice(index + 1, currentRubric.length)));
        }
        else{
            tempRubric = (currentRubric.slice(0, index));
        }
        setCurrentRubric(tempRubric);

        //Update the saved rubrics
        let tempRubrics = [];
        if(savedRubrics.length > 1){
            if(currentNum!==0){
                for(let i = 0; i < currentNum; i++){
                    tempRubrics.push(savedRubrics.at(i));
                }
                tempRubrics.push(tempRubric);
                for(let i = currentNum + 1; i < savedRubrics.length; i++){
                    tempRubrics.push(savedRubrics.at(i));
                }
            }
            else{
                tempRubrics.push((tempRubric));
                for(let i = 1; i < savedRubrics.length; i++){
                    tempRubrics.push(savedRubrics.at(i));
                }
            }
        }
        else{
            tempRubrics.push(tempRubric);
        }
        setRubrics(tempRubrics)
    }

    //Will need to tweak after adding database 
    //Update Editted contents
    const handleUpdate = (standard) => {
        let index = getSubIndex(currentRubric, standard);
        let tempRubric = [];
        tempRubric = (currentRubric.slice(0, index)).concat(({standard: ustandard, desc1: udesc1, desc2: udesc2, desc3: udesc3, desc4: udesc4}),(currentRubric.slice(index + 1, currentRubric.length)));
        setEditStandard('void');
        setCurrentRubric(tempRubric);

        //Update the saved rubrics
        let tempRubrics = [];
        if(savedRubrics.length > 1){
            if(currentNum!==0){
                for(let i = 0; i < currentNum; i++){
                    tempRubrics.push(savedRubrics.at(i));
                }
                tempRubrics.push(tempRubric);
                for(let i = currentNum + 1; i < savedRubrics.length; i++){
                    tempRubrics.push(savedRubrics.at(i));
                }
            }
            else{
                tempRubrics.push((tempRubric));
                for(let i = 1; i < savedRubrics.length; i++){
                    tempRubrics.push(savedRubrics.at(i));
                }
            }
        }
        else{
            tempRubrics.push(tempRubric);
        }
        setRubrics(tempRubrics)
    }

    const updateTitle = (newTitle) => {
        var tempNames = [];
        for (let i = 0; i<savedNames.length ; i++){
            tempNames.push(savedNames.at(i));
        }
        tempNames.at(currentNum).label = newTitle;
        setNames(tempNames);
    }

    return (
        <div>

            

            <h2>
            <Select
                onChange={decideRubric}
                options={savedNames}
                styles={styles}
            />
            </h2>


            <div>
                <body style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <button type = "submit" value = "submit" className='addRubricButton' onClick={() => addRubric()}> Add Rubric </button>

                    <input type="text" id="Title" name="RubricTitle" placeholder="Enter Title Here"  value={savedNames.at(currentNum).label} className = "RubricTitleInput"
                        onChange={() => updateTitle(document.getElementById('Title').value)}
                    ></input>

                    <button type = "submit" value = "submit" className='deleteRubricButton' onClick={() => deleteRubric()}> Delete Rubric </button>
                </body>
            </div>

            <table>
                    {
                        currentRubric.map((rubric) => (
                            rubric.standard === editStandard ?
                            <tbody>
                                <tr className='StandardRow'>
                                   <th colSpan = "4"> <input type='text' className = "standardInputField" value={ustandard} onChange={e => usetStandard(e.target.value)}></input> </th>
                                    <th> Action </th>    
                                </tr>
                                <tr className='NumsRow'>
                                    <td className = "rubrow1"> 1 </td>
                                    <td className = "rubrow2"> 2 </td>
                                    <td className = "rubrow3"> 3 </td>
                                    <td className = "rubrow4"> 4 </td>
                                    <td className = "rubrow5">   </td>
                                </tr>   
                                <tr>
                                    <td className = "rubrow1"> <input type='text' className = "descInputField" value={udesc1} onChange={e => usetDesc1(e.target.value)}></input> </td>
                                    <td className = "rubrow2"> <input type='text' className = "descInputField" value={udesc2} onChange={e => usetDesc2(e.target.value)}></input> </td>
                                    <td className = "rubrow3"> <input type='text' className = "descInputField" value={udesc3} onChange={e => usetDesc3(e.target.value)}></input> </td>
                                    <td className = "rubrow4"> <input type='text' className = "descInputField" value={udesc4} onChange={e => usetDesc4(e.target.value)}></input> </td>
                                    <td className = "rubrow5">
                                        <button className = "updateStandardButton" onClick={() => handleUpdate(editStandard)}> update </button>
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
                                <td className = "rubrow1"> 1 </td>
                                <td className = "rubrow2"> 2 </td>
                                <td className = "rubrow3"> 3 </td>
                                <td className = "rubrow4"> 4 </td>
                                <td className = "rubrow5">   </td>
                            </tr>   
                            <tr>
                                <td className = "rubrow1"> {rubric.desc1} </td>
                                <td className = "rubrow2"> {rubric.desc2} </td>
                                <td className = "rubrow3"> {rubric.desc3} </td>
                                <td className = "rubrow4"> {rubric.desc4} </td>
                                <td className = "rubrow5">
                                    <button className = "editStandardButton" onClick={() => handleEdit(rubric.standard)}> edit </button>
                                    <button className = "deleteStandardButton"  onClick={() => handleDelete(rubric.standard)}> delete </button>
                                </td>
                            </tr>
                        </tbody>
                        ))
                    }
            </table>
            <div>
                <body style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <button type = "submit" value = "submit" className='addRowButton' onClick={() => newRow()}> Add Row </button>
                </body>
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
*/

export default function Rubrics() {
    
    //const navigate = useNavigate();


    return (

        
        <div>
            <RubricHeader />

            
            <>

            <body style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                
            

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