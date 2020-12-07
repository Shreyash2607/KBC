const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({ extended: "true"}));
app.use(express.static(__dirname + "public"));

app.get("/", function(req, res) {
    res.sendFile("/index.html");
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