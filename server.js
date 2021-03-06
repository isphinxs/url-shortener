var express = require("express"),
    routes = require("./app/routes/index.js"),
    mongoose = require("mongoose");

var app = express();
var port = process.env.PORT || 8080;
var url = process.env.MONGOLAB_URI || "mongodb://localhost:27017/urlshortener";

mongoose.connect(url);

app.use("/public", express.static(process.cwd() + "/public"));

routes(app);

app.listen(port, function () {
    console.log("Listening on port " + port + "...");
});