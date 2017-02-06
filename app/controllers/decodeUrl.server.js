"use strict";

var Urls = require(process.cwd() + "/app/models/url.js");

function urlDecoder(shortCode) {
    
    this.decode = function (shortCode, callback) {
        Urls.findOne({ short_code: shortCode })
            .then(function (doc) {
                if (doc) {
                    callback(doc.long_url);
                } else { 
                    callback(false);   
                }
            });
    };
} 

module.exports = urlDecoder;