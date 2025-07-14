const express = require('express');
const readingsRouter = express.Router();
const { read, store } = require('../controllers/readings/readings-controller');

readingsRouter.get('/read/:smartMeterId', read);
readingsRouter.post('/store', store);

module.exports = {
    readingsRouter
}