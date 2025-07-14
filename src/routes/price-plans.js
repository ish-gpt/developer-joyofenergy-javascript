const express = require('express');
const pricePlansRouter = express.Router();
const { recommend, compare } = require('../controllers/price-plans/price-plans-controller');

pricePlansRouter.get('/recommend/:smartMeterId', recommend);
pricePlansRouter.get('/compare-all/:smartMeterId', compare);

module.exports = {
    pricePlansRouter
}