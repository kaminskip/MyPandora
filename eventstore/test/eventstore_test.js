var assert = require('assert');
var config = require('./config.json');
var eventStore = require('../eventstore')(config);

describe('Event store', function() {

    describe('Check getDayFromDate', function(){
        it('Should change date with time to day', function(){
            assert.equal("2016-11-27T00:00:00+01:00", eventStore.getDayFromDate("2016-11-27 21:29:01"));
            assert.equal("2016-02-01T00:00:00+01:00", eventStore.getDayFromDate("2016-02-01 01:12:00"));
            assert.equal("2016-12-31T00:00:00+01:00", eventStore.getDayFromDate("2016-12-31 12:15:22"));
            assert.equal("2018-01-01T00:00:00+01:00", eventStore.getDayFromDate("2018-01-01 16:16:16"));
        });
    });

    describe('Connect to local mongo instance', function(){
        it('Should connect to local mongo instance', function(done){
            eventStore.connect(function (db) {
                assert.notEqual(null, db);
                db.close();
                done();
            });
        });
    });

    describe('Get event day', function(){
        it('Should not get event', function(done){
            eventStore.connect(function (db) {
                var event = {};
                event.device = 'dom/salon/temp';
                event.event_type = 'get';
                event.device_type = 'temp_sensor';
                event.value = 25.937;
                event.date = new Date("2016-11-27 21:29:01");
                eventStore.getEventDayId(db, event, function (id) {
                    assert.equal(null, id);
                    db.close();
                    done();
                })
            });
        });
        it('Should create event day', function(done){
            eventStore.connect(function (db) {
                var event = {};
                event.device = 'dom/salon/temp';
                event.event_type = 'get';
                event.device_type = 'temp_sensor';
                event.value = 25.937;
                event.date = new Date("2016-11-27 21:29:01");
                eventStore.addEventDay(db, event, function (db) {
                    assert.notEqual(null, db);
                    eventStore.getEventDayId(db, event, function (id) {
                        assert.notEqual(null, id);
                        db.collection(config.mongo_events).findOne({_id : id._id}, function (err, doc) {
                            assert.equal(null, err);
                            assert.equal(id._id.toString(), doc._id.toString());
                            assert.equal(event.device, doc.devicePath);
                            assert.equal(event.event_type, doc.eventType);
                            assert.equal(event.device_type, doc.deviceType);
                            assert.equal(event.date, doc.day);
                            db.collection(config.mongo_events).drop(function () {
                                db.close();
                                done();
                            });
                        });
                    })
                });
            });
        });
        it('Should get event', function(done){
            eventStore.connect(function (db) {
                var event = {};
                event.device = 'dom/salon/temp';
                event.event_type = 'get';
                event.device_type = 'temp_sensor';
                event.value = 25.937;
                event.date = new Date("2016-11-27 21:29:01");
                eventStore.addEventDay(db, event, function (db) {
                    assert.notEqual(null, db);
                    eventStore.getEventDayId(db, event, function (id) {
                        assert.notEqual(null, id);
                        db.collection(config.mongo_events).drop(function () {
                            db.close();
                            done();
                        });
                    })
                });
            });
        });
    });

});