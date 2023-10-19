const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/generate-csv-report', reportController.generateCSVReport);

module.exports = router;
