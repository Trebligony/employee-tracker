const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const questions = [
    {
        type: 'input',
        message:'What is the id of the role you wish to delete?',
        name:'role_id'
    }]

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'',
        database:'employee_db'
    })

function deleteRole(callback){
    inquirer
    .prompt(questions)
    .then(response=>{
        db.query(`DELETE FROM roles WHERE id = ${response.role_id}`, (err, result)=>{
            if (err) {
                console.log(err);
            }
            else{
                db.query('SELECT * FROM roles', (err, result)=>{
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

module.exports = deleteRole