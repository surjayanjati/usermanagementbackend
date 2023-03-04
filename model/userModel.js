/// Requiring The Pakages/ Modules--------------------------------------------------------------------->
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const secretKey=require("../config/secretKey");

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
        validate:(value)=>{
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    userPassword:{
        type:String,
        required:true,
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

/// Hasing The Password Before Storing In The Database ------------------------------------------------->
userSchema.pre("save",async function(next){
    if(this.isModified("userPassword")){
        this.userPassword=await bcrypt.hash(this.userPassword,8);
    };
    next();
})

/// Exporting The Mongoose Model ----------------------------------------------------------------------->
module.exports=mongoose.model("usercollections",userSchema);