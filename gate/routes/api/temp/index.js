var router = require('express').Router();
const config = require('../../../config.json');
const ThingSpeak = require("../../../thingspeak")(config);
var moment = require('moment');

router.get('/home/:room/temp', function (req, res) {
    ThingSpeak.getLastEvent(req.path, function (response, error) {
        if(error == null){
            var eventMoment = moment(response.created_at);
            var eventDate = eventMoment.format('YYYY-MM-DD HH:mm');
            var duration = eventMoment.fromNow();
            console.log("Get temperature for " + req.path + " form " + eventDate + " value " + response.field1 + " C");
            res.send({
                value: response.field1,
                isoDate: response.created_at,
                date: eventDate,
                last: duration
            });
        } else {
            res.send({error: "Cannot get temperature for device"});
            console.error(error);
        }
    });
});

module.exports = router;