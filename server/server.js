// Video4Ever Starter Code for Node.js Server
// Dr. Miller
// Start your server using npm run dev in the server directory
// You can setup your own server following the instructions at https://codedamn.com/news/reactjs/how-to-connect-react-with-node-js

// Express is a Node.js framework for handling routing
// Express determines what function to call based on the endpoint specified
const express = require('express');
const cors = require('cors');

const data = []
const app = express();
app.use(cors());
app.use(express.json());

// This is an example GET request endpoint
// req is the request object that was sent
// res is the result object of the request
// The result is converted to a JSON object with a key of message and value "Hello from server!"

/*
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/src/index.js'), (err) => err && res.status(500).send(err));
});*/
var mysql = require('mysql2');

    var con = mysql.createConnection({
        host: "db.redhawks.us",
        user: "redhawks_rubric",
        password: "IuPzUwXxq0bll6r",
        database: "redhawks_rubric"
      });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("SELECT rubric.rubricName, rubric.idRubric, standard.standardName, cell.idStandard, cell.cellNum, cell.cellDesc FROM cell INNER JOIN standard ON cell.idStandard = standard.idStandard JOIN rubric ON standard.idRubric = rubric.idRubric;", function (err, result, fields) {
            if (err) console.log(err);
            const data = result;
            console.log(data);
        });
    });
app.post('/message', (req, res) => {
    //res.json({ message: "Hello from server!" });
    
});

//const sorted = [];
//sorted = data.filter((object) => object.BranchName.includes("ville"));

// This will check if the server is running on port 8000
// If you change the port number here, you also have to change the baseURL in App.js
app.listen(3000, () => {
    console.log(`Server is running on port 3000.`);
  });