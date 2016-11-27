var mqtt = require('mqtt')
var mapEvent = require('./mapEvent.js')
//var client = mqtt.connect('mqtt://192.168.1.202')

//client.on('connect', function () {
//  client.subscribe('dom/salon/temp')
//})
//
//client.on('message', function (topic, message) {
//  console.log(message.toString())
//  console.log(message.temp)
//  console.log(message.data)
//})

mapEvent.log()
