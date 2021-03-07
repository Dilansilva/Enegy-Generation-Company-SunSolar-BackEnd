const express = require('express');//import some express apps
const mongodb = require('mongodb');//mongodb package

const app = express();
app.use(express.json());

const MongoClient = mongodb.MongoClient;//initialize the connection
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'Projects';//database name


app.post('/login', (req, res) => {//route for login
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
    
    MongoClient.connect(connectionURL, {useNewUrlParser : true,useUnifiedTopology: true},(error,client) => {
        if(error){//if error occure
            return res.send('Unable to add Cutomer detais');
        } else{//if the connection is success
            const db = client.db(databaseName);
            db.collection('Customer').insertOne({
                customer_code : req.body.code,
                customer_name : req.body.name,
                customer_address : req.body.address,
                customer_profession : req.body.profession,
                customer_referred : req.body.referred,
                customer_TP : req.body.TP,
                customer_email : req.body.email
             }, (error,result) => {
                 if(error){//if the error occur
                     return res.send('Unable to add data');
                 }if(result){//success
                     return res.send('Added Successfully');
                 }
             })
        }
    })
})

app.post('/projects', (req, res) => {//route for enter project deatails
  
    MongoClient.connect(connectionURL, {useNewUrlParser : true,useUnifiedTopology: true},(error,client) => {
        if(error){//When error ocuur
            return res.status(500).send();
        }else{
            const db = client.db(databaseName);
            db.collection('Projects').insertOne({
                project_code : req.body.code,
                customer_code : req.body.cus_code,
                capacity : req.body.capacity,
                geo_location : req.body.geo_location,
                site_visit : req.body.site_visit,
                visited_date : req.body.visited_date,
                connection_type : req.body.connection_type,
                grid_type : req.body.grid_type,
                paymentbase : req.body.paymentbase
            },(error,result) => {
                if(error){
                    return res.status(500).send('Error occured');
                }if(result){
                    return res.status(200).send('Added Successfully');
                }
            })
        }
    })
});

app.listen(4000, () => {
    console.log('App listening on port 4000!');
});