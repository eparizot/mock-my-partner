const fs = require('fs');
const MockBo = require('../services/bo/mock-bo');
const MockService = require('../services/mock-service');
const RedisClient = require('../services/redis-client');

module.exports = class FilesImportService {

    constructor() {
        this.dirPath = './mocks/';
        this.filesLoaded = [];
    }

    init(router) {
        fs.readdir(this.dirPath, (err, filenames) => {
            if (err) {
                console.error(err);
            }
            filenames.forEach( (fileName, index) => {
                fs.readFile(this.dirPath.concat(fileName), 'utf-8', (err, content) => {
                    if (err) {
                        console.error(err);
                    }
                    const mock = new MockBo(JSON.parse(content));
                    const key = MockService.createKeyFromFile(mock);
                    RedisClient.setAsync(key, JSON.stringify(mock.response));
                    MockService.generateRoute(router, mock);
                });
                this.filesLoaded.push(fileName);
                console.log(fileName + " loaded");
                if(index === filenames.length-1) {
                    RedisClient.setAsync("mocks", JSON.stringify(this.filesLoaded));
                }
            });
        });
        return router;
    }
};
