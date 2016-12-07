module.exports = function () {

    module.tempEvent = function (topic, jsonString) {
        var json = JSON.parse(jsonString);
        var out = {};
        out.device = topic;
        out.event_type = 'get';
        out.device_type = 'temp_sensor';
        out.value = parseFloat(json.temp) / 1000;
        out.date = new Date(json.data);
        return out;
    };

    return module;
};