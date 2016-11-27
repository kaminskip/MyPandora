var assert = require('assert');
var mapEvent = require('../mapEvent')
var eventData = require('./eventData.json')
describe('Event store', function() {

  describe('Map event massage', function(){
  //var json = JSON.parse(eventData)
    it('Should convert msg', function(){
       var result = {}
       result.device = "dom/salon/temp"
       result.event_type = "get";
       result.device_type = "temp_sensor"
       result.unit = "C"
       result.value = 25.937
       result.date = {}
       result.date.year = 2016
       result.date.month = 11
       result.date.day = 27
       result.date.hour = 21
       result.date.min = 29
       result.date.sec = 1
       assert.equal(result, mapEvent.tempMsg("dom/salon/temp", eventData))
    });
  });

});