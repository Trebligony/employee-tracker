const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'',
        database:'employee_db'
    })

function addDept(callback){
    inquirer.prompt({
        type: 'input',
        message:'Enter name of new department',
        name:'deptQ'
    })
    .then(response=>{
        db.query(`INSERT INTO department (name) VALUES ('${response.deptQ}')`, (err, result)=>{
            if (err) {
                console.log(err);
            }

            else{
                db.query('SELECT * FROM department;', (err, result)=> {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result)
                    callback()
                });
            }
        })

    })}

    


module.exports = addDept;