/// Requiring The Module/Pakages -------------------------------------------------------------------------------->
const express=require("express");




/// Using The Express ------------------------------------------------------------------------------------------->
const app=express();

/// Middlewares ------------------------------------------------------------------------------------------------->
app.use(express.json()) //:> For Form Data





/// Listening To The Port Number -------------------------------------------------------------------------------->
app.listen(7890,()=>{
    console.log("Listening To The Port Number 7890");
})