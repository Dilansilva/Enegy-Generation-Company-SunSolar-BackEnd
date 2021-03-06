const express = require('express');//import some express apps
const mysql = require('mysql');//import some mysql apps

const app = express();
app.use(express.json());

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "yourusername",
    password : "password",
    database : "EmployeeDB"
});

mysqlConnection.connect((err) => {
    if(!err) 
        console.log('Connected Successful!');
    else 
        console.log('Connection failed!');
});

app.post('/login', (req, res) => {//route for login
    console.log('Login!');
});

app.post('/customer', (req,res) => {//route for enter customer details
    console.log('Customer!');
})

app.post('/projects', (req, res) => {//route for enter project deatails
    console.log('Project Details');
});

app.listen(4000, () => {
    console.log('App listening on port 4000!');
});