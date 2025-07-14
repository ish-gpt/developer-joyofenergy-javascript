const { pricePlans } = require("./price-plans");
const { usageForAllPricePlans } = require("../../services/usage/usage");
const { readingsData } = require('../readings/readings.data');
const { readings } = require("../readings/readings");
const { getReadings, setReadings } = readings(readingsData);

const recommend = (req, res) => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getReadings(meter)).sort((a, b) => extractCost(a) - extractCost(b))
    if("limit" in req.query) {
        res.send(pricePlanComparisons.slice(0, req.query.limit))
    }
    res.send(pricePlanComparisons)
};

const extractCost = (cost) => {
    const [, value] = Object.entries(cost).find( ([key]) => key in pricePlans)
    return value
}

const compare = (req, res) => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getReadings(meter));
    res.send({
        smartMeterId: req.params.smartMeterId,
        pricePlanComparisons,
    })
};

module.exports = { recommend, compare };
