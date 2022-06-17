const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cbo353'
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('DB connection successful');
    else
        console.log('DB connection failed \n Error: '+ JSON.stringify(err,undefined,2));

});

app.post('/register',(req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password,saltRounds, (err, hash) => {

        if(err){
            console.log(err);
        }

        mysqlConnection.query("INSERT INTO users (username, password) VALUES (?,?)",[username, hash],(err, result) => {
            console.log(result);
        });
    })
});

app.post('/login',(req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    mysqlConnection.query("SELECT * FROM users WHERE username = ?",username,(err, result) => {
        if(err){
            res.send({err: err});
        }

        if (result.length > 0){
            bcrypt.compare(password, result[0].password, (error , response) => {
                if (response){
                    res.send(result)
                } else {
                    res.send({ message: "Wrong username/Password combination! Try again!"});
                }
            })
        } else {
            res.send({message: "User not found!"});
        }
        
    });
});


app.post('/registerCustomer',function(req,res) {
    var id = req.body.id;
    var name = req.body.name;
    var report = req.body.report;
    var post = {customerID: id, customerName: name, report: report};
    console.log(post);

    
    mysqlConnection.query('INSERT INTO customers (customerID,customerName,report) VALUES (?,?,?)',[id,name,report], (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log('added');
    });
    res.send("all done");
});


app.post('/updateCustomer',function(req,res){
    var id = req.body.id;
    var report = req.body.report;
    var data = [report, id];
    console.log(id,report);

    mysqlConnection.query('UPDATE customers SET report = ? WHERE customerID = ?', data, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log('updated');
    });

    res.send('updated');
})

app.post('/deleteCustomer', function(req,res){
    var id = req.body.id;

    mysqlConnection.query('DELETE FROM customers WHERE customerId=?',[id], (err, result) => {
        if(err) throw err;
        console.log(result);

    });

    res.send("all done");
})

app.post('/editStaff',function(req,res){
    
    var name = req.body.name;
    var newName = req.body.newName;
    var data = [newName, name];

    
    mysqlConnection.query('UPDATE users SET username = ? WHERE username = ?', data, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log('updated');
    });

    res.send('updated');
})

app.post('/deleteStaff', function(req,res){
    var id = req.body.name;
    const password = req.body.password;

    mysqlConnection.query("SELECT * FROM users WHERE username = ?",id,(err, result) => {
        if(err){
            res.send({err: err});
        }

        if (result.length > 0){
            bcrypt.compare(password, result[0].password, (error , response) => {
                if (response){
                    mysqlConnection.query('DELETE FROM users WHERE username=?',[id], (err, result) => {
                        if(err) throw err;
                        console.log(result);
                
                    });
                } else {
                    res.send({ message: "Wrong username/Password combination! Try again!"});
                }
            })
        } else {
            res.send({message: "User not found!"});
        }
        
    });

    

    res.send("all done");
})


app.get('/getCustomers', (req, res) => {
    mysqlConnection.query("SELECT * FROM customers", (err,result) =>{
        if (err){
            console.log(err)
        }else{
            console.log(result);
            res.send(result);
        }
    });
});



app.get('/getStaff', (req, res) => {
    mysqlConnection.query("SELECT * FROM users", (err,result) =>{
        if (err){
            console.log(err)
        }else{
            res.send(result);
        }
    });
});

app.listen(3001,()=>console.log('Express backend running at port 3001'));