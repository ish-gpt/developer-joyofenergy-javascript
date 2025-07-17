const { pricePlans } = require("./price-plans");
const { usageForAllPricePlans } = require("../../services/usage/usage");
const { readingsData } = require('../readings/readings.data');
const { readings } = require("../readings/readings");
const { getReadings, setReadings } = readings(readingsData);
const responseHandler = require('../../utils/responseHandler');

const recommend = (req, res) => {
    try {
        const meter = req.params;
        const limit = req.query.limit;
        const pricePlanComparisons = getRecommendedPricePlan(meter, getReadings, limit);
        responseHandler.send(null,req,res,pricePlanComparisons)
    } catch (error) {
        responseHandler.send(error, req, res, null);
    }
    
};

const extractCost = (cost) => {
    const [, value] = Object.entries(cost).find( ([key]) => key in pricePlans)
    return value
}

const compare = (req, res) => {
    try {
        const meter = req.params;
        const pricePlanComparisons = getPricePlanComparision(meter, getReadings)
        const response = {
            smartMeterId: req.params.smartMeterId,
            pricePlanComparisons,
        }
        responseHandler.send(null, req, res, response);
    } catch (error) {
        responseHandler.send(error, req, res, null);
    }
};

const getPricePlanComparision = (meter, getReadings) => {
    const meterId = meter.smartMeterId;
    const readings = getReadings(meterId);
    return usageForAllPricePlans(pricePlans, readings);
}

const getRecommendedPricePlan = (meter, getReadings, limit) => {
    const meterId = meter.smartMeterId;
    const readings = getReadings(meterId);
    const recommendedPlans = usageForAllPricePlans(pricePlans, readings).sort((a, b) => extractCost(a) - extractCost(b))
    return limit ? recommendedPlans.slice(0, limit) : recommendedPlans;
}

module.exports = { recommend, compare, getPricePlanComparision, getRecommendedPricePlan };
