var MapEvent = function () {};

MapEvent.prototype.tempMsg = function (topic, jsonData) {
    var out = {};
    var ed = new Date(Date.parse(jsonData.data));
    out.device = topic;
    out.event_type = 'get';
    out.device_type = 'temp_sensor';
    out.value = parseFloat(jsonData.temp) / 1000;
    out.date = ed.toISOString();
    return JSON.stringify(out);
};

module.exports = new MapEvent();