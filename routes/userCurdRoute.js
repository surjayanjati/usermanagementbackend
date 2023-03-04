/// Requiring The Curd Controller From The Curd Page ----------------------------------------------->
const userCurdController=require("../controller/userCurdController");
/// Requiring The Authentication Middleware -------------------------------------------------------->
const authCheck=require("../middleware/authCheck");



// Routes For The User Curd Operations          ---------------------------------->
module.exports=(app)=>{

    // Signup Page Post Request Route For Creating new Data
    app.post("/usermanagementsystem/api/v1/users/additems",authCheck.tokenCheck,authCheck.roleCheck, userCurdController.userAddItem);

    
    // Signup Page Post Request Route For Deleting New Item
    app.delete("/usermanagementsystem/api/v1/users/deleteitems",authCheck.tokenCheck,authCheck.roleCheck, userCurdController.userDeleteItem);

    
    
    // Signup Page Post Request Route For Updating The Item
    app.put("/usermanagementsystem/api/v1/users/edititems",authCheck.tokenCheck,authCheck.roleCheck, userCurdController.userEditItem);

    
    
    // Signup Page Post Request Route For User To Search an Item
    app.get("/usermanagementsystem/api/v1/users/searchitems",authCheck.tokenCheck,authCheck.roleCheck, userCurdController.userSearchItem);

    
    // Signup Page Post Request Route For User To Search an Item
    app.get("/usermanagementsystem/api/v1/users/searchallitems",authCheck.tokenCheck,authCheck.roleCheck, userCurdController.userSearchAllItem);
}