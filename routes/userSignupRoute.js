// Requiring The Signup Page Controller --------------------------------->
const usersignupController=require("../controller/userSignupController");





// Routes For The Signup Page           ---------------------------------->
module.exports=(app)=>{

    // Signup Page Post Request Route For Creating new Data
    app.post("/usermanagementsystem/api/v1/users/signupusers",usersignupController.userSignupController);
}