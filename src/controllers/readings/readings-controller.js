const { readingsData } = require("./readings.data");
const { readings } = require("./readings");
const { getReadings, setReadings } = readings(readingsData);

const read = (req, res) => { 
    const meter = req.params;
    const response = getReadingsFromMeterId(meter)
    res.send(response); // do error handling
};

const store = (req, res) => {
    const data = req.body;
    setMeterReadings(data)
    res.send() // do error handling
}

const getReadingsFromMeterId = (meter) => {
    const meterId = meter.smartMeterId;

    return getReadings(meterId);
}

const setMeterReadings = (data) => {
    setReadings(data.smartMeterId, data.electricityReadings)
}

module.exports = { read, store, getReadingsFromMeterId, setMeterReadings };
