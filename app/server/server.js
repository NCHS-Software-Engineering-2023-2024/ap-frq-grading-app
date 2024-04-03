
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


app.get('/rubrics', (req, res) => {
  const sql = "SELECT * FROM Rubric";
  con = query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
});

app.post('/generate-grade', (req, res) => {
  // will add class period and rubric after as well
  const { classPeriod, rubricID, firstName, lastName, assignmentName} = req.body;

  const query = `INSERT INTO grade (classPeriod, rubricID, firstName, lastName, assignmentName) VALUES (?, ?, ?, ?)`;
  con.query(query, [classPeriod, rubricID, firstName, lastName, assignmentName], (err, result) => {
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

