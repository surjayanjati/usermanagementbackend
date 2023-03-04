/// Importing The jsonwebtoken---------------------------------------------------------------------------->
const jwt=require("jsonwebtoken");
const secretKey=require("../config/secretKey");


/// Function For The Token Generation
async function tokenGenerate(obj){
    const token= jwt.sign({id:obj._id},secretKey,{expiresIn:"2h"});
    return token;
};


module.exports={
    tokenGenerate:tokenGenerate,
}