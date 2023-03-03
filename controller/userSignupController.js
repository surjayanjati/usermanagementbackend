// Requiring The Collection From The Model --------------------------------->
const userCollection=require("../model/userModel");





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