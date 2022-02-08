const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/etalonnageControllers');

// gestionAir
router.get('/etalonnageAir', stuffCtrl.etalonnageAir);
router.get('/getValEtalonnageAir', stuffCtrl.getValEtalonnageAir);
router.post('/valeureEtalonnageAir', stuffCtrl.valeureEtalonnageAir);

// gestionSec
router.post('/valeureEtalonnageSec', stuffCtrl.valeureEtalonnageSec);

// gestionHum
router.post('/valeureEtalonnageHum', stuffCtrl.valeureEtalonnageHum);

// gestionSub
router.post('/valeureEtalonnageSub', stuffCtrl.valeureEtalonnageSub);

module.exports = router;
