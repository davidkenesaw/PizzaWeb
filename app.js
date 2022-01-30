//merp
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
var dbConn = require(__dirname + '/config/db.config');
const lib = require("./config/db.functions");
const verify = require("./config/Verification");
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser('thisismysecrete'));//change this and make it secrete

app.get("/",function(req,res){
    res.render("HomePageBeforeLog");
});
app.get("/LoginPage",function(req,res){
    const error = "";
    res.render("Login2",{error});
});
app.get("/RegisterPage",function(req,res){
    const error = "";
    res.render("Register",{error});
});

app.post("/Register",lib.insertUser);//config---->db.functions.js
app.post("/Login",lib.LogUserIn);//config---->db.functions.js

app.get("/Homepage", verify.verifyUser, function(req,res){
    const user = req.cookies.UserName;
    res.render("homepage2",{user});
});


app.listen(3456,function(){
    console.log("Port: 3456");
});

//things to add:
//.env
//hashing and salting