var MapEvent = function () {};

MapEvent.prototype.tempMsg = function (topic, data) {
    var out = {}
    var ed = new Date(Date.parse(data.data))
    out.device = topic
    out.event_type = 'get'
    out.device_type = 'temp_sensor'
    out.value = parseFloat(data.temp) / 1000
    out.unit = 'C'
    out.date = {}
    out.date.year = ed.getFullYear()
    out.date.month = ed.getMonth() + 1
    out.date.day = ed.getDate()
    out.date.hour = ed.getHours()
    out.date.min = ed.getMinutes()
    out.date.sec = ed.getSeconds()
    return JSON.stringify(out)
};

module.exports = new MapEvent();