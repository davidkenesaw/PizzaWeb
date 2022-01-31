function verifyUser(req,res,next){
    
    if(!req.cookies.UserName){
        return res.redirect('/LoginPage')
    }
    next();
}

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?~]/;
    return specialChars.test(str);
}
function hasNumber(myString) {
    return /\d/.test(myString);
}

function testUsername(User){
    if(containsSpecialChars(User)&&hasNumber(User)&&User.length>7){
        return true;
    }
    return false;
}
//console.log(testUsername("Hello@12"));


function verifyForgotPass(req,res,next){
    
    if(req.cookies.ForgotPasswordsecrete){
        return res.redirect('/ForgotPasswordCodePage')
    }
    next();
}
function verifyForgotPassFalse(req,res,next){
    
    if(!req.cookies.ForgotPasswordsecrete){
        return res.redirect('/LoginPage')
    }
    next();
}
function verifyForgotPassCodeTrue(req,res,next){

    if(req.cookies.CodeEntered){
        return res.redirect('/ForgotPasswordPage')
    }
    next();
}
function verifyForgotPassCodeFalse(req,res,next){

    if(!req.cookies.CodeEntered){
        return res.redirect('/LoginPage')
    }
    next();
}
module.exports = { verifyUser , testUsername , verifyForgotPass , verifyForgotPassCodeTrue, verifyForgotPassCodeFalse , verifyForgotPassFalse };