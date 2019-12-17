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
  start();
});

// inquirer functions
// =====================================================

// beginning tree
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
          // returns data
          viewEmploys();
          break;

        case "View all employees by department":
          // needs inquirer by which department
          inqViewDep();
          break;

        case "View all employees by manager":
          // needs inquirer by which manager
          inqViewMang();
          break;

        case "Add employee":
          // needs inquirer to ask info
          inqAddEmploy();
          break;

        case "Remove employee":
          // needs inquiere to ask info
          inqRemoveEmploy();
          break;

        case "Update employee role":
          // reutrns update message is a PUT
          inqUpdateEmployRole();
          break;

        case "Update employee manager":
          // returns update messge is a PUT
          inqUpdateEmployMang();
          break;

        case "View all roles":
          // returns data
          viewRoles();
          break;

        case "Add role":
          // needs inquirer to ask info
          inqAddRole();
          break;

        case "Remove role":
          // needs inquirer to ask info
          inqRemoveRole();
          break;

        case "Exit":
          // needs SQL to end connection
          exit();
          break;
      }
    });
};

// add inquirers
// =====================================================
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
        //   // function that returns all employees
        // ]
      },

    ])
    .then(function (answer) {
      var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?,? )`;
      connection.query(query,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role: answer.role,
          manager_id: answer.manager
        }
        , function (err, res) {
          if (err) throw err;
          console.log(answer.firstName + ' ' + answer.lastName + " has been added!")
          start();
        });
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
    .then(function (answer) {
      var query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ? )`;
      connection.query(query, {
        title: answer.newRole,
        salary: answer.amount,
        department_id: answer.department,
      }, function (err, res) {
        if (err) throw err;
        console.log(answer.newRole + "has been added!")
        start();
      });
    });
};

// remove inquirers
// =====================================================
function inqRemoveRole() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
          message: "Which role would you like to remove?"
        }
      ])
      .then(function (answer) {
        var query = `DELETE FROM role WHERE ?`;
        connection.query(query, {
          title: answer.removeRole
        }, function (err, res) {
          if (err) throw err;
          console.log(answer.removeRole + " has been removed");
          start();
        });
      });
  });
};

function inqRemoveEmploy() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].first_name + " " + results[i].last_name);
            }
            return choiceArray;
          },
          message: "Which employee?"
        }
      ])
      .then(function (answer) {
        var query = `DELETE FROM employee WHERE ?`;
        connection.query(query, {
          first_name: answer.removeEmployee,
        }, function (err, res) {
          if (err) throw err;
          console.log(answer.removeEmploy + " has been removed");
          start();
        });

      });
  })
};

// update inquirers
// =====================================================
function inqUpdateEmployRole() {
  inquirer
    .prompt([

      {
        name: "updateEmployee",
        type: "rawlist",
        message: "Which employee would you like to update?",
        // choices: [
        // ]
      },
      {
        name: "updateRole",
        type: "rawlist",
        message: "What is there role?",
        // choices: [
        // ]
      }

    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [
          {
            role_id: answer.updateRole
          },
          {
            id: answer.updateEmployee
          }
        ],
        function (error) {
          if (error) throw err;
          console.log("Role successfully changed!");
          start();
        }
      );

    });
};

function inqUpdateEmployMang() {
  inquirer
    .prompt([

      {
        name: "updateEmployee",
        type: "rawlist",
        message: "Which employee would you like to update?",
        // choices: [
        // ]
      },
      {
        name: "updateManger",
        type: "rawlist",
        message: "Who is their manager?",
        // choices: [
        // ]
      }

    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [
          {
            role_id: answer.updateRole
          },
          {
            id: answer.updateEmployee
          }
        ],
        function (error) {
          if (error) throw err;
          console.log("Role successfully changed!");
          start();
        }
      );

    });
};

// view inquirers
// =====================================================
function inqViewDep() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].first_name + " " + results[i].last_name);
            }
            return choiceArray;
          },
          message: "Which department?"
        }
      ])
      .then(function (answer) {
        var query = `SELECT * FROM ((department INNER JOIN role ON role.id = department.id) INNER JOIN employee ON employee.role_id= role.id) WHERE ? `;
        connection.query(query, {
          name: answer.choice
        }, function (err, res) {
          if (err) throw err;
          console.log(res)
          start();
        });
      })
  })
};

function inqViewMang() {
  inquirer
    .prompt([

      {
        name: "viewManger",
        type: "rawlist",
        message: "What manger would you like to view?",
        // choices: [
        // ]
      }

    ])
    .then(function (answer) {
      var query = `SELECT * FROM employee BY ?`;
      connection.query(query, {
        manager_id: answer.viewManger
      }, function (err, res) {
        if (err) throw err;
        console.log(res)
        start();
      });

    });
};



// view
// =====================================================
// needs formatting
function viewEmploys() {
  // function that show all employees mySQL
  var query = `SELECT * FROM ((employee INNER JOIN role ON role.id = employee.role_id) INNER JOIN department ON department.id = role.department_id)`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
    start();
  });
};

function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res)
    start();
  });
}


// view
// =====================================================
function exit() {
  connection.end()
}

function returnEmployees() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].first_name + " " + results[i].last_name);
            }
            return choiceArray;
          },
          message: "Which employee?"
        }
      ])
      .then(function (answer) {
        console.log(answer)
      })
  })
};