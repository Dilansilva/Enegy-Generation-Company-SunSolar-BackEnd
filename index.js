const express = require('express');//import some express apps
const mongodb = require('mongodb');//mongodb package

const app = express();
app.use(express.json());

const MongoClient = mongodb.MongoClient;//initialize the connection
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'Projects';//database name


app.post('/login', (req, res) => {//route for login
    console.log(req.body);

    MongoClient.connect(connectionURL, {useNewUrlParser : true,useUnifiedTopology: true}, (error, client) => {//connect to database
        if(error){//if the connection error occure
            return res.send('Unable to connect to database');//error message for connection
        }else{//if the connection is succec
            const db = client.db(databaseName);
            db.collection('user').findOne({//find the user email
                user_mail : req.body.user_mail
            },(error,result) => {
                if(error){//if the connection error
                    return res.send('Unable to connect to database');//error message
                }
                if(result != null){//if the email is matched
                    db.collection('user').findOne({//matching the password
                        user_password : req.body.user_password   
                    },(error,result) => {
                        if(error){
                            return res.send('Unable to connect to database');
                        }if(result != null){//if the email and password are correct
                            res.send('Logging');
                        }else{//if the password is wrong
                            return res.send('Wrong password!');
                        }
                    })
                }else{//if the email is unmatched
                    return res.send('Unmatched email!');
                }
            })
        }
    });
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