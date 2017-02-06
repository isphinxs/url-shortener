"use strict";

var Urls = require(process.cwd() + "/app/models/url.js");

function urlShortener (url) {
    
    var alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var base = alphabet.length;
 
    this.getShortUrl = function (url, callback) { 
        getCode(function(newEncode) {
            var newCode = newEncode[0];
            var shortCode = newEncode[1]; 
            var newUrl = new Urls( {
                code: newCode,
                long_url: url,
                short_code: shortCode 
            });
            newUrl.save(function (err, newUrl) {
                if (err) {
                    return console.error(err);
                }
                callback(newUrl.short_code); 
            });
        });
    };
        
    function getCode (callback) { 
        Urls
            .find()
            .sort({ code: -1 }) 
            .limit(1)
            .exec(function (err, docs) { 
                if (err) {
                    throw err;
                }
                if (docs.length === 1) { 
                    var newCode = docs[0].code + 1;
                    var shortCode = encode(newCode);
                    callback([newCode, shortCode]);
                } else {
                    newCode = 1;
                    shortCode = encode(1); 
                    callback([newCode, shortCode]);
                }
            });
    }
    
    function encode(num) { 
        var encoded = "";
        while (num) {
            var mod = num % base;
            num = Math.floor(num / base);
            encoded = alphabet[mod].toString() + encoded;
        }
        return encoded;
    }
    
    this.decode = function(str) {
        var decoded = 0;
        while (str) {
            var index = alphabet.indexOf(str[0]);
            var power = str.length - 1;
            decoded += index * (Math.pow(base, power));
            str = str.substring(1);
        }
        return decoded;
    };
}

module.exports = urlShortener;