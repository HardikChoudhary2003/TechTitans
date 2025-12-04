const express = require('express');
const router = express.Router();
const {
    getHealthInfo,
    getFacilities,
} = require('../controllers/publicController');

router.get('/info', getHealthInfo);
router.get('/facilities', getFacilities);

module.exports = router;
