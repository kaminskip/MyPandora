var config = require("../config.json");
var TestFun = require("./functions");

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.mongo_url, function(err, db) {
    console.log("Connected correctly to server");
    TestFun.updateDocument(db, function() {
        db.close();
    });
});