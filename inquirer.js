var inquirer = require("inquirer");
// function which prompts the user for what action they should take

adds department, roles, employees
unction inqAddEmploy() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
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
          type: "rawlist",
          message: "What is their role?",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          }
        },

      ])
      .then(function (answer) {
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, null )";
        connection.query(query,
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role,
            manager_id: answer.manager
          }
          , function (err, res) {
            if (err) throw err;
            console.log(answer.firstName + ' ' + answer.lastName + " has been added!")
            start();
          });
      });
  })
};

view by department, roles, employees
update employee roles


// returns for inquirer (needs the most work)
// =====================================================

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

function returnRoles() {
  connection.query("SELECT * FROM role", function (err, results) {
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
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
          message: "Which role?"
        }
      ])
      .then(function (answer) {
        console.log(answer)
      })
  })
};

function returnManagers() {
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

function returnDepart() {
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
              choiceArray.push(results[i].name);
            }
            return choiceArray;
          },
          message: "Which department?"
        }
      ])
      .then(function (answer) {
        console.log(answer)
      })
  })
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
      }
    ]).then(
      connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        inquirer
          .prompt(
            {
              name: "role",
              type: "input",
              message: "What is their role?",
              choices: function () {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].title);
                }
                return choiceArray;
              }
            }
          )}.then(
            inquirer
              .prompt(
                {
                  name: "manager",
                  type: "input",
                  message: "Who manages this employee?",
                  // choices: [
                  //   // function that returns all employees
                  // ]
                }
              )).then(function (answer) {
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