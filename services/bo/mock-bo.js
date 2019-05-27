module.exports = class MockBo {
    constructor(data) {
        this.uri = data.uri;
        this.request = data.request;
        this.response = data.response;
        this.type = data.type;
    }
};
