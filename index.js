const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose= require("mongoose");
const { urlencoded } = require("body-parser");
const https = require("https");
const { stringify } = require("querystring");

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: "true"}));
app.use(express.static(__dirname));
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {console.log("connected to DB")});
const Schema=mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String
    },
    name:{
        type:String
    }
});

const user=mongoose.model("user",userSchema);

var KBCData;
app.get("/", function(req, res) {
   
  res.render("form");
});

app.get('/kbc',(req,res) => {
    res.render("index",{question:KBCData.question,a:KBCData.a,b:KBCData.b,c:KBCData.c,d:KBCData.d,ans:KBCData.answer});
})

https.get("https://quizzrapi.herokuapp.com/random",(response) => {
    console.log(response.statusCode);
    response.on("data",(data)=>{
        KBCData=JSON.parse(data);
        
        console.log(KBCData);
        
    });
});

app.post("/register",function(req,res) {
    let Email = req.body.email;
    console.log(Email);
    let User=new user({
        email:Email,
        name:req.body.name
    });
    User.save()
    res.redirect("/kbc");
});


app.listen(4000, function() {
    console.log("This is port 4000");
});