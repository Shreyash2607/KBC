const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose= require("mongoose");
const { urlencoded } = require("body-parser");
const https = require("https");
const { stringify } = require("querystring");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require('axios');
var q;
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: "true"}));
app.use(express.static(__dirname));
const dbURL = "mongodb+srv://Shreyash:Shreyash123@cluster0.1t8zl.mongodb.net/Test?retryWrites=true&w=majority"
//mongodb://localhost:27017/userDB
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {console.log("connected to DB")});
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


function getNewQuestion(callback){
    request("https://quizzrapi.herokuapp.com/random", function(error, response, body) {
      var result = JSON.parse(body);
      return callback(null, result);
  });
}

app.get("/", function(req, res) {
   
  res.render("form");
});

app.get("/end", function(req, res) {
    res.render("end");
});

app.get('/kbc', (req,res) => {
    var id = req.query.id;
    var ans= req.query.ans;
    console.log(req.query);
    axios.get('https://quizzrapi.herokuapp.com/random')
    .then(function(response){
       var newQuestion = response.data;
       console.log(response.data);
       if(!parseInt(id))
       {
           global.q=newQuestion.answer;
        res.render("index",{question:newQuestion.question,a:newQuestion.a,b:newQuestion.b,c:newQuestion.c,d:newQuestion.d,ans:newQuestion.answer});
       }
       else
       {
        console.log(q);
        if (global.q== ans) {
            global.q=newQuestion.answer;
            res.render("index", { question: newQuestion.question, a: newQuestion.a, b: newQuestion.b, c: newQuestion.c, d: newQuestion.d, ans: newQuestion.answer });
        }
        else
        {
          res.redirect("/end");
        }
       }
    })
})

app.post("/register",function(req,res) {
    let Email = req.body.email;
    let User=new user({
        email:Email,
        name:req.body.name
    });
    User.save()
    res.render("rules");
    //res.redirect("/kbc?id=0");
});

app.post('/kbc',(req,res) =>{
    res.redirect("/kbc?id=0");
})

app.post("/verify",(req,res) => {
    
    res.redirect('/kbc?id=1&ans=' + req.body.button);
    
})


app.listen(4000, function() {
    console.log("This is port 4000");
});
