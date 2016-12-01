var assert = require('assert');
var mapEvent = require('../mapEvent');
var eventData = require('./eventData.json');
describe('Event store', function() {
    describe('Map event massage', function(){
        it('Should convert msg', function(){
            var result = {};
            result.device = "dom/salon/temp";
            result.event_type = "get";
            result.device_type = "temp_sensor";
            result.value = 25.937;
            result.date = "2016-11-27T20:29:01.000Z";
            var returned = mapEvent.tempMsg("dom/salon/temp", eventData);
            var stringResult = JSON.stringify(result);
            assert.deepEqual(stringResult, returned);
        });
    });
});