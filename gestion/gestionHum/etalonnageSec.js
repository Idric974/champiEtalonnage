// Les constantes

const mcpadc = require('mcp-spi-adc');
const bleu = '\x1b[34m';
const io = require('socket.io-client');
//-------------------------------------

// Les variables.

let mcpBroche = 0; // Broche 2.
let temperatureMoyenneAir;
//-------------------------------------

// Les tableaux.

listValSec = [];
//-------------------------------------

// Initialisation socket.io Client

const socket = io('http://localhost:3001', {
  reconnection: true,
});

socket.on('connect', () => {
  console.log(
    bleu,
    '[ SOCKET IO        ] Client Etalonnage Gestion Sec connecté',
    socket.id
  );
});
//-----------------------------------------------------------

// Calcule de la temprature.

// Fonction moyenne
function ArrayAvg(listValSec) {
  let i = 0,
    summ = 0,
    ArrayLen = listValSec.length;
  while (i < ArrayLen) {
    summ = summ + listValSec[i++];
  }
  return summ / ArrayLen;
}
// FIN Fonction moyenne

//------------------------------------------------------------

setInterval(() => {
  let calculeTemperatureEtalonnage = () => {
    return new Promise((resolve) => {
      // Compteur.
      let temps = 0;

      let count = () => {
        temps = temps++;
        //console.log(temps++);
        if (temps++ === 9) {
          clearInterval(conteur);
        }

        // FIN Compteur.

        // Ma fonction.
        const tempSensor = mcpadc.open(mcpBroche, { speedHz: 20000 }, (err) => {
          if (err) throw err;

          tempSensor.read((err, reading) => {
            if (err) throw err;
            listValSec.push(reading.value * 40);
            // console.log(jaune, '[ GESTION AIR      ] listValSec', listValSec);
          });
        });
        // FIN Ma fonction.
      };
      setTimeout(() => {
        resolve(ArrayAvg(listValSec));
      }, 900);

      let conteur = setInterval(count, 70);
    });
  };

  let resultats = async () => {
    temperatureMoyenneAir = await calculeTemperatureEtalonnage();

    return temperatureMoyenneAir;
  };

  resultats()
    .then((temperatureMoyenneAir) => {
      // Calcule de la température.
      // console.log(
      //   bleu,
      //   '[ GESTION AIR      ] Temperature Moyenne Sec : ',
      //   temperatureMoyenneAir
      // );
    })
    .then(() => {
      // Transmission des données au serveur socket Io.
      let valeureEtalonnageSec = parseFloat(temperatureMoyenneAir).toFixed(2);

      socket.emit('etalonnageSec', {
        etalonnageSec: valeureEtalonnageSec,
      });
      //-------------------------------------
    })
    .then(() => {
      listValSec = [];
    });
  //------------------------------------------------------------
}, 1000);
