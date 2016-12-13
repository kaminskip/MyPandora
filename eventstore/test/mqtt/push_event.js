var mqtt = require('mqtt');
var config = require('./../config.json');

console.log("Connect to " + config.mqtt_url);
var client = mqtt.connect(config.mqtt_url);

client.on('connect', function () {
    var jsonData = '{"temp": "25937", "data": "2016-11-27 21:29:01"}';
    client.publish(config.topic.salonTemp.id, jsonData);
    console.log("Event:");
    console.log(jsonData);
    console.log("published on topic: " + config.topic.salonTemp.id);
    client.end();
    console.log("Client disconnected.");
});

