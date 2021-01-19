const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose= require("mongoose");
const { urlencoded } = require("body-parser");
const https = require("https");
const { stringify } = require("querystring");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require('axios');

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: "true"}));
app.use(express.static(__dirname + '/public'));
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


function getNewQuestion(callback){
    //     var xhr = new XMLHttpRequest();
    // xhr.open('GET','https://quizzrapi.herokuapp.com/random',true);
    // xhr.onload = function(){
    //     if(this.status==200){
    //         { newQuestion = JSON.parse(this.responseText);
    //          //console.log(newQuestion);
    //         return newQuestion;}
    //     }
    // }
    // xhr.send();
    request("https://quizzrapi.herokuapp.com/random", function(error, response, body) {
      var result = JSON.parse(body);
      return callback(null, result);
  });
}

app.get("/", function(req, res) {
   
  res.render("form");
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
           console.log(id);
        res.render("index",{question:newQuestion.question,a:newQuestion.a,b:newQuestion.b,c:newQuestion.c,d:newQuestion.d,ans:newQuestion.answer});
       }
       else
       {
           if(newQuestion.answer==ans)
           {
               console.log(ans,id);
           }
       }
    })
    
    // if(id)
    // {
    //     if(req.body.ans==newQuestion.answer)
    //     {

    //     }
    // }
    // getNewQuestion((err,newQuestion) => {

    //  console.log(newQuestion);
    //  res.render("index",{question:newQuestion.question,a:newQuestion.a,b:newQuestion.b,c:newQuestion.c,d:newQuestion.d,ans:newQuestion.answer});
    // });
})




// https.get("https://quizzrapi.herokuapp.com/random",(response) => {
//     console.log(response.statusCode);
//     response.on("data",(data)=>{
//         KBCData=JSON.parse(data);
        
//         console.log(KBCData);
        
//     });
// });

app.post("/register",function(req,res) {
    let Email = req.body.email;
    console.log(Email);
    let User=new user({
        email:Email,
        name:req.body.name
    });
    User.save()
    res.redirect("/kbc?id=0");
});

app.post("/verify",(req,res) => {
    
    res.redirect('/kbc?id=1&ans=' + req.body.ans);
    
})


app.listen(4000, function() {
    console.log("This is port 4000");
});

// document.getElementsByClassName('options').addEventListener('click',getAnotherQuestion);
// function getAnotherQuestion(){
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET','https://quizzrapi.herokuapp.com/random',true);
//     xhr.onload = function(){
//         if(this.status==200){
//             var newQuestion = JSON.parse(this.responseText);
//             console.log(newQuestion);
//              document.getElementsByClassName('question').innerHTML = newQuestion.question;
//              document.getElementsByClassName('upper-left').innerHTML = newQuestion.a;
//              document.getElementsByClassName('upper-right').innerHTML = newQuestion.b;
//              document.getElementsByClassName('lower-left').innerHTML = newQuestion.c;
//              document.getElementsByClassName('lower-right').innerHTML = newQuestion.d;
//         }
//     }
//     xhr.send();
// }