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
    // start();
    test();
  });


function test(){
  var query = "SELECT * FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res)
  });
  
};

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
                "Update employee position",
                "Update employee manager",
                "View all Positions",
                "Add position",
                "Remove position",
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

                case "Update employee position":
                    updateEmployPosition();
                    break;

                case "Update employee manager":
                    updateEmployMang();
                    break;

                case "View all Positions":
                    viewPositions();
                    break;

                case "Add position":
                    addPosition();
                    break;

                case "Remove position":
                    removePosition();
                    break;

                case "Exit":
                    exit();
                    break;
            }
        });
};
  
function viewEmploys(){
  // function that show all employees mySQL
  var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, [], function(err, res) {
        if (err) throw err;
      });
};

function viewEmployDept(){
  // function that show all employees by department mySQL
  var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, [], function(err, res) {
        if (err) throw err;
      });
};

function viewEmployMang(){
  // function that show all employees by managment mySQL
  var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, [], function(err, res) {
        if (err) throw err;
      });
};

function addEmploy(){
  inquirer
  .prompt([
    {
      name: "first name",
      type: "input",
      message: "What is their first name?",
    },
    {
      name: "last name",
      type: "input",
      message: "What is their last name?",
    },
    {
      name: "position",
      type: "list",
      message: "What is their position?",
      choices: [
        "sales lead",
        "salesperson",
        "lead engineer",
        "software engineer",
        "account manager",
        "accountant",
        "legal team lead",
        "lawyer"
      ]
    },
    {
      name: "manager",
      type: "rawlist",
      message: "Who manages this employee?",
      choices: [
      // function that returns all mangers
      ]
    },

  ])
  .then(function (answer) {
    var query = "SELECT position, song, year FROM top5000 WHERE ?";
    connection.query(query, [], function(err, res) {
      if (err) throw err;
    });

  });
};

function removeEmploy(){
  // function that removes employee from SQL
  var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, [], function(err, res) {
        if (err) throw err;
      });
};

function updateEmployRole(){
  connection.query(
      "UPDATE auctions SET ? WHERE ?",
      [
        {
          highest_bid: answer.bid
        },
        {
          id: chosenItem.id
        }
      ],
      function(error) {
        if (error) throw err;
        console.log("Bid placed successfully!");
        start();
      }
    );
};

function updateEmployMang(){
  connection.query(
      "UPDATE auctions SET ? WHERE ?",
      [
        {
          highest_bid: answer.bid
        },
        {
          id: chosenItem.id
        }
      ],
      function(error) {
        if (error) throw err;
        console.log("Bid placed successfully!");
        start();
      }
    );
};

function viewPositions(){
  var query = "SELECT position, song, year FROM top5000 WHERE ?";
  connection.query(query, [], function(err, res) {
    if (err) throw err;
  });
};

function addPosition(){
  inquirer
  .prompt(
    {
      name: "add position",
      type: "input",
      message: "What is position would you like to add?",
    }
  )
  .then(function (answer) {
    var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, [], function(err, res) {
        if (err) throw err;
      });
  });
};

function removePosition(){
  var query = "SELECT position, song, year FROM top5000 WHERE ?";
  connection.query(query, [], function(err, res) {
    if (err) throw err;
  });
};

function exit(){};
