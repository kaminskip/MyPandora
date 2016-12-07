var config = require("./../config.json");
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var MongoDB = null;

describe("Test mongo db", function(){

    before(function(done){
        MongoClient.connect(config.mongo_url, function(err, db) {
            MongoDB = db;
            done();
        })
    });

    after(function (done){
        MongoDB.close();
        done();
    });

    describe('Test inserts', function(done){
        it('Should insert document', function(done){
            var collection = MongoDB.collection('testCol');
            collection.insertOne({"imie": "Pawel"}, function(err, result) {
                assert.equal(JSON.parse(result).ok, "1");
            });
            collection.find({}).toArray(function (err, docs) {
                assert.equal(err, null);
                console.log("Found the following records");
                console.log(docs);
            });
            collection.remove({}, function (err) {
                assert.equal(err, null);
            });
            done();
        });
    });
});