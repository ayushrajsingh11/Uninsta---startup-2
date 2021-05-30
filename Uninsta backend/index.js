// imorting libraries ->
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv =require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
//calling api
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postsRoute=require("./routes/posts");
dotenv.config(); 


mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser: true,useUnifiedTopology: true},
    ()=>{
    console.log("connected to MongoDB")
}
);
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.get("/",(req,res)=>{
    res.send("<h1>welcome to homepage</h1>")
})
/*
app.get("/users",(req,res)=>{
    res.send("<h1>welcome to users</h1>")
})*/
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postsRoute);
app.listen(8800, ()=>{
    console.log("backend server is running !")
});