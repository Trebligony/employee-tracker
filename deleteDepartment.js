const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const questions = [
    {
        type: 'input',
        message:'What is the id of the department you wish to delete?',
        name:'dept_id'
    }]

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'',
        database:'employee_db'
    })

function deleteDept(callback){
    inquirer
    .prompt(questions)
    .then(response=>{
        db.query(`DELETE FROM department WHERE id = ${response.dept_id}`, (err, result)=>{
            if (err) {
                console.log(err);
            }
            else{
                db.query('SELECT * FROM department', (err, result)=>{
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

module.exports = deleteDept