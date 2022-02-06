const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//! Etalonnage
// const etalonnageRoutes = require('./routes/etalonnageRoutes');

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

//! Utilisation de body parser
app.use(bodyParser.json());

//! Socket IO pour html.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//! Liste des routes.

// app.use('/api/etalonnageRoutes', etalonnageRoutes);

module.exports = app;
