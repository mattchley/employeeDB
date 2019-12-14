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
  var query = "SELECT * FROM  WHERE ?";
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
      // /Users/matthewatchley/Desktop/UCSD-SD-FSF-PT-09-2019-U-C/12-MySQL/01-Activities/10-GreatBay/Solved/greatBayBasic.js activity has a way to return functions as answers
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

  // function to handle posting new items up for auction
  function postAuction() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the item you would like to submit?"
        },
        {
          name: "category",
          type: "input",
          message: "What category would you like to place your auction in?"
        },
        {
          name: "startingBid",
          type: "input",
          message: "What would you like your starting bid to be?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO auctions SET ?",
          {
            item_name: answer.item,
            category: answer.category,
            starting_bid: answer.startingBid || 0,
            highest_bid: answer.startingBid || 0
          },
          function(err) {
            if (err) throw err;
            console.log("Your auction was created successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }
  
  function bidAuction() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM auctions", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].item_name);
              }
              return choiceArray;
            },
            message: "What auction would you like to place a bid in?"
          },
          {
            name: "bid",
            type: "input",
            message: "How much would you like to bid?"
          }
        ])
        .then(function(answer) {
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
              function(error) {
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