//Require Class from crud.js
const {SQL_C} = require('./js/sql.js');
//Express Server 1
const express = require("express");
//Allow to use the system path
const path = require("path");
//Template language for writing HTML
const nunjucks = require("nunjucks");
//Express Server 2
const app = express();
//Making a Server Object
const server = require("http").createServer(app);
//Allows to send HTTP posts
const bodyParser = require("body-parser");
//
const io = require('socket.io')(server,{cors:{origin:"*"}});
///////////////////////////////////////////////////////////////////////////////
//Port Number that the Server will runs on
server.listen(3000,()=>{
    console.log("Server running on port", 3000)
});
///////////////////////////////////////////////////////////////////////////////
//Create Object for SQL Stuff
var sqlObj = new SQL_C("voice");
//Start Connection
sqlObj.startConnection_F();
//Initializing Tables
sqlObj.initTables_F();
//
///////////////////////////////////////////////////////////////////////////////
//Get Request for Home Page
app.get("/",(req,res)=>{
  //Send index page as the response
  res.render('index.html');
});
//Set the View Engine for Express
app.set('view engine', 'html')
//Set directory for static files to work
app.use(express.static('views'))
//For Passing Data via Post Request from Client
app.use(bodyParser.urlencoded({ extended: false }));
//Nunjucks Configuration
nunjucks.configure(path.resolve(__dirname,'views'),{
  autoescape: true,
  express: app
});
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////GET REQUESTS/////////////////////////////////////
//Get Request for all Students
app.get("/students",(req,res)=>{
  //Get All Students from Database
  sqlObj.getAllRec_F("students",res);
});
//Get Request for the Add Student Page
app.get("/add-students",(req,res)=>{
  //Get The Add Student Page
  sqlObj.getPage_F("add-students",res,"departments");
});
//Get Request for all Departments
app.get("/departments",(req,res)=>{
  //Get All Departments from Database
  sqlObj.getAllRec_F("departments",res);
});
//Get Request for the Add Department Page
app.get("/add-departments",(req,res)=>{
  //Get The Add Student Page
  sqlObj.getPage_F("add-departments",res,"dummy");
});
//Get Request for all Instructors
app.get("/instructors",(req,res)=>{
  //Get All Instructors from Database
  sqlObj.getAllRec_F("instructors",res);
});
//Get Request for the Add Department Page
app.get("/add-instructors",(req,res)=>{
  //Get The Add Student Page
  sqlObj.getPage_F("add-instructors",res,"departments");
});
//Get Request for all Advisors
app.get("/advisors",(req,res)=>{
  //Get All Advisors from Database
  sqlObj.getAllRec_F("advisors",res);
});
//Get Request for the Add Advisor Page
app.get("/add-advisors",(req,res)=>{
  //Get The Add Advisor Page
  sqlObj.getPage_F("add-advisors",res,"departments");
});
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////POST REQUESTS/////////////////////////////////////
//Post request to A Student
app.post("/addstudent",(req,res)=>{
  //If functions for validating the Student fields
  if(req.body.id.length == 0){
    console.log("Need Id");
    res.render("add-students.html",{message:"Student ID Needed",color:"red"});
    return;
  }
  if(req.body.name.length == 0){
    console.log("Need Name");
    res.render("add-students.html",{message:"Student Name Needed",color:"red"});
    return;
  }
  if(req.body.dept_name.length == 0){
    console.log("Need Department Name");
    res.render("add-students.html",{message:"Student Department Needed",color:"red"});
    return;
  }
  if(req.body.tot_cred.length == 0){
    console.log("Need Credits");
    res.render("add-students.html",{message:"Student Credits Needed",color:"red"});
    return;
  }
  if(req.body.tot_cred == 0){
    console.log("Need Credits");
    res.render("add-students.html",{message:"Student Credits Needed",color:"red"});
    return;
  }
  //The data inside the request body is the record
  var record = req.body;
  sqlObj.addRec_F(record,"students",res);
  //
})
//Post request to Add Department
app.post("/adddepartments",(req,res)=>{
  if(req.body.dept_name.length == 0){
    console.log("Need Name");
    res.render("add-departments.html",{message:"Name Needed",color:"red"});
    return;
  }
  if(req.body.building.length == 0){
    console.log("Need Department Name");
    res.render("add-departments.html",{message:"building Needed",color:"red"});
    return;
  }
  if(req.body.budget == 0){
    console.log("Need Budegt");
    res.render("add-departments.html",{message:"Budget Needed",color:"red"});
    return;
  }
  //The data inside the request body is the record
  var record = req.body;
  sqlObj.addRec_F(record,"departments",res);
  //
})
//Post request to Add Instructors
app.post("/addinstructors",(req,res)=>{
  if(req.body.id.length == 0){
    console.log("Need Id");
    res.render("add-instructors.html",{message:"ID Needed",color:"red"});
    return;
  }
  if(req.body.name.length == 0){
    console.log("Need Name");
    res.render("add-instructors.html",{message:"Name Needed",color:"red"});
    return;
  }
  if(req.body.dept_name.length == 0){
    console.log("Need Department Name");
    res.render("add-instructors.html",{message:"Department Needed",color:"red"});
    return;
  }
  if(req.body.salary == 0){
    console.log("Need salary");
    res.render("add-instructors.html",{message:"Salary Needed",color:"red"});
    return;
  }
  //
  var record = req.body;
  sqlObj.addRec_F(record,"instructors",res);
  //
})
//Post request to Add Advisors
app.post("/addadvisors",(req,res)=>{
  if(req.body.s_ID.length == 0){
    console.log("Need Student ID");
    res.render("add-advisors.html",{message:"Student ID Needed",color:"red"});
    return;
  }
  if(req.body.i_ID.length == 0){
    console.log("Need Instructor ID");
    res.render("add-advisors.html",{message:"Instructor ID Needed",color:"red"});
    return;
  }
  //
  var record = req.body;
  sqlObj.addRec_F(record,"advisors",res);
  //
})
///////////////////////////////////////////////////////////////////////////////
/*
Functions and querying to be done:
a) To list one student’s marks of all courses grouping by semester;
b) To list all students’ marks about some course in the ascending or decreasing
order. And each querying only lists the marks of students in one class;
c) To compute the average marks of each course. And the average marks can be
grouped by class;
d) To count the number of courses that one student has learned, and compute his
total credits;
e) To query marks of one student about some course;
f) To query courses that are taught by some teacher in one semester;
g) To query courses that are taken by some class in one semester;
h) Other possible functions and querying that you can imagine. And extra
functions and querying will give you extra marks.
*/
