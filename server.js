var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Stockholm!1",
    database: "employeeDB"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

  function start() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by manager",
                "Add employee",
                "Remove employee",
                "Update employee role",
                "Update employee manager",
                "View all roles",
                "Add role",
                "Remove Role",
                "Exit"]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View all employees":
                    viewEmploys();
                    break;

                case "View all employees by department":
                    viewEmployDept();
                    break;

                case "View all employees by manager":
                    viewEmployMang();
                    break;

                case "Add employee":
                    addEmploy();
                    break;

                case "Remove employee":
                    removeEmploy();
                    break;

                case "Update employee role":
                    updateEmployRole();
                    break;

                case "Update employee manager":
                    updateEmployMang();
                    break;

                case "View all roles":
                    viewRoles();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Remove Role":
                    removeRole();
                    break;

                case "Exit":
                    exit();
                    break;
            }
        });
}
  
function viewEmploys(){};

function viewEmployDept(){};

function viewEmployMang(){};

function addEmploy(){};

function removeEmploy(){};

function updateEmployRole(){};

function updateEmployMang(){};

function viewRoles(){};

function addRole(){};

function removeRole(){};

function exit(){};