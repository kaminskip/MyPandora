var mqtt = require('mqtt');
var config = require('./config.json');
var mapEvent = require('./mapEvent.js');

console.log("Connecting to MQTT server " + config.mqtt_url);
var client = mqtt.connect(config.mqtt_url);

client.on('connect', function () {
    console.log("Subscribe on " + config.topic.salonTemp);
    client.subscribe(config.topic.salonTemp);
    console.log("Waiting for events ...");
});

client.on('message', function (topic, message) {
    var msg = mapEvent.tempMsg(topic, message);
    console.log(msg);
});
