const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//! Etalonnage
const etalonnageRoutes = require('./routes/etalonnageRoutes');

//! Utilisation de cors pour les connexions
const cors = require('cors');
app.use(cors());

//! Header pour les Cross Origine
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//! Module de connexion à la base de données.
const db = require('./models');
db.sequelize.sync({
  force: false,
});

//! Lancement des fichiers étalonnage.
const etalonnageAir = require('/home/pi/Desktop/champiBack/gestion/gestionAir/etalonnageAir.js');
const etalonnageHum = require('/home/pi/Desktop/champiBack/gestion/gestionHum/etalonnageHum.js');
const etalonnageSec = require('/home/pi/Desktop/champiBack/gestion/gestionHum/etalonnageSec.js');
const etalonnageSub = require('/home/pi/Desktop/champiBack/gestion/gestionSubstrat /etalonnageSub.js');

//! Utilisation de body parser
app.use(bodyParser.json());

//! Liste des routes.
const genererPageAccueil = require('/home/pi/Desktop/champiEtalonnage/pages/index-get.js');

app.get('/', async (req, res) => {
  const indexHtml = await genererPageAccueil();

  res.send(indexHtml);
});

//! Les images.
app.use('/images', express.static('/home/pi/Desktop/champiEtalonnage/images'));

//! Le CSS.
app.use('/styles', express.static('/home/pi/Desktop/champiEtalonnage/styles'));

//! La logique js
app.use(
  '/logiques',
  express.static('/home/pi/Desktop/champiEtalonnage/logiques')
);

//! Etalonnage
app.use('/api/etalonnageRoutes', etalonnageRoutes);

module.exports = app;
