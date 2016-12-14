var assert = require('assert');
var config = require('./config.json');
var eventMapper = require('../eventmapper')(config);

describe('Event mapper', function() {
    describe('Map event massage', function(){
        it('Should convert JSON MQTT message to event', function(){
            var eventData = '{"temp": "25937", "data": "2016-11-27 21:29:01"}';
            var expected = {};
            expected.device = 'dom/salon/temp';
            expected.event_type = 'get';
            expected.device_type = 'temp_sensor';
            expected.value = 25.937;
            expected.date = "2016-11-27 21:29:01";
            expected.ts = {channel_id: 0, data: {field1: 25.937}};
            assert.deepEqual(expected, eventMapper.getEvent("dom/salon/temp", eventData));
        });
        it('Should convert temperature message to event', function(){
            var eventData = '{"temp": "25937", "data": "2016-11-27 21:29:01"}';
            var expected = {};
            expected.device = 'dom/salon/temp';
            expected.event_type = 'get';
            expected.device_type = 'temp_sensor';
            expected.value = 25.937;
            expected.date = "2016-11-27 21:29:01";
            expected.ts = {channel_id: 0, data: {field1: 25.937}};
            assert.deepEqual(expected, eventMapper.tempEvent(eventData));
        });
    });
});