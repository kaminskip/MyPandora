var MapEvent = function () {};

MapEvent.prototype.tempMsg = function (topic, data) {
    var out = {}
    var ed = Date.parse(data.data)
    console.log(data.data)
    console.log(ed.year)
    out.date = {}
    out.device = topic
    out.event_type = 'get'
    out.device_type = 'temp_sensor'
    out.value = parseFloat(data.temp) / 1000
    out.unit = 'C'
    //out.date.year = ed.getYear()
    return out
};

module.exports = new MapEvent();