import PageHeader from '../components/PageHeader';
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
        standard: "Standard 1",
        desc1: "Enter Desc1",
        desc2: "Enter Desc2",
        desc3: "Enter Desc3",
        desc4: "Enter Desc4"
    },
    {
        standard: "Standard 2",
        desc1: "Enter Desc1",
        desc2: "Enter Desc2",
        desc3: "Enter Desc3",
        desc4: "Enter Desc4"
    },
    {
        standard: "Standard 3",
        desc1: "Enter Desc1",
        desc2: "Enter Desc2",
        desc3: "Enter Desc3",
        desc4: "Enter Desc4"
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
    const [initSQL, setInitSQL] = useState([]);
    const [initRubrics, setInitRubrics] = useState([]);
    const [initNames, setInitNames] = useState([]);
    //const [check, setCheck] = useState();

    //const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/rubricsInfo')
        .then(res => organizeSQL(res.data))
        .catch(er => console.log(er));
        //console.log(data);
    }, [])

    console.log();

    const turnSQL = () => {
        let finalRubrics = savedRubrics;
        let tempRubrics = [];
        let stoodNum = 0;
        for(var i = 0; i < savedNames.length; i++){
            let standCount = savedRubrics.at(i).length;
            for(var j = 0; j < 4 * standCount; j++){
                let stand;  
                let standNum = Math.trunc(j/4);
                let cellText;                
                
                stand = savedRubrics.at(i).at(standNum).standard;
                //FIND CELL DESC
                if(j%4 + 1 == 1){
                    cellText = savedRubrics.at(i).at(standNum).desc1;
                }
                else if(j%4 + 1 == 2){
                    cellText = savedRubrics.at(i).at(standNum).desc2;
                }
                else if(j%4 + 1 == 3){
                    cellText = savedRubrics.at(i).at(standNum).desc3;
                }
                else{
                    cellText = savedRubrics.at(i).at(standNum).desc4;
                }
                //console.log("j: "+ (j%4 + 1 )+ " standNum: "+ standNum + " standard" + savedRubrics.at(i).at(standNum).standard + " cell text: "+savedRubrics.at(i).at(standNum).desc1);

                tempRubrics.push({rubricTitle: savedNames.at(i).label, rubricNum: i, standard: stand, standardNum: (standNum + stoodNum), cellNum: j%4 + 1, cellDesc: cellText})
            }
            stoodNum+= standCount;
        }

        console.log(initSQL);
        console.log(tempRubrics);
        finalRubrics = tempRubrics;
        makeSQLStatement(tempRubrics, initSQL);
    }

    const makeSQLStatement = (finalRubrics, inRubrics) => {
        console.log("UNDER");

        let statement = "";
        let length = -1;
        let add = -1; //Were rubrics added or deleted?

        console.log(finalRubrics.at(finalRubrics.length - 1).rubricNum+" "+inRubrics.at(inRubrics.length - 1).rubricNum);
        //console.log(inRubrics);

        if(finalRubrics.at(finalRubrics.length - 1).rubricNum >= inRubrics.at(inRubrics.length - 1).rubricNum){
            length = finalRubrics.at(finalRubrics.length - 1).rubricNum;
            add = 2;
            console.log("2");
            if(finalRubrics.at(finalRubrics.length - 1).rubricNum >= inRubrics.at(inRubrics.length - 1).rubricNum){
                add = 1;
                console.log("1");
            }
        }
        else{
            length = inRubrics.at(inRubrics.length - 1).rubricNum;
            add = 3;
            
        }
        

        let cellInfo = [];
        let standInfo = [];
        let rubricInfo = [];

        let dataItem = 0;
        console.log("a");
        if(add == 1){
            console.log("b");
            for(let i = 0; i <= length; i++){
                while(((finalRubrics.at(dataItem) != null) && (inRubrics.at(dataItem) != null)) && (!(finalRubrics.at(dataItem).rubricNum == i + 1) && !(inRubrics.at(dataItem).rubricNum == i + 1))){
                    console.log(dataItem);
                    if((finalRubrics.at(dataItem).cellDesc).localeCompare(inRubrics.at(dataItem).cellDesc)){ //UPDATE CELL TEXT
                        //statement += "UPDATE `cell` SET `cellDesc` = '"+finalRubrics.at(dataItem).cellDesc+"' WHERE `cell`.`idCell` = "+(dataItem)+";"
                        //cellInfo.push({cellId: dataItem, cellDesc: finalRubrics.at(dataItem).cellDesc})
                        axios.post('http://localhost:8000/rubricsInfo', {
                            desc: finalRubrics.at(dataItem).cellDesc,
                            id: dataItem,
                            path: 1
                        })
                            .then(res => console.log(res))
                            .catch(er => console.log(er));
                    }
                    if((dataItem%4 === 0) && ((finalRubrics.at(dataItem).standard).localeCompare(inRubrics.at(dataItem).standard))){
                        //statement += "UPDATE `standard` SET `standardName` = '"+finalRubrics.at(dataItem).standard+"' WHERE `standard`.`idStandard` = "+(finalRubrics.at(dataItem).standardNum)+";"
                        //standInfo.push({standardId: finalRubrics.at(dataItem).standardNum, standardDesc: finalRubrics.at(dataItem).standard})
                        axios.post('http://localhost:8000/rubricsInfo', {
                            desc: finalRubrics.at(dataItem).standard,
                            id: finalRubrics.at(dataItem).standardNum,
                            path: 2
                        })
                            .then(res => console.log(res))
                            .catch(er => console.log(er));
                    }
                    dataItem++;
                }
                if(((finalRubrics.at(dataItem - 1).rubricTitle).localeCompare(inRubrics.at(dataItem - 1).rubricTitle))){
                    //statement += "UPDATE `rubric` SET `rubricName` = '"+finalRubrics.at(dataItem - 1).rubricTitle+"' WHERE `rubric`.`rubricID` = "+(finalRubrics.at(dataItem - 1).rubricNum)+";"
                    //rubricInfo.push({rubricId: finalRubrics.at(dataItem - 1).rubricTitle, rubricTitle: finalRubrics.at(dataItem - 1).rubricNum})
                    axios.post('http://localhost:8000/rubricsInfo', {
                        desc: finalRubrics.at(dataItem - 1).rubricTitle,
                        id: finalRubrics.at(dataItem - 1).rubricNum,
                        path: 3
                    })
                        .then(res => console.log(res))
                        .catch(er => console.log(er));
                }
            }
        }

        //console.log("SET: " +statement);
        setInitSQL(finalRubrics);
        

        /*
        axios.post('http://localhost:8000/rubricsInfo', {})
            .then(res => console.log(res))
            .catch(er => console.log(er));
        */

        console.log("OVER");
    }

    const organizeSQL = (sql) => {
        setInitSQL(sql);
        let tempRubrics = [];
        let tempNames = [];
        let dataItem = 0;
        console.log(sql);
        for(let i = 0; i <= sql.at(11).rubricNum; i++){
            //let thisName = [];
            let thisRubric = [];
            let maxrubricItem = 0;

            tempNames.push({value: sql.at(dataItem).rubricNum, label: sql.at(dataItem).rubricTitle})

            while(sql.at(maxrubricItem).rubricNum == i && maxrubricItem < sql.length - 1){
                //console.log("TEST " + maxrubricItem);
                maxrubricItem++
            }

            maxrubricItem--;

            for(let j = 0; j <= sql.at(maxrubricItem - 1).standardNum; j++){
                //console.log(dataItem + ", " + maxrubricItem);
                thisRubric.push({standard: sql.at(dataItem).standard, desc1: sql.at(dataItem).cellDesc, desc2: sql.at(dataItem + 1).cellDesc, desc3: sql.at(dataItem + 2).cellDesc, desc4: sql.at(dataItem + 3).cellDesc});
                dataItem += 4;  
                //console.log("a");
            }
            tempRubrics.push(thisRubric);
            //tempNames.push(thisName);
            //console.log("b");
        }

        
        console.log(tempRubrics);
        console.log(tempNames);

        setNames(tempNames);
        setInitNames(tempNames);
        setRubrics(tempRubrics);
        setInitRubrics(tempRubrics);
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

    
    const addRubric = () => {
        let tempRubric = ([{
            standard: "Enter Standard",
            desc1: "Enter Desc1",
            desc2: "Enter Desc2",
            desc3: "Enter Desc3",
            desc4: "Enter Desc4"
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

                    <button className = "addRowButton"  onClick={() => turnSQL()}> SAVE </button>
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
            <PageHeader headerName="Rubrics" toNavigate="/home" />

            
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