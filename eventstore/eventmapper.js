module.exports = function (config) {

    module.tempEvent = function (jsonString) {
        var json = JSON.parse(jsonString);
        var topic = config.topic.salonTemp;
        var out = {};
        out.device = topic.id;
        out.event_type = 'get';
        out.device_type = 'temp_sensor';
        out.value = parseFloat(json.temp) / 1000;
        out.date = json.data;
        out.ts = {channel_id: topic.ts_channel_id, data: {field1: out.value}};
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