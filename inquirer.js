var inquirer = require("inquirer");
// function which prompts the user for what action they should take


// what to do?
    // view all employees
        // shows all the employees
    // view all employees by dept
        // sales
        // financing
        // engineering
        // legal
    // view all employees by manager
    // add employee
        // first name
        // last name
        // employee role
        // employee manager
            // gives list of all 
    // remove employee
        // shows all the employees
    // update employee role
        // sales lead
        // salesperson
        // lead engineer
        // software engineer
        // account manager
        // accountant
        // legal team lead
        // lawyer

    // update employee manager
        // show all employees
        // set the employee as the manger of someone else(removes the updated employee from the list)
    // view all roles
    // add role
    // remove role
// make sure there is a return line decribing the action has been done above

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
              choiceArray.push(results[i].first_name + " " + results[i].last_name);
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