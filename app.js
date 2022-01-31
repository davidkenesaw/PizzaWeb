
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
app.get("/LoginPage", verify.verifyForgotPassCodeTrue, verify.verifyForgotPass, function(req,res){
    const error = "";
    res.render("Login2",{error});
});
app.get("/RegisterPage",function(req,res){
    const error = "";
    res.render("Register",{error});
});

app.post("/Register",lib.CheckUser);//config---->db.functions.js
app.post("/Login",lib.LogUserIn);//config---->db.functions.js

app.get('/registerCodePageRout',function(req,res){
    var error = "";
    res.render('registerCodePage', { error });
    
});
app.post('/CompleteRegister',function(req,res){
    const crackedCode = req.cookies.RegisterSecrete;
    const user = req.body.code;

    if(user == crackedCode){
        res.clearCookie("RegisterSecrete");
        lib.insertUser(req.cookies.Email,req.cookies.Pass,req,res);
        res.redirect("/UserRegistered");
    }else{
        var error = "code incorrect"; 
        res.render("CompleteRegister",{error})
    }
});
app.get('/UserRegistered',function(req,res){
    res.render('Registered');
});

app.post("/ForgetPasswordCodegenerate",function(req,res){
    
    var randomCode = Math.floor(Math.random() * 9999) + 1000

    res.cookie('ForgotPasswordsecrete',randomCode);
    
    res.redirect("/ForgotPasswordCodePage");
    
});
app.get('/ForgotPasswordCodePage', verify.verifyForgotPassFalse, function(req,res){
    var error = ""; 
    res.render("ForgotPasswordCode",{ error });
    
});
app.post("/EnterPassCode", function(req,res){
    const crackedCode = req.cookies.ForgotPasswordsecrete;
    const user = req.body.code;
    console.log(typeof crackedCode+typeof user);

    if(user == crackedCode){
        res.clearCookie("ForgotPasswordsecrete");
        res.cookie('CodeEntered',true);
        res.redirect("/ForgotPasswordPage");
    }else{
        var error = "code incorrect"; 
        res.render("ForgotPasswordCode",{error})
    }
});
app.get('/ForgotPasswordPage', verify.verifyForgotPassCodeFalse, function(req,res){
    res.render('ChangePass');
});
app.post('/ChangePassword',function(req,res){
    res.clearCookie("CodeEntered");
    res.send("Not done");
});


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