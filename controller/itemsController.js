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
            res.send({msg:"New Item Has Been Added",success:true,status:200});
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
            res.send({msg:"Item Has Been Updated",success:true,status:200});
        }else res.send({msg:"Unable To Update The Item",success:false,status:500});
        }else res.send({msg:"Kindly Enter All The Details",success:false,status:400});
    }catch(error){
        console.log(error.message);
        res.send({msg:"Unable To Update The Item",success:false,status:500});
    }
}

/// Controller When The User Wants to Search A particular Item ------------------------------------------------------------>
exports.getItems = async (req, res) => {
    try {
        
        const limit = 5;
        const { _id } = req.details;

        const queryObj = { userId: _id };
        if (req.query.searchKeyword) {
            const keyword = req.query.searchKeyword;
            queryObj.$or = [{ name: RegExp(keyword, 'i') }, { description: RegExp(keyword, 'i') }];
        }

        const sortObj = { };
        if(req.query.sort){
            const values = req.query.sort.split(" ");
            sortObj[values[0]] = values[1] == 'asc' ? 1 : -1;
        }
        const searchResultArray = await itemcollections.find(queryObj).sort(sortObj).skip((req.query.page - 1) * limit).limit(limit);

        res.send({ msg: "Item Has Been Fetched", success: true, status: 200, dataArray: searchResultArray });

    } catch (error) {
        console.log(error)
        res.send({ msg: "This Item Doesn't Exists", success: false, status: 500 });
    }
};


/// Controller When The User Wants to Download all Data in CSV ------------------------------------------------------------>
exports.getAllItems = async (req, res) => {
    try {
        
        
        const { _id } = req.details;

        
       
        const searchResultArray = await itemcollections.find({userId:_id});

        res.send({ msg: "Items Has Been Fetched", success: true, status: 200, dataArray: searchResultArray });

    } catch (error) {
        console.log(error)
        res.send({ msg: "This Item Doesn't Exists", success: false, status: 500 });
    }
};