var express = require("express"),
    routes = require("./app/routes/index.js"),
    mongoose = require("mongoose");

var app = express();
var port = process.env.PORT || 8080;
//var url = "mongodb://localhost:27017/urlshortener";
var url = process.env.MONGO_URI;

mongoose.connect(url);

app.use("/public", express.static(process.cwd() + "/public"));

routes(app);

app.listen(port, function () {
    console.log("Listening on port " + port + "...");
});