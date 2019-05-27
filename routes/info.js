const express = require('express');
const RedisClient = require('../services/redis-client');
const router = express.Router();

/**
 * Check Health of application
 */
router.route('/health').get((req, res) => {
    return res.send({state:'UP'});
});

/**
 * Get mocks file
 */
router.route('/mocks').get(async (req, res) => {
    const data = await RedisClient.getAsync("mocks");
    return res.send({"loaded" : JSON.parse(data)});
});

module.exports = router;
