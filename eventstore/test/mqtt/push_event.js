var mqtt = require('mqtt');
var config = require('./../config.json');
var testData = require('./../eventData.json');

console.log("Connect to " + config.mqtt_url);
var client = mqtt.connect(config.mqtt_url);

client.on('connect', function () {
    var data = JSON.stringify(testData);
    client.publish(config.topic.salonTemp, data);
    console.log("Event:");
    console.log(data);
    console.log("published on topic: " + config.topic.salonTemp);
    client.end();
    console.log("Client disconnected.");
});

