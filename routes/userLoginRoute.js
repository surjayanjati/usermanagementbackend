// Requiring The Signup Page Controller --------------------------------->
const userLoginController=require("../controller/userLoginController");





// Routes For The Signup Page           ---------------------------------->
module.exports=(app)=>{

    // Signup Page Post Request Route For Creating new Data
    app.post("/usermanagementsystem/api/v1/users/loginusers",userLoginController.userLoginController);
}