/// Requiring The Module/Pakages -------------------------------------------------------------------------------->
const express=require("express");




/// Using The Express ------------------------------------------------------------------------------------------->
const app=express();

/// Middlewares ------------------------------------------------------------------------------------------------->
app.use(express.json()) //:> For Form Data


/// Requiring The Routes ---------------------------------------------------------------------------------------->
require("./routes/userRoute")(app);

require("./routes/itemsRoute")(app);

/// Listening To The Port Number -------------------------------------------------------------------------------->
app.listen(7890,()=>{
    console.log("Listening To The Port Number 7890");
})