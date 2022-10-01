const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const addDept = require('./addDepartment')
const addRole = require('./addRole')
const addEmp = require('./addEmployee')
const updateEmp = require('./updateEmployee')
const viewTotalBudget = require('./viewTotalBudget')
const deleteEmp = require('./deleteEmployee')
const deleteDept = require('./deleteDepartment')
const deleteRole = require('./deleteRole')
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db databse')
);
// db.query('USE employee.db;');
const mainQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['1: View all Departments, Roles, and Employees', '2: Add a Department, Role, or an Employee', '3: Delete Department, Role, or an Employee',  '4: View Total Budget of a Department', '5: Update an employee role'],
        name: 'choice'
    }
]

const deleteQuestion = [
    {
        type: 'list',
        message: 'What would you like to delete?',
        choices: ['Delete a department', 'Delete a role', 'Delete an employee'],
        name: 'deleteChoice'
    }
]

const addQuestion = [
    {
        type: 'list',
        message: 'What would you like to add?',
        choices: ['Add a department', 'Add a role', 'Add an employee'],
        name: 'addChoice'
    }
]

const viewQuestion = [
    {
        type: 'list',
        message: 'What would you like to view?',
        choices: ['View all departments', 'View all roles', 'View all employees'],
        name: 'viewChoice'
    }
]



function init() {
    inquirer
        .prompt(mainQuestion)
        .then(response => {
            switch (response.choice) {
                case '1: View all Departments, Roles, and Employees':
                    viewData();
                    break;

                case '3: Delete Department, Role, or an Employee': 
                    deleteData();
                    break;

                case '2: Add a Department, Role, or an Employee':
                    addData();
                    break;
                
                case '4: View Total Budget of a Department':
                    viewTotalBudget(init);
                    break;

                case '5: Update an employee role':
                    updateEmp(init);
                    break;
            }
        })
}


function viewData() {
    inquirer
        .prompt(viewQuestion)
        .then(response => {
            switch (response.viewChoice) {
                case 'View all departments':
                    db.query('SELECT * FROM department;', (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result)
                        init();
                    });
                    break;
                case 'View all roles':
                    db.query('SELECT * FROM roles;', (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result)
                        init();
                    });
                    break;
                case 'View all employees':
                    db.query(`
                SELECT * FROM roles
                JOIN employee_table ON employee_table.role_id=roles.id
                JOIN department ON roles.department_id=department.id
                ORDER BY employee_table.id;`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result)
                        init();
                    });
                    break;
            }
        })
}


function addData() {
    inquirer
        .prompt(addQuestion)
        .then(response => {
            switch (response.addChoice) {
                case 'Add a department':
                    addDept(init);
                    break;

                case 'Add a role':
                    addRole(init);
                    break;

                case 'Add an employee':
                    addEmp(init);
                    break;
            }
        })
}

function deleteData() {
    inquirer
        .prompt(deleteQuestion)
        .then(response => {
            switch (response.deleteChoice) {
                case 'Delete a department':
                    deleteDept(init);
                    break;

                case 'Delete a role':
                    deleteRole(init);
                    break;

                case 'Delete an employee':
                    deleteEmp(init);
                    break;
            }
        })
}

module.exports = init