# FRQ Gradr
AP FRQ Grading App for Software Engineering 2

In this web application, teachers can log in with google for their account, and create standardized AP rubrics that have customizable standards. They can also enter a form to create an assignment with a student name, assignment name, class period, and selected rubric that will then be pushed to a database and should generate a new grading UI for that student's assignment.

## Platform Requirements
This is a React web application, so React and nodeJS are required to run it. It is usable on windows or macOS.

## Required Installations
Installation of React and nodeJS are required.
Links:
- https://nodejs.org/en/download
- https://www.freecodecamp.org/news/how-to-install-react-a-step-by-step-guide/

## App Configuration / Internal React Libraries Needed
Required Libraries (for all of these type npm install ____ (whatever library is stated)
### App Configuration for Client Side
- react
- react-dom
- react-router
- react-router-dom
- react-select
- web-vitals
- @reactoauth/google
- react-scripts
     - start
     - build
     - test
     - eject

### Configuration for Server Side
- react-scripts
- cors
- express
- mysql

## How to Run the Project
- Open two parallel terminals in Visual Studio Code.
- Type in the first terminal:
     - cd app
     - cd server
     - node server.js
- Type in the second terminal:
     -  cd app
     -  cd client
     -  npm start
After the "npm start" in the second terminal is completed, the program should pop up to the dashboard.

## Project Architecture
We have a client side of our program and a server side to our program. The server side handles accessing the database, and getting or posting to it. The client side handles just about everything else. The main app.js file contains all of the routes for the different pages in the app. The dashboard.js file is the actual starting page, and everything goes from there. There are components and pages. Components are the smaller, reusable parts that can be used on larger pages, like headers or forms. 

## Data Schema
This application uses an SQL database in phpMyAdmin.
The tables used are as follows:
     - "grade" table for each specific grade (first name, last name, class period, assignment name, rubric)
     - "rubric" table that specifies each greater rubric
     - "standard" table that specifies each standard within a rubric
     - "cell" table that specifies each cell within each standard within a rubric
