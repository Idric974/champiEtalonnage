const jaune = '\x1b[33m';
const mcpadc = require('mcp-spi-adc');
const Sequelize = require('sequelize');
const db = require('../models');

//! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ GestionAir ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

// Gestion Air.
const gestionAirEtalonnageModels = db.etalonnageAir;

//* ➖ ➖ ➖ ➖ ➖ ➖ POST Valeure Etalonnage Air➖ ➖ ➖ ➖ ➖ ➖ //

exports.valeureEtalonnageAir = (req, res, next) => {
  const newEtalAir = req.body.valeureEtalonnageAir;

  // console.log('newEtalAir', newEtalAir);

  res.status(200).json({ message: 'Ok valeureEtalonnageAir' });

  const newValEtalAir = gestionAirEtalonnageModels
    .create({
      etalonnageAir: newEtalAir,
    })

    .then(() => {
      console.log(
        jaune,
        '[ GESTION AIR      ] Transfert étalonnage Air réussi : ',
        newEtalAir
      );
    })
    .catch((error) => {
      console.log(
        jaune,
        '[ GESTION AIR      ] Erreur dans le processus de transfert d l étalonnage Air',
        error
      );
    });
};

//* ➖ ➖ ➖ ➖ ➖ ➖ GET Valeure Etalonnage Air ➖ ➖ ➖ ➖ ➖ ➖ //

exports.getValEtalonnageAir = (req, res) => {
  res.status(200).json({ temperatureAir });

  console.log('requete getValEtalonnageAir OK');

  // gestionAirEtalonnageModels
  //   .findOne({
  //     attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'maxid']],
  //     raw: true,
  //   })
  //   .then((id) => {
  //     // console.log('Le dernier id de gestionAir est : ', id);
  //     // console.log(id.maxid);

  //     gestionAirEtalonnageModels
  //       .findOne({
  //         where: { id: id.maxid },
  //       })
  //       .then((temperatureAir) => {
  //         res.status(200).json({ temperatureAir });
  //       });
  //   });
};

//! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ GestionSec ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

// Gestion Sec.
const gestionHumEtalonnageSecModels = db.etalonnageSec;

//* ➖ ➖ ➖ ➖ ➖ ➖ POST Valeure Etalonnage Sec ➖ ➖ ➖ ➖ ➖ ➖ //

exports.valeureEtalonnageSec = (req, res, next) => {
  const newEtalSec = req.body.valeureEtalonnageSec;
  // console.log('newEtalSec', newEtalSec);
  res.status(200).json({ message: 'Ok valeureEtalonnageSec' });

  const newValEtalSec = gestionHumEtalonnageSecModels
    .create({
      etalonnageSec: newEtalSec,
    })

    .then(() => {
      console.log(
        jaune,
        '[ GESTION HUM      ] Transfert étalonnage Sec réussi : ',
        newEtalSec
      );
    })
    .catch((error) => {
      console.log(
        jaune,
        '[ GESTION AIR      ] Erreur dans le processus de transfert d l étalonnage Sec',
        error
      );
    });
};
//

//! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ GestionHum ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

// Gestion Hum.

const gestionHumEtalonnageHumModels = db.etalonnageHum;

//* ➖ ➖ ➖ ➖ ➖ ➖ POST Valeure Etalonnage Hum➖ ➖ ➖ ➖ ➖ ➖ //

exports.valeureEtalonnageHum = (req, res, next) => {
  const newEtalHum = req.body.valeureEtalonnageHum;
  // console.log('newEtalSec', newEtalSec);
  res.status(200).json({ message: 'Ok valeureEtalonnageHum' });

  const newValEtalHum = gestionHumEtalonnageHumModels
    .create({
      etalonnageHum: newEtalHum,
    })

    .then(() => {
      console.log(
        jaune,
        '[ GESTION HUM      ] Transfert étalonnage Hum réussi : ',
        newEtalHum
      );
    })
    .catch((error) => {
      console.log(
        jaune,
        '[ GESTION HUM      ] Erreur dans le processus de transfert d l étalonnage Hum',
        error
      );
    });
};

//! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ GestionSub ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

// Gestion Sub.
const gestionSubEtalonnageModels = db.etalonnageSub;

//* ➖ ➖ ➖ ➖ ➖ ➖ POST Valeure Etalonnage Sub➖ ➖ ➖ ➖ ➖ ➖ //

exports.valeureEtalonnageSub = (req, res, next) => {
  const newEtalSub = req.body.valeureEtalonnageSub;
  // console.log('newEtalSub', newEtalSub);
  res.status(200).json({ message: 'Ok valeureEtalonnageSub' });

  const newValEtalSub = gestionSubEtalonnageModels
    .create({
      etalonnageSub: newEtalSub,
    })

    .then(() => {
      console.log(
        jaune,
        '[ GESTION SUB      ] Transfert étalonnage Sub réussi : ',
        newEtalSub
      );
    })
    .catch((error) => {
      console.log(
        jaune,
        '[ GESTION SUB      ] Erreur dans le processus de transfert d l étalonnage Sub',
        error
      );
    });
};

//! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ GestionOutils ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//* ➖➖➖➖➖➖ Gestion Sonde Température Air ➖➖➖➖➖➖

// Récupération de la température
exports.etalonnageAir = (req, res, next) => {
  // console.log('=========> newEtalAirTemp : OK');

  let mcpBroche = 2; // Broche 2.
  let températureInstantanee;

  const tempSensor = mcpadc.open(mcpBroche, { speedHz: 20000 }, (err) => {
    if (err) throw err;

    tempSensor.read((err, reading) => {
      if (err) throw err;
      // console.log('tempèrature', reading['value']);
      températureInstantanee = parseFloat((reading['value'] * 40).toFixed(2));
      // console.log(températureInstantanee);
      res.status(200).json({ températureInstantanee });
    });
  });
};

//! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
