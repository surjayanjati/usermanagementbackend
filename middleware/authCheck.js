/// Requiring The Pakages and Modules ------------------------------------------------------------------------------->
const jwt=require("jsonwebtoken");
/// Requiring The Secret Key From The Config Folder ----------------------------------------------------------------->
const secretKey=require("../config/secretKey");
/// Requiring The Company Collection From The Model ----------------------------------------------------------------->
const userCollection=require("../model/userModel");


/// Function For Checking Whether The Token is exists and it has Some id in it or not--------------------------------->
function tokenCheck(req,res,next){
  try {
   
    const token=req.headers["access-token"];
    if(token!=="" && token!==undefined){
    jwt.verify(token,secretKey,(err,decode)=>{
     if(err){
        res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
     }else {
         req.userId=decode.id;
        
        next();
     }
    })
    }else res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
    
  } catch (error) {
    res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
  }
};

/// Middleware Function For Checking Whether The User is Super - Admin or Admin -------------------------------------->
async function roleCheck(req,res,next){
 try {
    
    // Getting The UserId From The Past Middleware________________________/
    const userId=req.userId;
    
    // Finding The Details of The User with userId________________________/
    const userDetailsObj=await userCollection.findOne({_id:userId});
    
    if(userDetailsObj!==null){
     
     req.details=userDetailsObj;
     next();
    }else res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
 } catch (error) {
    res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
 }
}



module.exports={
    tokenCheck:tokenCheck,
    roleCheck:roleCheck
};