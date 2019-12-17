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


// beginning tree
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
          viewroles();
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

// remove inquirers

function inqRemoveRole() { 
  inquirer
    .prompt([

      {
        name: "removeRole",
        type: "rawlist",
        message: "What role would you like to remove?",
        // choices: [
        // ]
      }

    ])
    .then(function (answer) {


    });
};

function inqRemoveEmploy() { 
  inquirer
    .prompt([

      {
        name: "removeEmployee",
        type: "rawlist",
        message: "Which employee would you like to remove?",
        // choices: [
        // ]
      }

    ])
    .then(function (answer) {


    });
}

// update inquirers

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


    });
};

// view inquirers
function inqViewDep() {
  inquirer
    .prompt([

      {
        name: "viewDepartment",
        type: "rawlist",
        message: "What department would you like to view?",
        // choices: [
        // ]
      }

    ])
    .then(function (answer) {


    });
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


    });
};
