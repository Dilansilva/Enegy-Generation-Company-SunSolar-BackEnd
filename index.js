const express = require('express');//import some express apps

const app = express();

app.post('/login', (req, res) => {
    console.log('Login!');
    res.send({
        name : 'Dilan'
    });
});

app.listen(4000, () => {
    console.log('App listening on port 4000!');
});