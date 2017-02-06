"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var UrlSchema = new Schema({
    code: Number,
    long_url: String,
    short_code: String,
    versionKey: false
});

module.exports = mongoose.model("Urls", UrlSchema);