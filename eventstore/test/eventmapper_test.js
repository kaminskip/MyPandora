var assert = require('assert');
var eventMapper = require('../eventmapper')();

describe('Event mapper', function() {
    describe('Map event massage', function(){
        it('Should convert JSON MQTT message to js object', function(){
            var eventData = '{"temp": "25937", "data": "2016-11-27 21:29:01"}';
            var expected = {};
            expected.device = 'dom/salon/temp';
            expected.event_type = 'get';
            expected.device_type = 'temp_sensor';
            expected.value = 25.937;
            expected.date = new Date("2016-11-27 21:29:01");
            assert.deepEqual(expected, eventMapper.tempEvent("dom/salon/temp", eventData));
        });
    });
});