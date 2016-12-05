var config = require("./config.json");
var EventStore = require("./eventstore")(config);

EventStore.connect(function (db) {
    var day = Date("2016-01-01");
    EventStore.getEventDay(db, config.topic.salonTemp, day, function (id) {
        if(id == null) {
            var json = {};
            json.device = config.topic.salonTemp;
            json.device_type = "tempSensor";
            json.event_type = "state";
            json.day = "2014-08-16";
            EventStore.addEventDay(db, json, function (db) {
                db.close();
            });
        } else {
            console.log("jest aktualizacja");
        }
    });
});