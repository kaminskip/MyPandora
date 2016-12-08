describe('Event store', function() {

    var assert = require('assert');
    var config = require('./config.json');
    var eventStore = require('../eventstore')(config);

    var sampleEvent = {
        device : 'dom/salon/temp',
        event_type : 'get',
        device_type : 'temp_sensor',
        value : 25.937,
        date : "2016-11-27 21:29:01"
    };

    var sampleEvent2 = {
        device : 'dom/salon/temp',
        event_type : 'get',
        device_type : 'temp_sensor',
        value : 23.234,
        date : "2016-11-27 21:30:01"
    };

    var sampleEvent3 = {
        device : 'dom/salon/temp',
        event_type : 'get',
        device_type : 'temp_sensor',
        value : 22.649,
        date : "2016-11-28 21:29:01"
    };

    describe('Check getDayFromDate', function(){
        it('Should change date with time to day', function(){
            assert.equal("2016-11-27T00:00:00.000Z", eventStore.getDayFromStringDate("2016-11-27 21:29:01").toISOString());
            assert.equal("2016-02-01T00:00:00.000Z", eventStore.getDayFromStringDate("2016-02-01 01:12:00").toISOString());
            assert.equal("2016-12-31T00:00:00.000Z", eventStore.getDayFromStringDate("2016-12-31 12:15:22").toISOString());
            assert.equal("2018-01-01T00:00:00.000Z", eventStore.getDayFromStringDate("2018-01-01 16:16:16").toISOString());
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

    describe('Event day', function(){
        it('Should not get event day', function(done){
            eventStore.connect(function (db) {
                eventStore.getEventDayId(db, sampleEvent, function (id) {
                    assert.equal(null, id);
                    db.close();
                    done();
                });
            });
        });
        it('Should get event day', function(done){
            eventStore.connect(function (db) {
                eventStore.addEventDay(db, sampleEvent, function (db) {
                    assert.notEqual(null, db);
                    eventStore.getEventDayId(db, sampleEvent, function (id) {
                        assert.notEqual(null, id);
                        db.collection(config.mongo_events).drop(function () {
                            db.close();
                            done();
                        });
                    });
                });
            });
        });
        it('Should create event day', function(done){
            eventStore.connect(function (db) {
                eventStore.addEventDay(db, sampleEvent, function (db) {
                    assert.notEqual(null, db);
                    eventStore.getEventDayId(db, sampleEvent, function (id) {
                        assert.notEqual(null, id);
                        db.collection(config.mongo_events).findOne({_id : id._id}, function (err, doc) {
                            assert.equal(null, err);
                            assert.equal(id._id.toString(), doc._id.toString());
                            assert.equal(sampleEvent.device, doc.devicePath);
                            assert.equal(sampleEvent.event_type, doc.eventType);
                            assert.equal(sampleEvent.device_type, doc.deviceType);
                            assert.equal(eventStore.getDayFromStringDate(sampleEvent.date).getTime(), doc.day.getTime());
                            db.collection(config.mongo_events).drop(function () {
                                db.close();
                                done();
                            });
                        });
                    });
                });
            });
        });
        it('Should create day and add event', function(done){
            eventStore.storeEvent(sampleEvent, function (result) {
                assert.equal("AddedDayAndEvent", result);
                eventStore.connect(function (db) {
                    db.collection(config.mongo_events).drop(function () {
                        db.close();
                        done();
                    });
                });
            });
        });
        it('Should create day and 2 events', function(done){
            eventStore.storeEvent(sampleEvent, function (result) {
                assert.equal("AddedDayAndEvent", result);
                eventStore.storeEvent(sampleEvent2, function (result) {
                    assert.equal("AddedEvent", result);
                    eventStore.connect(function (db) {
                        db.collection(config.mongo_events).drop(function () {
                            db.close();
                            done();
                        });
                    });
                });
            });
        });
        it('Should create day and 2 events', function(done){
            eventStore.storeEvent(sampleEvent, function (result) {
                assert.equal("AddedDayAndEvent", result);
                eventStore.storeEvent(sampleEvent2, function (result) {
                    assert.equal("AddedEvent", result);
                    eventStore.connect(function (db) {
                        db.collection(config.mongo_events).drop(function () {
                            db.close();
                            done();
                        });
                    });
                });
            });
        });
        it('Should create day with 2 events and next day with one event', function(done){
            eventStore.storeEvent(sampleEvent, function (result) {
                assert.equal("AddedDayAndEvent", result);
                eventStore.storeEvent(sampleEvent2, function (result) {
                    assert.equal("AddedEvent", result);
                    eventStore.storeEvent(sampleEvent3, function (result) {
                        assert.equal("AddedDayAndEvent", result);
                        eventStore.connect(function (db) {
                            db.collection(config.mongo_events).drop(function () {
                                db.close();
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

});