const crypto = require('crypto');
const RedisClient = require('./redis-client');
const RequestBo = require('./bo/request-bo');

/** Generate a route */
const generateRoute = function(app, mock) {
    const url = mock.uri;
    if (mock.type === 'POST') {
        app.post(mock.uri, async (req, res) => { getRouteResponse(req, res, url) });
    } else if (mock.type === 'GET') {
        app.get(mock.uri, async (req, res) => { getRouteResponse(req, res, url) });
    } else if (mock.type === 'DELETE') {
        app.delete(mock.uri, async (req, res) => { getRouteResponse(req, res, url) });
    } else if (mock.type === 'PUT') {
        app.put(mock.uri, async (req, res) => { getRouteResponse(req, res, url) });
    }
};

/** Get response of a route from redis */
const getRouteResponse = async function(req, res, uri) {
    const rawData = await RedisClient.getAsync(createKeyFromWS(req, uri));
    return res.json(JSON.parse(rawData));
};

/** create key for redis from WS request */
const createKeyFromWS = function(req, uri) {
    const key = new RequestBo(req, uri, req.method);
    return generateHashedKey(key);
};

/** create key for redis from file input */
const createKeyFromFile = function(mockBo) {
    const key = new RequestBo(mockBo.request, mockBo.uri, mockBo.type);
    return generateHashedKey(key);
};

/** generate hashed key for redis */
const generateHashedKey = function(request) {
    return crypto.createHash('md5').update(JSON.stringify(request)).digest('hex');
};

module.exports = {
    generateRoute,
    createKeyFromFile,
    createKeyFromWS
};
