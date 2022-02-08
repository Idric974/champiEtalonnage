const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/etalonnageControllers');

// gestionAir
router.get('/etalonnageAir', stuffCtrl.etalonnageAir);
router.post('/valeureEtalonnageAir', stuffCtrl.valeureEtalonnageAir);
router.get('/getValEtalonnageAir', stuffCtrl.getValEtalonnageAir);

// gestionSec
router.post('/valeureEtalonnageSec', stuffCtrl.valeureEtalonnageSec);
router.get('/getValEtalonnageSec', stuffCtrl.getValEtalonnageSec);

// gestionHum
router.post('/valeureEtalonnageHum', stuffCtrl.valeureEtalonnageHum);
router.get('/getValEtalonnageHum', stuffCtrl.getValEtalonnageHum);

// gestionSub
router.post('/valeureEtalonnageSub', stuffCtrl.valeureEtalonnageSub);
router.get('/getValEtalonnageSub', stuffCtrl.getValEtalonnageSub);

module.exports = router;
