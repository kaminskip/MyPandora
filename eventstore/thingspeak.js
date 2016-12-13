module.exports = function (config) {

    var Client = require('node-rest-client').Client;
    var client = new Client();

    module.storeEvent = function (event, callback) {
        var json = JSON.parse(event);
        var args = {
            data: { key: json.ts_key, field1: json.value },
            headers: { "Content-Type": "application/json" }
        };
        client.post(config.ts_url, args, function () {
            callback("AddedEvent");
        });
    };

    return module;
};