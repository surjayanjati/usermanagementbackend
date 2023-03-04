// Requiring The Collection From The Model --------------------------------->
const userCollection=require("../model/userModel");
const bcrypt=require("bcrypt");
/// Token Function Requiring ----------------------------------------------->
const tokenGenerate=require("../utils/tokenGenerate");




// Post Request Controller For Login   --------------------------------->
exports.userLoginController=async (req,res)=>{
    try {
        // Object Destructuring For Collecting The Data From req body __________________/
        const {email,password}=req.body;
        if(email!=="" && password!==""){
        // In The Case When email and password has given by user________________________/
        const searchResultObject=await userCollection.findOne({userEmail:email});
        if(searchResultObject!==null){
        // Matching The Password by using Bcrypt _______________________________________/
        const passwordMatchCheck=await bcrypt.compare(password,searchResultObject.userPassword);
        if(passwordMatchCheck===true){
        const token=await tokenGenerate.tokenGenerate(searchResultObject)
        if(token){
            res.cookie("loginCookie",token,{expires:new Date(Date.now()+3000000)});
            res.send({msg:"Login Successfull",success:true,status:200,token:token});
        }else res.send({msg:"Unable To Login",success:false,status:500});
        }else res.send({msg:"Kindly Check Your Password",success:false,status:403});
        }else res.send({msg:"Kindly Signup Before Login",success:false,status:204});
        }else res.send({msg:"Kindly Fill All The Details",success:false,status:400})
    } catch (error) {
        console.log(error);
res.send({msg:"Unable To Login",success:false,status:500});
    }
}




// Post Request Controller For signupPage  --------------------------------->
exports.userSignupController=async (req,res)=>{
    try {
        
        // object destructuring For Getting The Values from Request Body-/
        const {userName,userEmail,userPassword}=req.body;
        
        if(userName!=="" && userEmail!=="" && userPassword!=="" ){
         const insertData=new userCollection({
            userName:userName,
            userEmail:userEmail,
            userPassword:userPassword,
            
         });
         
         // Saving The Document Inside The Collection-------------------/
         const saveDataResult=await insertData.save();
         
         if(saveDataResult!==null){
            res.send({msg:"Signup Successfull",success:true,status:200});
         }else{
            res.send({msg:"Unable To Signup",success:true,status:500});
         }
        }else{
            // In The Case The user have left some input fld to fill-----/
            res.send({msg:"Kindly Fill All The Details",success:false,status:204})
        }
    } catch (err) {
        
      // In The Case When any Value is already there in The Database________________________________/
      if (err.code === 11000) {
        let valueArray = [
          "userName",
          "userEmail",
         
        ];
        valueArray.filter((elem) => {
          if (err.message.search(elem) !== -1) {
            res.send({
              msg: `${elem} Already Exists`,
              success: false,
              status: 400,
            });
          }
        });
        // In The Case When Email or Number is incorrect___________________________________________/
      } else if (err.name === "ValidationError") {
        
        let finalMsg = err.message.slice(46);
       
        res.send({ msg: finalMsg, success: false, status: 400 });
      } else {
        res.send({ msg: "Signup Unsuccessfull", success: false, status: 500 });
      }
        
    }
}