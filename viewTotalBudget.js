const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const questions = [
    {
        type: 'input',
        message:'What is the id of the department you wish to find total utilized budget?',
        name:'dept_id'
    }]

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'',
        database:'employee_db'
    })

function viewTotalBudget(callback){
    inquirer
    .prompt(questions)
    .then(response=>{
        db.query(`SELECT department.name as 'Department Name', COUNT(employee_table.id) AS 'Total No of Employees', SUM(roles.salary) as 'Total Utilized Budget' from ((employee_table INNER JOIN roles ON employee_table.role_id = roles.id) INNER JOIN department ON employee_table.role_id = department.id) WHERE roles.department_id =${response.dept_id}`, (err, result)=>{
            if (err) {
                console.log(err);
            }
            console.table(result);
            callback();
        })
    })
}

module.exports = viewTotalBudget