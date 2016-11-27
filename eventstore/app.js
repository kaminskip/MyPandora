var mqtt = require('mqtt')
var mapEvent = require('./mapEvent.js')
var client = mqtt.connect('mqtt://192.168.1.202')

client.on('connect', function () {
    client.subscribe('dom/salon/temp')
})

client.on('message', function (topic, message) {
    var msg = mapEvent.tempMsg(topic, message)
    console.log(msg)
    client.end()
})
