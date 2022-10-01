const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const questions = [
    {
        type: 'input',
        message:'What is the id of the employee you wish to delete?',
        name:'emp_id'
    }]

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'',
        database:'employee_db'
    })

function deleteEmp(callback){
    inquirer
    .prompt(questions)
    .then(response=>{
        db.query(`DELETE FROM employee_table WHERE id = ${response.emp_id}`, (err, result)=>{
            if (err) {
                console.log(err);
            }
            else{
                db.query('SELECT * FROM employee_table', (err, result)=>{
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                    callback();
                })
            }
        })
    })
}

module.exports = deleteEmp