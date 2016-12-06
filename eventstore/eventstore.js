module.exports = function (config) {

    var MongoClient = require('mongodb').MongoClient;
    var module = {};

    module.connect = function (callback) {
        MongoClient.connect(config.mongo_url, function(err, db) {
            if (err != null) {
                console.log("Can not connect to " + config.mongo_url);
                console.log(err);
                return null;
            }
            callback(db);
        })
    };

    module.getEventDay = function (db, eventPath, eventDay, callback) {
        db.collection(config.mongo_events).findOne({"devicePath": eventPath}, {_id : 1}, function(err, id) {
            if (err != null) {
                console.log("Can not get doc: " + eventPath + ", " + eventDay);
                console.log(err);
                return null;
            }
            callback(id);
        });
    };

    module.addEventDay = function (db, json, callback) {
        db.collection(config.mongo_events).insertOne({
            "devicePath" : json.device,
            "eventType" : json.event_type,
            "deviceType" : json.device_type,
            "day" : new Date(json.day),
            "data" : []
        }, function(err) {
            if (err != null) {
                console.log("Can not add doc: " + json);
                console.log(err);
                return null;
            }
            callback(db);
        });
    };

    module.addEvent = function (db, id, json, callback) {
        console.log("Add: " + id);
        db.collection(config.mongo_events).update({_id: id}, {$push:{"data" : {"d":new Date(json.time), "v": json.value}}}, function (err) {
            if (err != null) {
                console.log("Can not add event: " + json);
                console.log(err);
                return null;
            }
            callback(db);
        });
    };

    return module;

};