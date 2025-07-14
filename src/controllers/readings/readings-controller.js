const { readingsData } = require("./readings.data");
const { readings } = require("./readings");
const { getReadings, setReadings } = readings(readingsData);

const read = (req, res) => { 
    // (req, res) => {
    //     res.send(read(getReadings, req));
    // }
    const meter = req.params.smartMeterId;
    res.send(getReadings(meter)); // do error handling
};

const store = (req, res) => {
    // (req, res) => {
    //     res.send(store(setReadings, req));
    // }
    const data = req.body;
    res.send(setReadings(data.smartMeterId, data.electricityReadings)) // do error handling
}

module.exports = { read, store };
