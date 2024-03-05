
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
  host: "localhost:3306",
  user: "root",
  password: "AP_FRQ$2024!",
  database: "APFRQ_Database"
});


app.get('/rubrics', (req, res) => {
  const sql = "SELECT * FROM Rubric";
  con = query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

