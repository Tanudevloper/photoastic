// let chars = [4,2,5,8,6,6];
// let uniqueChars = [...new Set(chars)];

// console.log(uniqueChars);
require("dotenv").config();
const express =require("express");
const bodyparser =require("body-parser");
const mongoose=require("mongoose");
const res = require("express/lib/response");

const app=express();

app.use(bodyparser.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db =mongoose.connection;

db.on('error',()=>console.log("Error in connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));
app.post("/contactform",(req,res)=>{
    var name= req.body.name;
    var email= req.body.email;
    var phno= req.body.phno;
    var date= req.body.date;
    var location= req.body.location;

var data={
    "name":name,
    "email":email,
    "phno":phno,
    "date":date,
    "location":location
}

db.collection('pro').insertOne(data,(err,collection)=>{
    if(err){
        throw err;
    }
    console.log("record succesfuly inserted");
})

return res.redirect('contact_success.html');
})
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'})
        return res.redirect('home.html');
}).listen(3000);

console.log("listening on port 3000");