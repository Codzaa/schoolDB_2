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
//////////////////////////////////////////////////////////////////////////////
app.get("/function-a",(req,res)=>{
  //
  sqlObj.getAllRec_F2("function-a1","value",res);
});
app.get("/function-b",(req,res)=>{
  //
  sqlObj.getAllRec_F2("function-b","value",res);
});
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
//Get Request for all Courses
app.get("/courses",(req,res)=>{
  //Get All Courses from Database
  sqlObj.getAllRec_F("courses",res);
});
//Get Request for the Add Course Page
app.get("/add-courses",(req,res)=>{
  //Get The Add Course Page
  sqlObj.getPage_F("add-courses",res,"departments");
});
//Get Request for all Prereqs
app.get("/prereqs",(req,res)=>{
  //Get All Prereqs from Database
  sqlObj.getAllRec_F("prereqs",res);
});
//Get Request for the Add Prereq Page
app.get("/add-prereqs",(req,res)=>{
  //Get The Add Prereqs Page
  sqlObj.getPage_F("add-prereqs",res,"courses");
});
//Get Request for all Sections
app.get("/sections",(req,res)=>{
  //Get All Sections from Database
  sqlObj.getAllRec_F("sections",res);
});
//Get Request for the Add Sections Page
app.get("/add-sections",(req,res)=>{
  //Get The Add Sections Page
  sqlObj.getPage_F("add-sections",res,"courses");
});
//Get Request for all Takes
app.get("/takes",(req,res)=>{
  //Get All Takes from Database
  sqlObj.getAllRec_F("takes",res);
});
//Get Request for the Add Takes Page
app.get("/add-takes",(req,res)=>{
  //Get The Add Takes Page
  sqlObj.getPage_F("add-takes",res,"sections");
});
//Get Request for all Classrooms
app.get("/classrooms",(req,res)=>{
  //Get All Classrooms from Database
  sqlObj.getAllRec_F("classrooms",res);
});
//Get Request for the Add Classrooms Page
app.get("/add-classrooms",(req,res)=>{
  //Get The Add Classrooms Page
  sqlObj.getPage_F("add-classrooms",res,"dummy");
});
//Get Request for the Add Time Slots Page
app.get("/timeslots",(req,res)=>{
  //Get All timeslots from Database
  sqlObj.getAllRec_F("timeslots",res);
});
//Get Request for the Add timeslots Page
app.get("/add-timeslots",(req,res)=>{
  //Get The Add timeslots Page
  sqlObj.getPage_F("add-timeslots",res,"dummy");
});
//Get Request for the Teaches
app.get("/teaches",(req,res)=>{
  //Get All Teaches from Database
  sqlObj.getAllRec_F("teaches",res);
});
//Get Request for the Add Teaches Page
app.get("/add-teaches",(req,res)=>{
  //Get The Add Teaches Page
  sqlObj.getPage_F("add-teaches",res,"sections");
});
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////POST REQUESTS/////////////////////////////////////
//
app.post("/function-b2",(req,res)=>{
    //
    if(req.body.order.length == 0){
      console.log("Order needed");
      res.render("function-b.html",{message:"Order Needed",color:"red"});
      return;
    }
    //The data inside the request body is the record
    var record = req.body;
    sqlObj.getAllRec_F2("function-b2",record,res);
    //
});
//
app.post("/function-a2",(req,res)=>{
    //
    if(req.body.id.length == 0){
      console.log("Id Needed");
      res.render("function-a.html",{message:"ID Needed",color:"red"});
      return;
    }
    //The data inside the request body is the record
    var record = req.body;
    sqlObj.getAllRec_F2("function-a2",record,res);
    //
});
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
//Post request for adding a New Course
app.post("/addcourses",(req,res)=>{
  if(req.body.course_id.length == 0){
    console.log("Need Id");
    res.render("add-courses.html",{message:"ID Needed",color:"red"});
    return;
  }
  if(req.body.title.length == 0){
    console.log("Need Name");
    res.render("add-courses.html",{message:"Title needed",color:"red"});
    return;
  }
  if(req.body.dept_name.length == 0){
    console.log("Need Department Name");
    res.render("add-courses.html",{message:"Department Needed",color:"red"});
    return;
  }
  if(req.body.credits == 0){
    console.log("Need Credits");
    res.render("add-courses.html",{message:"Credits Needed",color:"red"});
    return;
  }
  //
  //The data inside the request body is the record
  var record = req.body;
  sqlObj.addRec_F(record,"courses",res);
  //
})
//Post request for adding a a new Prereq
app.post("/addprereqs",(req,res)=>{
  if(req.body.course_id.length == 0){
    console.log("Need Id");
    res.render("add-prereqs.html",{message:"Course id Needed",color:"red"});
    return;
  }
  if(req.body.prereq_id.length == 0){
    console.log("Prereq Id Needed");
    res.render("add-prereqs.html",{message:"Prereq Id Needed",color:"red"});
    return;
  }
  //
  //The data inside the request body is the record
  var record = req.body;
  sqlObj.addRec_F(record,"prereqs",res);
  //
})
//Post request for adding a new Take
app.post("/addtakes",(req,res)=>{
  if(req.body.id.length == 0){
    console.log("Need Id");
    res.render("add-takes.html",{message:"id Needed",color:"red"});
    return;
  }
  if(req.body.course_id.length == 0){
    console.log("Course Id Needed");
    res.render("add-takes.html",{message:"Course Id Needed",color:"red"});
    return;
  }
  if(req.body.sec_id.length == 0){
    console.log("Sec Id Needed");
    res.render("add-takes.html",{message:"Sec Id Needed",color:"red"});
    return;
  }
  if(req.body.semester.length == 0){
    console.log("semester Needed");
    res.render("add-takes.html",{message:"Semester Needed",color:"red"});
    return;
  }
  if(req.body.year.length == 0){
    console.log("Year Needed");
    res.render("add-takes.html",{message:"Year Needed",color:"red"});
    return;
  }
  if(req.body.grade.length == 0){
    console.log("Grade Needed");
    res.render("add-takes.html",{message:"Grade Needed",color:"red"});
    return;
  }
  //
  //The data inside the request body is the record
  var record = req.body;
  sqlObj.addRec_F(record,"takes",res);
  //
})
//Post request for Adding the Sections
app.post("/addsections",(req,res)=>{
  if(req.body.course_id.length == 0){
    console.log("Course Id Needed");
    res.render("add-sections.html",{message:"Course Id Needed",color:"red"});
    return;
  }
  if(req.body.sec_id.length == 0){
    console.log("Sec Id Needed");
    res.render("add-sections.html",{message:"Sec Id Needed",color:"red"});
    return;
  }
  if(req.body.semester.length == 0){
    console.log("semester Needed");
    res.render("add-sections.html",{message:"Semester Needed",color:"red"});
    return;
  }
  if(req.body.year.length == 0){
    console.log("Year Needed");
    res.render("add-sections.html",{message:"Year Needed",color:"red"});
    return;
  }
  if(req.body.building.length == 0){
    console.log("Building Needed");
    res.render("add-sections.html",{message:"building Needed",color:"red"});
    return;
  }
  if(req.body.room_number.length == 0){
    console.log("Room Number Needed");
    res.render("add-sections.html",{message:"Room Number Needed",color:"red"});
    return;
  }
  if(req.body.time_slot_id.length == 0){
    console.log("Time Slot Needed");
    res.render("add-sections.html",{message:"Time Slot Needed",color:"red"});
    return;
  }
  //
  //The data inside the request body is the record
  var record = req.body;
  sqlObj.addRec_F(record,"sections",res);
  //
})
//Post request for Adding the Classrooms
app.post("/addclassrooms",(req,res)=>{
  if(req.body.building.length == 0){
    console.log("Building Needed");
    res.render("add-classrooms.html",{message:"Building",color:"red"});
    return;
  }
  if(req.body.room_number.length == 0){
    console.log("Room Number Needed");
    res.render("add-classrooms.html",{message:"Room Number Needed",color:"red"});
    return;
  }
  if(req.body.capacity.length == 0){
    console.log("Capacity Needed");
    res.render("add-classrooms.html",{message:"Capacity Needed",color:"red"});
    return;
  }
  //
  //The data inside the request body is the record
  var record = req.body;
  sqlObj.addRec_F(record,"classrooms",res);
  //
})
//Post request for Adding the timeslots
app.post("/addtimeslots",(req,res)=>{
  if(req.body.time_slot_id.length == 0){
    console.log("Time slot Id Needed");
    res.render("add-timeslots.html",{message:"Time slot Id Needed",color:"red"});
    return;
  }
  if(req.body.day.length == 0){
    console.log("Day Needed");
    res.render("add-timeslots.html",{message:"Day Needed",color:"red"});
    return;
  }
  if(req.body.start_time.length == 0){
    console.log("Start Time Needed");
    res.render("add-timeslots.html",{message:"Start Time Needed",color:"red"});
    return;
  }
  if(req.body.end_time.length == 0){
    console.log("End Time Needed");
    res.render("add-timeslots.html",{message:"End Time Needed",color:"red"});
    return;
  }
  //
  //The data inside the request body is the record
  var record = req.body;
  sqlObj.addRec_F(record,"timeslots",res);
  //
})
//Post request for Adding the Teaches
app.post("/addteaches",(req,res)=>{
  if(req.body.id.length == 0){
    console.log("Id Needed");
    res.render("add-teaches.html",{message:"ID Needed",color:"red"});
    return;
  }
  if(req.body.course_id.length == 0){
    console.log("Course Id Needed");
    res.render("add-teaches.html",{message:"Course Id Needed",color:"red"});
    return;
  }
  if(req.body.sec_id.length == 0){
    console.log("Section Id needed");
    res.render("add-teaches.html",{message:"Section Id Needed",color:"red"});
    return;
  }
  if(req.body.semester.length == 0){
    console.log("Semester Needed");
    res.render("add-teaches.html",{message:"Semester Needed",color:"red"});
    return;
  }
  if(req.body.year.length == 0){
    console.log("Year Needed");
    res.render("add-teaches.html",{message:"Year Needed",color:"red"});
    return;
  }
  //
  //The data inside the request body is the record
  var record = req.body;
  sqlObj.addRec_F(record,"teaches",res);
  //
})
////////////////////////////////////////////////////////////////////////////////
