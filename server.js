//require dependencies
var express = require ("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//set up port to either be the host's designated port, or 3000
var PORT = process.env.PORT || 8081;

//express app
var app = express();

//set up express router
var router = express.Router();

//require our routes file pass our router object
require("./config/routes")(router);

//public folder as a static directory
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

//var databaseUri= mongodb:<dbuser>:<dbpassword>@ds139295.mlab.com:39295/heroku_tlv2gfr5;
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to our database
mongoose.connect(db, function(error){
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
})


//listen on port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});