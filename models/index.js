const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD_CR,
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      '\x1b[32m',
      '[ NODE SERVER      ] Connexion à la base de données OK 😃'
    );
  })

  .catch((err) => {
    console.log(
      '\x1b[32m',
      '[ NODE SERVER      ] Connexion à la base de données ❌❌ échouée ❌❌',
      err
    );
  });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//* GestionAir

// Etalonnage.
db.etalonnageAir = require('./gestionAir/gestionAirEtalonnageModels')(
  sequelize,
  Sequelize
);
//* -----------------------------------------------------------------

//* Gestion Humidité.

// Etalonnage.
db.etalonnageSec = require('./gestionHum/gestionHumEtalonnageSecModels')(
  sequelize,
  Sequelize
);

db.etalonnageHum = require('./gestionHum/gestionHumEtalonnageHumModels')(
  sequelize,
  Sequelize
);
//* -----------------------------------------------------------------

//* Gestion Substrat.

// Etalonnage.
db.etalonnageSub = require('./gestionSub/gestionSubEtalonnageModels')(
  sequelize,
  Sequelize
);
//* -----------------------------------------------------------------

module.exports = db;
