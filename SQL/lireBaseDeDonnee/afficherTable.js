const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'idric',
  password: 'Kup33uC4W6',
  database: 'champyresi',
});

//* gestionAir.

// let table = 'gestion_airs';
// let table = 'gestion_airs_datas';
// let table = 'gestion_airs_etalonnages';
// let table = 'gestion_airs_etat_relays';

//* gestion Co2

// let table = 'gestion_co2s';
// let table = 'gestion_co2s_datas';

//* gestion Hummidité.

let table = 'gestion_hums';
// let table = 'gestion_hums_datas';
// let table = 'gestion_hums_etalonnage_hums';
// let table = 'gestion_hums_etalonnage_secs';

//* gestion Substrat.
// let table = 'gestion_sub_etalonnages';

//* Gestion des Logs
// let table = 'gestion_logs';

//* Gestion des courbes
let table = 'gestion_courbes';

//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
con.connect(function (err) {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL!');
  //

  //* gestion Air

  con.query(
    'SELECT * FROM ' + table + ' WHERE id=(SELECT max(id) FROM ' + table + ')',
    function (err, result) {
      if (err) throw err;
      console.log(result);
    }
  );
});
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖