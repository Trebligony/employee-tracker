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
        db.query(`SELECT department.name as \'Department Name\', SUM(roles.salary) as \'Total Utilized Budget\' from roles 
        INNER JOIN department ON roles.department_id = department.id
        where department.id = ${response.dept_id}`, (err, result)=>{
            if (err) {
                console.log(err);
            }
            console.table(result);
            callback();
        })
    })
}

module.exports = viewTotalBudget