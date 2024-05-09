# FRQ Gradr
AP FRQ Grading App for Software Engineering 2

In this web application, teachers can log in with google for their account, and create standardized AP rubrics that have customizable standards. They can also enter a form to create an assignment with a student name, assignment name, class period, and selected rubric that will then be pushed to a database and should generate a new grading UI for that student's assignment.

## Platform Requirements
This is a React web application, so React and nodeJS are required to run it. It is usable on windows or macOS.

## Required Installations
Installation of React and nodeJS are required, link here (placeholder).

## App Configuration / Internal React Libraries Needed (npm install __)
- placeholder

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
- placeholder

## Data Schema
This application uses an SQL database in phpMyAdmin.
The tables used are as follows:
     - "grade" table for each specific grade (first name, last name, class period, assignment name, rubric)
     - "rubric" table that specifies each greater rubric
     - "standard" table that specifies each standard within a rubric
     - "cell" table that specifies each cell within each standard within a rubric
