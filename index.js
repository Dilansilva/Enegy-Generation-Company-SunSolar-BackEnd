const express = require('express');//import some express apps

const app = express();

app.post('/login', (req, res) => {
    console.log('Login!');
    res.send({
        name : 'Dilan'
    });
});

app.post('/customer', (req,res) => {
    console.log('Customer Details');
})

app.post('/projects', (req, res) => {
    console.log('Project Details');
});

app.listen(4000, () => {
    console.log('App listening on port 4000!');
});