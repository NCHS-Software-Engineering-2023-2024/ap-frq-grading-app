
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

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

