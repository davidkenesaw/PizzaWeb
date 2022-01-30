const { testUsername } = require("./Verification");

var dbConn = require(__dirname + '/db.config');
var verify = require(__dirname + '/Verification');


function LogUserIn(req,res){//not done
    var user = req.body.Username;
    var Password = req.body.Password;//add use of password
    
    dbConn.query("SELECT * FROM Users WHERE UserName = '"+dbConn.escape(user)+"' AND Password = '"+Password+"'",function(err,rows){
        
        if(err){
            const error = "there was an issue with your username or password";
            res.render('Login2',{error});//this is wrong
        }
        else{
            if(rows.length == 1){
                res.cookie('UserName',rows[0].UserName);
                res.redirect('/Homepage');
            }else{
                const error = "there was an issue with your username or password";
                res.render('Login2',{error});//this is wrong
            }
        }

    });
}

function insertUser(req,res){//not done

    var UserName = req.body.Username;
    var Password = req.body.Password;

    if(verify.testUsername(UserName)!= true){
        const error = "User bad";
        res.render('Register',{error});//this is wrong
    }else if(verify.testUsername(Password)!= true){
        const error = "pass bad";
        res.render('Register',{error});//this is wrong
    }else{

        console.log(UserName);

        dbConn.query("INSERT INTO Users (UserName,Password) VALUES ('"+UserName+"','"+Password+"')",function(err,result){
            const error = "User Registered";
            if(err){
                const error = "there was an issue with your username or password";
                res.render('Register',{error});//this is wrong
            }else{
                console.log("Data inserted");
                res.render("Register",{error});//this is wrong
            }
        });
    }
}

module.exports = { LogUserIn, insertUser };