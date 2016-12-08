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

    module.getEventDayId = function (db, event, callback) {
        db.collection(config.mongo_events).findOne(module.getDayFilterFromEvent(event), {_id : 1}, function(err, id) {
            if (err != null) {
                console.log("Can not get doc: " + event.device + ", " + day);
                console.log(err);
                callback(null);
            }
            callback(id);
        });
    };

    module.getDayFilterFromEvent = function (event) {
        var day = module.getDayFromStringDate(event.date);
        return {"devicePath": event.device, "day": day};
    };

    module.addEventDay = function (db, event, callback) {
        db.collection(config.mongo_events).insertOne({
            "devicePath" : event.device,
            "eventType" : event.event_type,
            "deviceType" : event.device_type,
            "day" : module.getDayFromStringDate(event.date),
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

    module.addEvent = function (db, event, callback) {
        var date = module.getDateFromStringDate(event.date);
        var addEventData = {$push:{"data" : {"d" : date, "v" : event.value}}};
        db.collection(config.mongo_events).findOneAndUpdate(module.getDayFilterFromEvent(event), addEventData, function () {
            callback(db);
        });
    };

    module.getDayFromStringDate = function (date) {
        return new Date(date.substring(0,10));
    };

    module.getDateFromStringDate = function (date) {
        return new Date(date);
    };

    module.storeEvent = function (event, callback) {
        module.connect(function (db) {
            module.getEventDayId(db, event, function (id) {
                if (id == null) {
                    module.addEventDay(db, event, function (db) {
                        module.addEvent(db, event, function (db) {
                            db.close();
                            callback("AddedDayAndEvent");
                        });
                    });
                } else {
                    module.addEvent(db, event, function (db) {
                        db.close();
                        callback("AddedEvent");
                    });
                }
            });
        });
    };

    return module;

};