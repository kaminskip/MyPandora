var config = require("./config.json");
var EventStore = require("./eventstore")(config);

EventStore.connect(function (db) {
    var day = Date("2016-01-01");
    EventStore.getEventDay(db, config.topic.salonTemp, day, function (id) {
        var json = {};
        if(id == null) {
            json.device = config.topic.salonTemp;
            json.device_type = "tempSensor";
            json.event_type = "state";
            json.day = "2014-08-16";
            EventStore.addEventDay(db, json, function (db) {
                console.log("Dodane dnia: " + json);
                db.close();
            });
        } else {
            json.time = "2016-11-27T20:29:01.000Z";
            json.value = 25.937;
            EventStore.addEvent(db, id._id, json, function (db) {
                console.log("Dodanie danych: " + json);
                db.close();
            });
        }
    });
});