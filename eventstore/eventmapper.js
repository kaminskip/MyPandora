module.exports = function (config) {

    module.tempEvent = function (jsonString) {
        var json = JSON.parse(jsonString);
        var out = {};
        out.device = config.topic.salonTemp.id;
        out.ts_key = config.topic.salonTemp.ts_key;
        out.event_type = 'get';
        out.device_type = 'temp_sensor';
        out.value = parseFloat(json.temp) / 1000;
        out.date = json.data;
        return out;
    };

    module.getEvent = function (topic, message) {
        switch (topic) {
            case config.topic.salonTemp.id: {
                return module.tempEvent(message.toString());
            }
            default : return null;
        }
    };

    return module;
};