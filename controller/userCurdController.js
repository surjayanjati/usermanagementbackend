// Requiring The Collection From The Model --------------------------------->
const userCollection=require("../model/userModel");



/// Controller When The User wants to Add an Item ----------------------------------------------------------------------->
exports.userAddItem=async(req,res)=>{
    try {
        // Objec Destructuring For Getting Values From req Body and middleware__________________/
        const { _id,userName,userEmail } = req.details;
        // Getting Values From The request Body ________________________________________________/
        const {id,name,price,description}=req.body;
        if(id!==""&& name!=="" && price!=="" && description!==""){
        const pushResult=await userCollection.updateOne({_id:_id},{$push:{itemsArray:{id:id,name:name,price:price,description:description}}});
        if(pushResult.acknowledged===true){
            res.send({msg:"New Item Has Been Added",success:false,status:200});
        }else res.send({msg:"Unable To Add The Item",success:false,status:500});
        }else res.send({msg:"Kindly Enter All The Details",success:false,status:400});
    }catch(error){
        res.send({msg:"Unable To Add The Item",success:false,status:500});
    }
}
/// Controller When The User wants to Delete an Item ----------------------------------------------------------------------->
exports.userDeleteItem=async(req,res)=>{
    try {
        // Objec Destructuring For Getting Values From req Body and middleware__________________/
        const { _id,userName,userEmail } = req.details;
        // Getting Values From The request Body ________________________________________________/
        const id=req.body.id;
        if(id!==""){
        const pushResult=await userCollection.updateOne({_id:_id},{$pull:{itemsArray:{id:id}}});
        if(pushResult.acknowledged===true){
            res.send({msg:"Item Has Been Deleted",success:false,status:200});
        }else res.send({msg:"Unable To Delete The Item",success:false,status:500});
        }else res.send({msg:"Unable To Delete The Item",success:false,status:400});
    }catch(error){
        res.send({msg:"Unable To Delete The Item",success:false,status:500});
    }
}
/// Controller When The User wants to Edit an Item ----------------------------------------------------------------------->
exports.userEditItem=async(req,res)=>{
    try {
        // Objec Destructuring For Getting Values From req Body and middleware__________________/
        const { _id,userName,userEmail } = req.details;
        // Getting Values From The request Body ________________________________________________/
        const {id,name,price,description}=req.body;
        if(id!=="" && name!=="" && price !=="" && description!==""){
            
        const editResult=await userCollection.updateOne({_id:_id,"itemsArray.id":id},{$set:{id:id,name:name,price:price,description:description}});
        console.log(editResult);
        if(editResult.acknowledged===true){
            res.send({msg:"Item Has Been Updated",success:false,status:200});
        }else res.send({msg:"Unable To Update The Item",success:false,status:500});
        }else res.send({msg:"Kindly Enter All The Details",success:false,status:400});
    }catch(error){
        console.log(error.message);
        res.send({msg:"Unable To Update The Item",success:false,status:500});
    }
}