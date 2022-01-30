function verifyUser(req,res,next){//put this method somewhere else
    
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
    else return false;
}
//console.log(testUsername("Hello@12"));

module.exports = { verifyUser , testUsername };