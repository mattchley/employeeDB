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
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  // start();
  returnRoles();
  // test();
});

// inquirer functions
// =====================================================

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
        "Remove role",
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
          inqAddEmploy();
          break;

        case "Remove employee":
          inqRemoveEmploy();
          break;

        case "Update employee role":
          updateEmployrole();
          break;

        case "Update employee manager":
          updateEmployMang();
          break;

        case "View all roles":
          viewroles();
          break;

        case "Add role":
          inqAddrole();
          break;

        case "Remove role":
          inqRemoveRole();
          break;

        case "Exit":
          exit();
          break;
      }
    });
};

function inqAddEmploy() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is their first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is their last name?",
      },
      {
        name: "role",
        type: "input",
        message: "What is their role?",
        // choices: [
        // ]
      },
      {
        name: "manager",
        type: "input",
        message: "Who manages this employee?",
        // choices: [
        //   // function that returns all mangers
        // ]
      },

    ])
    .then(function (answer) {


    });
};

function inqRemoveEmploy() { };


function inqUpdateEmployRole() {
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
    function (error) {
      if (error) throw err;
      console.log("Bid placed successfully!");
      start();
    }
  );
};

function inqUpdateEmployMang() {
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
    function (error) {
      if (error) throw err;
      console.log("Bid placed successfully!");
      start();
    }
  );
};

function inqViewRoles() {
  var query = "SELECT role, song, year FROM top5000 WHERE ?";
  connection.query(query, [], function (err, res) {
    if (err) throw err;
  });
};

function inqAddRole() {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What is role would you like to add?",
      },
      {
        name: "amount",
        type: "input",
        message: "How much do they make?",
      },
      {
        name: "department",
        type: "input",
        message: "Which department do they belong to?",
      },
    ])
    .then(function (answer) { });
};

function inqRemoveRole() { };

function exit() { };

// mysql functions
// =====================================================
// works
function test() {
  var query = `SELECT * FROM ((employee INNER JOIN role ON role.id = employee.role_id) INNER JOIN department ON department.id = role.department_id)`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res)
  });

};
// needs formatting
function viewEmploys() {
  // function that show all employees mySQL
  var query = `SELECT * FROM ((employee INNER JOIN role ON role.id = employee.role_id) INNER JOIN department ON department.id = role.department_id)`;
  connection.query(query, [], function (err, res) {
    if (err) throw err;
    console.log(res)
  });
};
// still need to add inquirer funct
function viewEmployDept() {
  // function that show all employees by department mySQL
  var query = `SELECT * FROM ((department INNER JOIN role ON role.id = department.id) INNER JOIN employee ON employee.role_id= role.id) WHERE name = "Finance" `;
  connection.query(query, [], function (err, res) {
    if (err) throw err;
    console.log(res)
  });
};
// i think the manager_id is the problem
function viewEmployMang() {
  // function that show all employees by managment mySQL

  var query = `SELECT * FROM employee BY manager_id = "3"`;
  connection.query(query, [], function (err, res) {
    if (err) throw err;
  });
};
// works need to add inquirer funct
function addEmploy() {
  var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( 'matt', 'atchley', 2, null )`;
  connection.query(query,
    []
    , function (err, res) {
      if (err) throw err;
      console.log(query + "has been added!")
      // [{ first_name: answer.firstName },
      //   { last_name: answer.lastName },
      //   { role: answer.role },
      //   { manager_id: answer.manager }
    });
}
// works need to add inquirer funct
function removeEmploy() {
  // function that removes employee from SQL
  var query = `DELETE FROM employee WHERE first_name = "matt"`;
  connection.query(query, [], function (err, res) {
    if (err) throw err;
    console.log(query);
  });
};
// works need to add inquirer funct
function addRole() {

  var query = `INSERT INTO role (title, salary, department_id) VALUES ('CEO', 1000000, 1 )`;
  connection.query(query, [], function (err, res) {
    if (err) throw err;
    console.log(query + "has been added!")
    // { title: answer.newRole }, { salary: answer.amount }, { department_id: answer.department }
  });
};
// works need to add inquirer funct
function removeRole() {
  var query = `DELETE FROM role WHERE title = "CEO"`;
  connection.query(query, [], function (err, res) {
    if (err) throw err;
    console.log(query);
  });
};

function updateEmployRole() {
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
    function (error) {
      if (error) throw err;
      console.log("Bid placed successfully!");
      start();
    }
  );
};

function updateEmployMang() {
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
    function (error) {
      if (error) throw err;
      console.log("Bid placed successfully!");
      start();
    }
  );
};

function viewRoles() {
  var query = "SELECT role, song, year FROM top5000 WHERE ?";
  connection.query(query, [], function (err, res) {
    if (err) throw err;
  });
};

function returnRolestest() {
  connection.query("SELECT title FROM role", function (err, res) {
    if (err) throw err;

    function test() {
      var choiceArray = [];
      for (var i = 0; i < returnedTitles.length; i++) {
        choiceArray.push(returnedTitles[i].item_name);
      }
      console.log(choiceArray);
    }
    test(res);
    // return choiceArray;

    // inquirer
    //   .prompt({
    //     name: "choice",
    //     type: "rawlist",
    //     choices: function () {
    //       var choiceArray = [];
    //       for (var i = 0; i < res.length; i++) {
    //         choiceArray.push(res[i].item_name);
    //       }
    //       return choiceArray;
    //     },
    //     message: "What would you like to do?",
    //   })
    //   .then(function (answer) {
    //     console.log(answer)
    //   });
  });
};

function returnEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log(res)
  });
};

function returnRoles() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What role do you want to choose?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
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
            function (error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}