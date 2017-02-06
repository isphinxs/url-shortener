"use strict";

var UrlDecoder = require(process.cwd() + "/app/controllers/decodeUrl.server.js");
var UrlShortener = require(process.cwd() + "/app/controllers/encodeUrl.server.js");
var Urls = require(process.cwd() + "/app/models/url.js");

module.exports = function (app) {
    
    var urlDecoder = new UrlDecoder();
    var urlShortener = new UrlShortener();
    
    app.route("/")
        .get(function (req, res) {
            res.sendFile(process.cwd() + "/public/index.html");
        });
    
    app.route("/new/:url(*)")
        .get(function (req, res) {
            var rootUrl = "https://evening-taiga-49138.herokuapp.com/"; // https://fcc-api-projects-isphinxs.c9users.io/
            var url = req.params.url; 
            if (checkUrl(url)) {
                checkDuplicate(url, function (result) {  
                    if (result === false) {  
                        urlShortener.getShortUrl(url, function(shortCode) { 
                            var shortUrl = rootUrl + shortCode;
                            res.json({ "original_url": url, "short_url": shortUrl });
                        });
                    } else {  
                        var shortUrl = rootUrl + result;
                        res.json({ "original_url": url, "short_url": shortUrl });
                    }
                });
            } else {  
                res.json({ error: "Invalid URL format.  Please use the following format (items in parentheses are optional): http(s)://(www.)example.com(/)(path)" });
            }
        });
    
    app.route("/:short")
        .get(function (req, res) {
            var short = req.params.short;
            urlDecoder.decode(short, function (result) {
                if (result === false) {
                    res.json({ error: "Invalid entry.  Try again!"});
                } else {
                    res.redirect(result);
                }
            });
        });
};

function checkUrl(str) {
    var re = /^http(s)?:\/\/(www.)?([\w\-]+(?=(\.\w+)))(\S+$)/;
    return re.test(str);
}

function checkDuplicate(str, callback) {
    Urls
        .findOne({ long_url: str })
        .then(function (doc) {
            if (doc) {
                callback(doc.short_code); 
            } else {
                callback(false);
            }
        });
}