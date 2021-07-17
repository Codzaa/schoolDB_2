//Require Mysql module
const mysql = require('mysql');

class SQL_C {
  //->

  constructor(dbname) {
    //String for Initializing the Database
    //this.initDb = `CREATE DATABASE IF NOT EXISTS ${dbname};`
    //Setup variables for Database Connection
    this.con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: dbname
      });
    //An Array of Objects for The Database Tables
    this.dbTables = { students : "students",
                     departments : "departments",
                     courses : "courses",
                     instructors : "instructors",
                     classrooms : "classrooms" ,
                     timeslots : "timeslots",
                     //Advsiors Table Needs Both Student and Instructor ID as Foreign Keys
                     advisors : "advisors",
                     //prereqs Table Needs Courses ID as Foreign Key
                     prereqs : "prereqs",
                     //Section Tables Needs building,room_number,course_id,time_slot_id,Foreign Keys
                     sections : "sections",
                     //Teaches Table Needs Instructor ID as Foreign Key
                     teaches : "teaches",
                     //Takes Table Needs Course ID,Sec ID,semester,year Foreign Keys
                     takes : "takes",
                     //Dummy table
                     dummy : "dummy"
                   };
  }

  //Function For Starting the Connection to MySQL Server
  startConnection_F(){
    //Using the con variable we created in the Constructor lets try to connect to the Server
    this.con.connect(function(err) {
      //If there is an Error then show it/throw
      if (err) throw err;
      //Show Message in the terminal that Connection is Successful
      console.log("Successfully Connected to MySql Server");
    });
  }

  //Function for Initializing Tables
  initTables_F(){
    //For Loop
    for(let table in this.dbTables) {
        //
        //console.log(table + " : " + dbTables[table]);
        //Create SQL Query to search for the Users Table
        let sqlquery = `SHOW TABLES LIKE '${table}'`;
        //
        this.con.query(sqlquery,(err,result)=>{
          if(err) throw err;
          //console.log(result);
          if(result.length == 0 ){
            var createQuery;
             switch (table) {
               case "students":
                   createQuery =
                    `CREATE TABLE ${table}(
                     id int,
                     name VARCHAR(255),
                     dept_name VARCHAR(255),
                     tot_cred double,
                     PRIMARY KEY(id)
                   )`;
                   this.createTable_F(createQuery,table);
                 break;
             case "departments":
                 createQuery =
                  `CREATE TABLE ${table}(
                   dept_name VARCHAR(255),
                   building VARCHAR(255),
                   budget double,
                   PRIMARY KEY(dept_name)
                 )`;
                 this.createTable_F(createQuery,table);
                 break;
               case "classrooms":
                   createQuery =
                    `CREATE TABLE ${table}(
                     building VARCHAR(255),
                     room_number int,
                     capacity VARCHAR(255),
                     PRIMARY KEY(building,room_number)
                   )`;
                  this.createTable_F(createQuery,table);
                 break;
               case "courses":
                   createQuery =
                    `CREATE TABLE ${table}(
                     course_id int,
                     title VARCHAR(255),
                     dept_name VARCHAR(255),
                     credits double,
                     PRIMARY KEY(course_id)
                   )`;
                   this.createTable_F(createQuery,table);
                 break;
               case "instructors":
                   createQuery =
                    `CREATE TABLE ${table}(
                     id int,
                     name VARCHAR(255),
                     dept_name VARCHAR(255),
                     salary double,
                     PRIMARY KEY(id)
                   )`;
                   this.createTable_F(createQuery,table);
                 break;
               case "sections":
                   createQuery =
                    `CREATE TABLE ${table}(
                     course_id int,
                     sec_id int,
                     semester VARCHAR(255),
                     year VARCHAR(255),
                     building VARCHAR(255),
                     room_number int,
                     time_slot_id int,
                     PRIMARY KEY(course_id,sec_id,semester,year),
                     FOREIGN KEY(course_id) REFERENCES ${this.dbTables.courses}(course_id),
                     FOREIGN KEY(building,room_number) REFERENCES ${this.dbTables.classrooms}(building,room_number),
                     FOREIGN KEY(time_slot_id) REFERENCES ${this.dbTables.timeslots}(time_slot_id)
                   )`;
                   this.createTable_F(createQuery,table);
                 break;
               case "teaches":
               createQuery =
                    `CREATE TABLE ${table}(
                     id int,
                     course_id int,
                     sec_id int,
                     semester VARCHAR(255),
                     year VARCHAR(255),
                     PRIMARY KEY(id,course_id,sec_id,semester,year),
                     FOREIGN KEY(course_id,sec_id,semester,year) REFERENCES ${this.dbTables.sections}(course_id,sec_id,semester,year)
                   )`;
                   this.createTable_F(createQuery,table);
                 break;
               case "takes":
               createQuery =
                    `CREATE TABLE ${table}(
                     id int,
                     course_id int,
                     sec_id int,
                     semester VARCHAR(255),
                     year VARCHAR(255),
                     grade VARCHAR(255),
                     PRIMARY KEY(id,course_id,sec_id,semester,year),
                     FOREIGN KEY(id) REFERENCES ${this.dbTables.students}(id),
                     FOREIGN KEY(course_id,sec_id,semester,year) REFERENCES ${this.dbTables.sections}(course_id,sec_id,semester,year)
                   )`;
                   this.createTable_F(createQuery,table);
                 break;
               case "advisors":
                   createQuery =
                    `CREATE TABLE ${table}(
                     s_ID int,
                     FOREIGN KEY(s_ID) REFERENCES ${this.dbTables.students}(id),
                     i_ID int,
                     FOREIGN KEY(i_ID) REFERENCES ${this.dbTables.instructors}(id),
                     PRIMARY KEY(s_ID)
                   )`;
                   this.createTable_F(createQuery,table);
                 break;
               case "timeslots":
                   createQuery =
                    `CREATE TABLE ${table}(
                     time_slot_id int,
                     day VARCHAR(255),
                     start_time VARCHAR(255),
                     end_time VARCHAR(255),
                     PRIMARY KEY(time_slot_id,day,start_time)
                   )`;
                   this.createTable_F(createQuery,table);
                 break;
               case "prereqs":
                   createQuery =
                    `CREATE TABLE ${table}(
                     course_id int,
                     FOREIGN KEY(course_id) REFERENCES ${this.dbTables.courses}(course_id),
                     prereq_id int,
                     PRIMARY KEY(course_id,prereq_id)
                   )`;
                   this.createTable_F(createQuery,table);
                 break;
               case "dummy":
                   createQuery =
                    `CREATE TABLE ${table}(
                     dummy_id int,
                     dummy_text VARCHAR(255),
                     PRIMARY KEY(dummy_id)
                   )`;
                   this.createTable_F(createQuery,table);
                 break;
               default:
                  console.log("Error Table Name Not found at creatiion point");
             }
             //
          }else {
            console.log(`Table ${table} initilized.`)
          }
        });
    }
  }
  //Create Table Function
  createTable_F(createQuery,table){
    this.con.query(createQuery,function(err,result){
       if(err) throw err;
       console.log(`Table ${table} created`);
       //console.log(fields);
    });
  }
  //Add Record Function
  addRec_F(record,table,res){
    //Variable for setting the correct SQL Command to check for specific record
    var checker;
    //Switch case for Selecting the correct SQL Statement for the correct Table
    switch (table) {
      case "teaches":
        checker = `SELECT * FROM ${table} WHERE id = ${record.id}
        AND course_id = ${record.course_id} AND sec_id = ${record.sec_id}
        AND semester = ${record.semester} AND year = ${record.year}`;
        break;
      case "sections":
        checker = `SELECT * FROM ${table} WHERE course_id = ${record.course_id}
        AND sec_id = ${record.sec_id} AND semester = ${record.semester} AND year = '${record.year}'`;
        break;
      case "takes":
        checker = `SELECT * FROM ${table} WHERE id = ${record.id}
        AND course_id = ${record.course_id} AND sec_id = '${record.sec_id}'`;
        break;
      case "prereqs":
        checker = `SELECT * FROM ${table} WHERE course_id = '${record.course_id}'`;
        break;
      case "courses":
        checker =`SELECT * FROM ${table} WHERE course_id = '${record.course_id}'`;
        break;
      case "advsiors":
        checker =`SELECT * FROM ${table} WHERE s_ID = '${record.s_ID}'`;
        break;
      case "departments":
        checker = `SELECT * FROM ${table} WHERE dept_name = '${record.dept_name}'`;
        break;
      case "advisors":
        checker = `SELECT * FROM ${table} WHERE s_ID = '${record.s_ID}'`;
        break;
      default:
        checker = `SELECT * FROM ${table} WHERE id = '${record.id}'`;
    }
    //Check for Duplicate id by looking for that record
    //let checker = `SELECT * FROM ${table} WHERE id = '${record.id}'`;
    this.con.query(checker,(err,result)=>{
      if(err) throw err;
      //If there is no record found then INSERT new Record
      if(result.length == 0){
        //Insert Record
        let insertQuery = `INSERT INTO ${table} SET ?`;
        let finalQuery = this.con.query(insertQuery,record,(err,result)=>{
          if(err) throw err;
          //Success Message in the Terminal
          console.log("Record Inserted")
          //Response header containing the HTML page and Data to be shown on that page
          res.render(`add-${table}.html`,{message:"Record Successfully Added to Database",color:"blue"});
        });
        //Else the Record Already Exists
      }else{
        console.log(`${table} Exits`);
        //Response header containing the HTML page and Data to be shown on that page
        res.render(`add-${table}.html`,{message:"Record Already Exists!",color:"red"});
      }
    });
  }
  //Get All Records
  getAllRec_F(table,res){
    let sqlQuery = `SELECT * FROM ${table}`;
    this.con.query(sqlQuery,(err,result)=>{
      if(err) throw err;
      //Store the list of records
      let records = result;
      //Response header containing the HTML page and Data to be shown on that page
      res.render(`${table}.html`,{dataList:records});
    });
  }
  //Get Page
  getPage_F(page,res,table){
    //
    var query,query2;
    switch (page) {
      case "add-sections":
        var coursesList,classroomsList;
        query = `SELECT * FROM courses`;
        query2 = `SELECT * FROM classrooms`;
        //SQL Query for getting the Courses List
        this.con.query(query,(err,result)=>{
          if(err) throw err;
          coursesList = result;
        });
        //SQL Query for getting the Classrooms List
        this.con.query(query2,(err,result)=>{
          if(err) throw err;
          res.render(`${page}.html`,{coursesList:coursesList,classroomsList:result})
        });
        break;
      case "add-advisors":
        var studentsList,instructorsList;
        query = `SELECT * FROM students`;
        query2 = `SELECT * FROM instructors`;
        //SQL Query for getting the Students List
        this.con.query(query,(err,result)=>{
          if(err) throw err;
          studentsList = result;
        });
        //SQL Query for getting the Instructors List
        this.con.query(query2,(err,result)=>{
          if(err) throw err;
          res.render(`${page}.html`,{studentsList:studentsList,instructorsList:result})
        });
        break;
      default:
        query = `SELECT * FROM ${table}`;
        this.con.query(query,(err,result)=>{
          if(err) throw err;
          //
          res.render(`${page}.html`,{dataList:result});
        });
    }
  }


  //->
}


module.exports = {
  SQL_C : SQL_C,
}
