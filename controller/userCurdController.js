// Requiring The Collection From The Model --------------------------------->
const userCollection=require("../model/userModel");
const itemcollections=require("../model/itemsModel");



/// Controller When The User wants to Add an Item ----------------------------------------------------------------------->
exports.userAddItem=async(req,res)=>{
    try {
        // Objec Destructuring For Getting Values From req Body and middleware__________________/
        const { _id,userName,userEmail } = req.details;
        // Getting Values From The request Body ________________________________________________/
        const {itemId,name,price,description}=req.body;
        console.log(req.body);
        if(itemId!==""&& name!=="" && price!=="" && description!==""){
        const newData=itemcollections({
            userName:userName,
            userId:_id,
            itemId:itemId,
            name:name,
            price:price,
            description:description
        });
        const saveResult=await newData.save();
        if(saveResult!==null){
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
        const itemId=req.body.itemId;
        console.log(itemId);
        if(itemId!==""){
        const deleteResult=await itemcollections.deleteOne({userId:_id,itemId:itemId});
        if(deleteResult.acknowledged===true){
            res.send({msg:"Item Has Been Deleted",success:true,status:200});
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
            
        const editResult=await itemcollections.updateMany({userId:_id,itemId:id},{$set:{id:id,name:name,price:price,description:description}});
        
        if(editResult.acknowledged===true){
            res.send({msg:"Item Has Been Updated",success:false,status:200});
        }else res.send({msg:"Unable To Update The Item",success:false,status:500});
        }else res.send({msg:"Kindly Enter All The Details",success:false,status:400});
    }catch(error){
        console.log(error.message);
        res.send({msg:"Unable To Update The Item",success:false,status:500});
    }
}

/// Controller When The User Wants to Search A particular Item ------------------------------------------------------------>
exports.userSearchItem=async(req,res)=>{
    try {
        // Objec Destructuring For Getting Values From req Body and middleware__________________/
        const { _id,userName,userEmail } = req.details;
        // Getting Values From The Query Params ________________________________________________/
        
        const name=req.query.name;
        
        if( name!=="" ){
            
        const searchResultArray=await itemcollections.find({userId:_id,name:name});
        
        if(searchResultArray.length!==0){
            res.send({msg:"Item Has Been Fetched",success:false,status:200,dataArray:searchResultArray});
        }else res.send({msg:"This Item Doesn't Exists",success:false,status:500});
        }else res.send({msg:"Kindly Enter The Details",success:false,status:400});
    }catch(error){
        
        res.send({msg:"This Item Doesn't Exists",success:false,status:500});
    }
};

/// Controller When The User Wants to Search A particular Item ------------------------------------------------------------>
exports.userSearchAllItem=async(req,res)=>{
    try {
        // Objec Destructuring For Getting Values From req Body and middleware__________________/
        const { _id,userName,userEmail } = req.details;
        // Getting Values From The Query Params ________________________________________________/
        
       
            
        const searchResultArray=await itemcollections.find({userId:_id});
        
        if(searchResultArray.length!==0){
            res.send({msg:"Item Has Been Fetched",success:false,status:200,dataArray:searchResultArray});
        }else res.send({msg:"This Item Doesn't Exists",success:false,status:500});
       
    }catch(error){
        
        res.send({msg:"This Item Doesn't Exists",success:false,status:500});
    }
};

