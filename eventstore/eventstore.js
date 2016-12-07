module.exports = function (config) {

    var MongoClient = require('mongodb').MongoClient;
    var moment = require('moment');
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

    module.getEventDayId = function (db, event, callback) {
        db.collection(config.mongo_events).findOne({"devicePath": event.device, "day": new Date(module.getDayFromDate(event.date))}, {_id : 1}, function(err, id) {
            if (err != null) {
                console.log("Can not get doc: " + eventPath + ", " + eventDay);
                console.log(err);
                callback(null);
            }
            callback(id);
        });
    };

    module.addEventDay = function (db, event, callback) {
        db.collection(config.mongo_events).insertOne({
            "devicePath" : event.device,
            "eventType" : event.event_type,
            "deviceType" : event.device_type,
            "day" : new Date(module.getDayFromDate(event.date)),
            "data" : []
        }, function(err) {
            if (err != null) {
                console.log("Can not add doc: " + event);
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

    module.getDayFromDate = function (date) {
        return moment(date).startOf('day').format();
    };

    module.storeEvent = function (data, callback) {
        module.connect(function (db) {
            module.getEventDayId(db, data.device, module.getDayFromDate(data.date), function (id) {
                callback(id);
                // var json = {};
                // if(id == null) {
                //     json.device = config.topic.salonTemp;
                //     json.device_type = "tempSensor";
                //     json.event_type = "state";
                //     json.day = "2014-08-16";
                //     EventStore.addEventDay(db, json, function (db) {
                //         console.log("Dodane dnia: " + json);
                //         db.close();
                //     });
                // } else {
                //     json.time = "2016-11-27T20:29:01.000Z";
                //     json.value = 25.937;
                //     EventStore.addEvent(db, id._id, json, function (db) {
                //         console.log("Dodanie danych: " + json);
                //         db.close();
                //     });
                // }
            });
        });
    };

    return module;

};