module.exports = {
    insertDocuments: function (db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        // Insert some documents
        collection.insertMany([
            {a : 1}, {a : 2}, {a : 3}
        ], function(err, result) {
            console.log("Inserted 3 documents into the collection");
            callback(result);
        });
    },
    findDocuments: function (db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
            console.log("Found the following records");
            console.log(docs);
            callback(docs);
        });
    },
    updateDocument: function (db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        // Update document where a is 2, set b equal to 1
        collection.updateOne({ a : 2 }
            , { $set: { b : 1 } }, function(err, result) {
                console.log("Updated the document with the field a equal to 2");
                callback(result);
            });
    }
};