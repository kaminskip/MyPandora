var router = require('express').Router();
const config = require('../../../config.json');
const ThingSpeak = require("../../../thingspeak")(config);
var moment = require('moment');

router.get('/home/:room/lamp', function (req, res) {
    ThingSpeak.getLastEvent(req.path, function (response, error) {
        if(error == null){
            var state = response.field1 === "0" ? "off" : "off";
            var eventMoment = moment(response.created_at);
            var eventDate = eventMoment.format('YYYY-MM-DD HH:mm');
            var duration = eventMoment.fromNow();
            console.log("Last device " + req.path + " state form " + eventDate + " is " + state);
            res.send({
                value: state,
                isoDate: response.created_at,
                date: eventDate,
                duration: duration
            });
        } else {
            res.send({error: "Cannot get state for device"});
            console.error(error);
        }
    });
});

module.exports = router;