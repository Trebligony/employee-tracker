const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const addDept = require('./addDepartment')
const addRole = require('./addRole')
const addEmp = require('./addEmployee')
const updateEmp = require('./updateEmployee')
const viewTotalBudget = require('./viewTotalBudget')
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'',
        database:'employee_db'
    },
    console.log('Connected to the employee_db databse')
);
// db.query('USE employee.db;');
const question = [
    {
        type: 'list',
        message:'What would you like to do?',
        choices:['View all departments','View all roles','View all employees','View Total Budget of a Department','Add a department','Add a role','Add an employee','Update an employee role'],
        name:'choice'
    }
]
function init() {
    inquirer
    .prompt(question)
    .then(response => {
        switch (response.choice) {
            case 'View all departments':
                db.query('SELECT * FROM department;', (err, result)=> {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result)
                    init();
                });
                break;
            case 'View all roles':
                db.query('SELECT * FROM roles;', (err, result)=> {
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
                ORDER BY employee_table.id;`, (err, result)=> {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result)
                    init();
                });
                break;

            case 'View Total Budget of a Department':
                viewTotalBudget(init)
                    
                    
                    break;
            
            case 'Add a department':
                addDept(init)
                
                
                break;
            case 'Add an employee':
                addEmp(init);
                
                break;
            case 'Update an employee role':
                updateEmp(init);
                break;
            case 'Add a role':
                addRole(init)
              
                break;
        }
    })
}

module.exports = init