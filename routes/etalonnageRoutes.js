// ⭐⭐⭐⭐⭐⭐ Liste des routes disponibles dans l'application ⭐⭐⭐⭐⭐⭐

const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/etalonnageControllers');

// router.delete('/:id', auth, stuffCtrl.deleteThing);

// Routes étalonnage pour prise de température.
router.get('/etalonnageAir', stuffCtrl.etalonnageAir);

router.post('/valeureEtalonnageAir', stuffCtrl.valeureEtalonnageAir);
router.post('/valeureEtalonnageSec', stuffCtrl.valeureEtalonnageSec);
router.post('/valeureEtalonnageHum', stuffCtrl.valeureEtalonnageHum);
router.post('/valeureEtalonnageSub', stuffCtrl.valeureEtalonnageSub);

module.exports = router;
