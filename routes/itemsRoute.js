/// Requiring The Curd Controller From The Curd Page ----------------------------------------------->
const itemsController=require("../controller/itemsController");
/// Requiring The Authentication Middleware -------------------------------------------------------->
const authCheck=require("../middleware/authCheck");



// Routes For The User Curd Operations          ---------------------------------->
module.exports=(app)=>{

    // Signup Page Post Request Route For Creating new Data
    app.post("/usermanagementsystem/api/v1/users/items",authCheck.tokenCheck,authCheck.roleCheck, itemsController.userAddItem);

    
    // Signup Page Post Request Route For Deleting New Item
    app.delete("/usermanagementsystem/api/v1/users/items",authCheck.tokenCheck,authCheck.roleCheck, itemsController.userDeleteItem);

    
    
    // Signup Page Post Request Route For Updating The Item
    app.put("/usermanagementsystem/api/v1/users/items",authCheck.tokenCheck,authCheck.roleCheck, itemsController.userEditItem);

    
    
    // Signup Page Post Request Route For User To Search an Item
    app.get("/usermanagementsystem/api/v1/users/items",authCheck.tokenCheck,authCheck.roleCheck, itemsController.getItems);

    
    // Signup Page Post Request Route For User To Search an Item
    app.get("/usermanagementsystem/api/v1/users/allitems",authCheck.tokenCheck,authCheck.roleCheck, itemsController.getAllItems);

}