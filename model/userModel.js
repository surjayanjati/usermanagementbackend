/// Requiring The Pakages/ Modules--------------------------------------------------------------------->
const mongoose=require("mongoose");


/// Connecting To The Mongodb Server ------------------------------------------------------------------>
mongoose.connect("mongodb://localhost/usermanagementsystem");


/// Creating The Schema ------------------------------------------------------------------------------->
const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
        index:true,
        unique:true,
    },
    userEmail:{
        type:String,
        required:true,
        index:true,
        unique:true,
    },
    userId:{
        type:Number,
        required:true,
        index:true,
        unique:true,
    },
    itemsArray:[{
      id:{
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
    }]
});

/// Exporting The Mongoose Model ----------------------------------------------------------------------->
module.exports=mongoose.model("usercollections",userSchema);