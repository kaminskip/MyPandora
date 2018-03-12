var request = require('request');

module.exports = function (config) {

    module.getLastEvent = function (path, callback) {
        var channelConfig = module.findConfigForPath(path);
        if(channelConfig !== undefined) {
            var channelId = channelConfig.ts_channel_id;
            var readKey = channelConfig.ts_read_key;
            var url = config.serverUrl + '/channels/' + channelId + "/feed/last.json";
            var query = {key: readKey};
            request.get({
                uri: url,
                qs: query,
                json: true
            }, function(err, response, body) {
                callback(body, err);
            });
        } else {
            callback(null, "Cannot find ThingSpeak channel for path: " + path);
        }
    };

    module.findConfigForPath = function (path) {
        for (var name in config.topic) {
            var channelConfig = config.topic[name];
            if(channelConfig.id === path){
                return channelConfig;
            }
        }
    };

    return module;
};