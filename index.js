const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");
const https = require("https");

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: "true"}));
app.use(express.static(__dirname));

app.get("/", function(req, res) {
    //res.sendFile(__dirname + "/index.html");
    https.get("https://quizzrapi.herokuapp.com/random",(response) => {
        console.log(response.statusCode);
        response.on("data",(data)=>{
            KBCData=JSON.parse(data);
            question=KBCData.question;
            //document.getElementsByClassName("question").innerHTML=<h2>question</h2>
        });
    });
    res.render("index",{question:question});
})


// request("https://quizzrapi.herokuapp.com/random", function(error, response, body) {
//     var data = JSON.parse(body)
//     var q = data.question;
//     //res.send("<h1>The current price  is " + pr + "</h1>");
//     console.log(data);
//     document.querySelector(".question ").innerHTML(q);
// })

app.listen(4000, function() {
    console.log("This is port 4000");
});