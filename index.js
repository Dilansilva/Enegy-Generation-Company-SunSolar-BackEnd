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
        if(error){
            return console.error('error');
        }else{
            const db = client.db(databaseName);
            db.collection('user').findOne({
                user_mail : req.body.user_mail
            },(error,result) => {
                if(error){
                    console.log(error);
                }
                if(result != null){
                    db.collection('user').findOne({
                        user_password : req.body.user_password   
                    },(error,result) => {
                        if(error){
                            console.log(error);
                        }if(result != null){
                            res.send('Logging');
                        }else{
                            res.send('Wrong password!');
                        }
                    })
                }else{
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