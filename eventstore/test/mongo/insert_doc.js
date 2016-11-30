var config = require("../config.json");
var TestFun = require("./functions");

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.mongo_url, function(err, db) {
    console.log("Connected successfully to server");
    TestFun.insertDocuments(db, function() {
        db.close();
    });
});