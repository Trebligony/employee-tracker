const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const questions = [
    {
        type: 'input',
        message:'Enter  first name of new employee',
        name:'first_name'
    },
    {
        type: 'input',
        message:'Enter last name of new employee',
        name:'last_name'
    },
    {
        type: 'input',
        message:'Enter role id number of new employee',
        name:'role_id'
    },
    {
        type: 'input',
        message:"Enter id number of new employee's manager",
        name:'manager_id'
    }
];
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'',
        database:'employee_db'
    })

function addEmp(callback){
    inquirer.prompt(questions)
    .then(response=>{
        db.query(`INSERT INTO employee_table (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}','${response.last_name}','${response.role_id}','${response.manager_id}')`, (err, result)=>{
            if (err) {
                console.log(err);
            }

            else{
                db.query('SELECT * FROM employee_table;', (err, result)=> {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result)
                    callback()
                });
            }
        })

    })}

    


module.exports = addEmp;