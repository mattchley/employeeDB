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
    start();
});

// beginning tree
// =====================================================
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all department",
                "View all roles",
                "View all employees",
                "Add department",
                "Add role",
                "Add employee",
                "Update employee role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View all department":
                    // returns data
                    viewDepart();
                    break;

                case "View all roles":
                    // needs inquirer by which department
                    viewRoles();
                    break;

                case "View all employees":
                    // needs inquirer by which manager
                    viewEmploys();
                    break;

                case "Add department":
                    // needs inquirer to ask info
                    inqAddDepart();
                    break;

                case "Add role":
                    // needs inquiere to ask info
                    inqAddRole();
                    break;

                case "Add employee":
                    // reutrns update message is a PUT
                    inqAddEmploy();
                    break;

                case "Update employee role":
                    // returns update messge is a PUT
                    updateEmployRole();
                    break;

                case "Exit":
                    // needs SQL to end connection
                    exit();
                    break;
            }
        });
};

function viewDepart() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res)
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
};

function viewEmploys() {
    // function that show all employees mySQL
    var query = `SELECT * FROM ((employee INNER JOIN role ON role.id = employee.role_id) INNER JOIN department ON department.id = role.department_id)`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
    });
};

function inqAddDepart() {
    inquirer
        .prompt([
            {
                name: "newDepart",
                type: "input",
                message: "What is department would you like to add?"
            }
        ]).then(function (answer) {
            connection.query("INSERT INTO department SET ?",
                [
                    { name: answer.newDepart }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(answer.newDepart + "has been added!")
                    start();
                });
        })
}

function inqAddRole() {
    inquirer
        .prompt([
            {
                name: "newRole",
                type: "input",
                message: "What is role would you like to add?"
            },
            {
                name: "amount",
                type: "input",
                message: "How much do they earn?"
            },
            {
                name: "departmenr",
                type: "input",
                message: "what is the department id? (numbers)"
            }
        ]).then(function (answer) {
            connection.query("INSERT INTO role SET ?",
                [
                    { title: answer.newRole },
                    { salary: answer.amount },
                    { department_id: answer.department }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(answer.newRole + "has been added!")
                    start();
                });
        })
}

function inqAddEmploy() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is their first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is their last name?"
            },
            {
                name: "role",
                type: "input",
                message: "what is the role id? (numbers)"
            },
            // {
            //     name: "manager",
            //     type: "input",
            //     message: "What is their manager id? (numbers)?"
            // },
        ]).then(function (answer) {
            console.log(answer.firstName)
            connection.query("INSERT INTO employee SET ?, ?, ?, ?",
                [
                    { first_name: answer.firstName },
                    { last_name: answer.lastName },
                    { role_id: answer.role },
                    { manager_id: null }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(answer.firstName + ' ' + answer.lastName + " has been added!")
                    start();
                });
        })
}

function updateEmployRole() {
    connection.query(`SELECT * FROM (employee INNER JOIN role ON employee.role_id = role.id)`, function (err, results) {
        inquirer
            .prompt([

                {
                    name: "updateEmployee",
                    type: "rawlist",
                    message: "Which employee would you like to update?",
                    choices: function () {
                        var choiceEmploy = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceEmploy.push(results[i].first_name + " " + results[i].last_name);
                        }
                        return choiceEmploy;
                    }
                },
                {
                    name: "updateRole",
                    type: "rawlist",
                    message: "What is there role?",
                    choices: function () {
                        var choiceRole = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceRole.push(results[i].title);
                        }
                        return choiceRole;
                    }
                }

            ])
            .then(function (answer) {

                var chosenEmploy;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].id === answer.choice) {
                        chosenEmploy = results[i];
                    }
                }

                var chosenRole;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].title === answer.choice) {
                        chosenRole = results[i];
                    }
                }
                  connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    [{title : chosenRole}, {id : chosenEmploy}],
                    function (error) {
                      if (error) throw err;
                      console.log("Role successfully changed!");
                      start();
                    }
                  );

            });
    })
};


// view
// =====================================================
function exit() {
    connection.end()
}
