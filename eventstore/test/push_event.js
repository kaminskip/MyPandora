var mqtt = require('mqtt');
var config = require('../config.json');
var testData = require('./eventData.json');

console.log("Connect to " + config.mqtt_url);
var client = mqtt.connect(config.mqtt_url);

client.on('connect', function () {
    client.publish(config.topic.salonTemp, JSON.stringify(testData));
    console.log("Event:");
    console.log(JSON.stringify(testData));
    console.log("published on topic: " + config.topic.salonTemp);
    client.end();
    console.log("Client disconnected.");
});

