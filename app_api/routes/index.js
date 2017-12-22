var express = require('express');
var router = express.Router();
var ctrlBuses = require('../controllers/bus');

/* Transports pages */
//router.get('/locations/:myId', ctrlLocations.locationsCreate);
router.get('/transports/:dir', ctrlBuses.transportsListRead);
router.get('/transport/:bus_id', ctrlBuses.transportRead);
router.put('/transport/:bus_id/:late/:speed/:change', ctrlBuses.transportUpdateCameDate);
router.put('/transport/:bus_id/mistake', ctrlBuses.transportUpdateMistake);
router.get('/transport/conf', ctrlBuses.getConf);
//router.get('/location', ctrlLocations.locationInfo);
//router.get('/location/review/new', ctrlLocations.addReview);

/* Other pages */
//router.get('/about', ctrlOthers.about);

module.exports = router;