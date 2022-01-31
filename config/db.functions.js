

var dbConn = require(__dirname + '/db.config');
var verify = require(__dirname + '/Verification');


function LogUserIn(req,res){//not done
    var user = req.body.Username;
    var Password = req.body.Password;//add use of password
    
    dbConn.query("SELECT * FROM Users WHERE UserName = '"+user+"' AND Password = '"+Password+"'",function(err,rows){
        
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

function CheckUser(req,res){
    var UserName = req.body.Username;
    var Password = req.body.Password;

    dbConn.query("SELECT * FROM Users WHERE UserName = '"+UserName+"'",function(err,rows){
        
        if(err){
            const error = "there was an issue with your username or password";
            res.render('Register',{error});//this is wrong
        }
        else{
            if(rows.length == 1){
                var error = "that user already exists";
                res.render('Register',{ error });
            }else{
                res.cookie('Email', UserName);
                res.cookie('Pass', Password);
                res.cookie('RegisterSecrete',Math.floor(Math.random() * 9999) + 1000);

                res.redirect("/registerCodePageRout");
            }
        }

    });


    
}

/*
function insertUser(req,res){//not done

    var UserName = req.body.Username;
    var Password = req.body.Password;

    

    console.log(UserName);

    dbConn.query("INSERT INTO Users (UserName,Password) VALUES ('"+UserName+"','"+Password+"')",function(err,result){
        const error = "User Registered";
        if(err){
            const error = "there was an issue with your username or password";
            res.render('Register',{error});//this is wrong
        }else{
            res.cookie('RegisterSecrete',Math.floor(Math.random() * 9999) + 1000);
            console.log("Data inserted");
            res.redirect("/registerCodePageRout");//this is wrong
        }
    });

}
*/

function insertUser(UserName,Password,req,res){//not done

    console.log(UserName);

    dbConn.query("INSERT INTO Users (UserName,Password) VALUES ('"+UserName+"','"+Password+"')",function(err,result){
        const error = "User Registered";
        if(err){
            const error = "there was an issue with your username or password";
            res.render('Register',{error});//this is wrong
        }else{
            console.log("Data inserted");
        }
    });


}

module.exports = { LogUserIn, insertUser , CheckUser};