const { readingsData } = require("./readings.data");
const { readings } = require("./readings");
const { getReadings, setReadings } = readings(readingsData);
const responseHandler = require("../../utils/responseHandler");

const read = (req, res) => { 
    try {
        const meter = req.params;
        const response = getReadingsFromMeterId(meter)
        responseHandler.send(null,req,res,response);
    } catch (error) {
        responseHandler.send(error, req, res, null);
    }
    
};

const store = (req, res) => {
    try {
        const data = req.body;
        setMeterReadings(data)
        responseHandler.send(null, req, res, null); 
    } catch (error) {
        responseHandler.send(error, req, res, null);
    }
}

const getReadingsFromMeterId = (meter) => {
    const meterId = meter.smartMeterId;
    return getReadings(meterId);
}

const setMeterReadings = (data) => {
    setReadings(data.smartMeterId, data.electricityReadings)
}

module.exports = { read, store, getReadingsFromMeterId, setMeterReadings };
