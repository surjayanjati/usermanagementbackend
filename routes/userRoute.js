// Requiring The Signup Page Controller --------------------------------->
const userController=require("../controller/userController");





// Routes For The Signup Page           ---------------------------------->
module.exports=(app)=>{

    // Signup Page Post Request Route For Creating new Data
    app.post("/usermanagementsystem/api/v1/users/loginusers",userController.userLoginController);
    

    // Signup Page Post Request Route For Creating new Data
    app.post("/usermanagementsystem/api/v1/users/signupusers",userController.userSignupController);
}