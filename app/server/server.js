
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "AP FRQ Database" });
});


var mysql = require('mysql');
  var con = mysql.createConnection({
  host: "db.redhawks.us",
  user: "redhawks_rubric",
  password: "IuPzUwXxq0bll6r",
  database: "redhawks_rubric"
});

app.get('/rubricsInfo', (req, res) => {
  const sql = "SELECT rubric.rubricName AS rubricTitle, rubric.RubricID AS rubricNum, standard.standardName as standard, cell.idStandard AS standardNum, cell.cellNum, cell.cellDesc FROM cell INNER JOIN standard ON cell.idStandard = standard.idStandard JOIN rubric ON standard.idRubric = rubric.RubricID;";
  con.query(sql, (err, data) => {
    console.log(data);
    if (err) return res.json(err);
    return res.json(data);
  })
});

app.post('/rubricsInfo', (req, res) => {
    let statement = "";
    const {desc, id, path} = req.body;
    if(path == 1){
      statement = "UPDATE `cell` SET `cellDesc` = (?) WHERE `cell`.`idCell` = (?);";
    }
    else if(path == 2){
      statement = "UPDATE `standard` SET `standardName` = (?) WHERE `standard`.`idStandard` = (?);";
    }
    else{
      statement = "UPDATE `rubric` SET `rubricName` = (?) WHERE `rubric`.`rubricID` = (?);";
    }
    
    con.query(statement, [desc, id], (err, data) => {
      console.log("Complete!" +desc+" "+id);
      if (err) return res.json(err);
      return console.log(data);

    })
    
});

app.get('/rubrics', (req, res) => {
  const sql = "SELECT * FROM Rubric";
  con = query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
});

app.post('/generate-grade', (req, res) => {
  // will add class period and rubric after as well
  const { classPeriod, firstName, lastName, assignmentName } = req.body;

  // const query = `INSERT INTO grade (classPeriod, rubricID, firstName, lastName, assignmentName) VALUES (?, ?, ?, ?)`;
  // con.query(query, [classPeriod, rubricID, firstName, lastName, assignmentName], (err, result) => {
  //   if (err) {
  //     console.log('Error executing SQL:', err);
  //     return res.status(500).json({ error: 'Failed to add grade' });
  //   }
  //   return res.json(result);
  // });
  const query = `INSERT INTO grade (classPeriod, firstName, lastName, assignmentName) VALUES (?, ?, ?, ?)`;
  con.query(query, [classPeriod, firstName, lastName, assignmentName], (err, result) => {
    if (err) {
      console.log('Error executing SQL:', err);
      return res.status(500).json({ error: 'Failed to add grade' });
    }
    return res.json(result);
  });
})


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

