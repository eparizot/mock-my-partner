const express = require('express');
const router = express.Router();
const fileImportService = require('../services/file-import-service');

/** Generation of routes from the FileImportService */
const FileImportService = new fileImportService();
module.exports = FileImportService.init(router);
