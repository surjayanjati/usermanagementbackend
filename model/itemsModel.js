/// Requiring The Pakages/ Modules--------------------------------------------------------------------->
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const secretKey=require("../config/secretKey");

/// Connecting To The Mongodb Server ------------------------------------------------------------------>
mongoose.connect("mongodb://localhost/usermanagementsystem");


/// Creating The Schema ------------------------------------------------------------------------------->
const itemSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
        
    },
   
   userId:{
    type:String
   },
 
    
      itemId:{
        type:Number
      },
      name:{
        type:String
      },
      price:{
        type:Number
      },
      description:{
        type:String,
      }
    
});

/// Exporting The Mongoose Model ----------------------------------------------------------------------->
module.exports=mongoose.model("itemcollections",itemSchema);