module.exports = class MockBo {
    constructor(req, url, type) {
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
        this.uri = url;
        this.type= type;
    }
};
