var mqtt = require('mqtt');
var config = require('./config.json');
var eventStore = require("./eventstore")(config);
var eventMapper = require("./eventmapper")(config);

console.log("Connecting to MQTT server " + config.mqtt_url + " ...");
var client = mqtt.connect(config.mqtt_url);

client.on('connect', function () {
    console.log("Connected!");
    console.log("Subscribe to all topics");
    client.subscribe("#");
    console.log("Storing events");
});

client.on('message', function (topic, message) {
    var event = eventMapper.getEvent(topic, message);
    if (event != null) {
        eventStore.storeEvent(event, function () {
            process.stdout.write(".");
        });
    }
});