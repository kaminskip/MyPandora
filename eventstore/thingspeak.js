module.exports = function (config) {

    var ThingSpeakClient = require('thingspeakclient');
    var client = new ThingSpeakClient();

    for (var topic in config.topic) {
        client.attachChannel(config.topic[topic].ts_channel_id, {writeKey : config.topic[topic].ts_write_key}, function (data) {
            console.log("ThingSpeak channel attached: " + topic + " (" + config.topic[topic].ts_channel_id + ")");
        });
    }

    module.storeEvent = function (event, callback) {
        client.updateChannel(event.ts.channel_id, event.ts.data, function(err, resp) {
            if (err){
                process.stderr.write(err);
                callback(err);
                return;
            }
            if (resp <= 0){
                process.stderr.write("Not updated response: " + resp);

            }
            callback(resp);
        });
    };

    return module;
};