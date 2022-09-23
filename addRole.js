const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const init = require('./initPrompt');
const questions = [
    {
        type: 'input',
        message:'Enter name of new role',
        name:'name'
    },
    {
        type: 'input',
        message:'Enter salary of new role',
        name:'salary'
    },
    {
        type: 'input',
        message:'Enter department id number of new role',
        name:'dept_id'
    }
];
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'',
        database:'employee_db'
    })

function addRole(callback){
    inquirer.prompt(questions)
    .then(response=>{
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${response.name}','${response.salary}','${response.dept_id}')`, (err, result)=>{
            if (err) {
                console.log(err);
            }

            else{
                db.query('SELECT * FROM roles;', (err, result)=> {
                    if (err) {
                        console.log(err);
                    }
                 
                    console.table(result)
                    callback();
                  
                    
                  
                });
             
            }
        })

    })}

    


module.exports = addRole;