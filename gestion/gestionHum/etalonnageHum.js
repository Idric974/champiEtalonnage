// Les constantes

const mcpadc = require('mcp-spi-adc');
const bleu = '\x1b[34m';
const io = require('socket.io-client');
//-------------------------------------

// Les variables.

let mcpBroche = 1; // Broche 2.
let temperatureMoyenneAir;
//-------------------------------------

// Les tableaux.

listValHum = [];
//-------------------------------------

// Initialisation socket.io Client

const socket = io('http://localhost:3001', {
  reconnection: true,
});

socket.on('connect', () => {
  console.log(
    bleu,
    '[ SOCKET IO        ] Client Etalonnage gestion Air connecté',
    socket.id
  );
});
//-----------------------------------------------------------

// Calcule de la temprature.

// Fonction moyenne
function ArrayAvg(listValHum) {
  let i = 0,
    summ = 0,
    ArrayLen = listValHum.length;
  while (i < ArrayLen) {
    summ = summ + listValHum[i++];
  }
  return summ / ArrayLen;
}
// FIN Fonction moyenne

//------------------------------------------------------------

setInterval(() => {
  let calculeEtalonnageHum = () => {
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
            listValHum.push(reading.value * 40);
            // console.log(bleu, '[ GESTION AIR      ] listValHum', listValHum);
          });
        });
        // FIN Ma fonction.
      };
      setTimeout(() => {
        resolve(ArrayAvg(listValHum));
      }, 910);

      let conteur = setInterval(count, 80);
    });
  };

  let resultats = async () => {
    temperatureMoyenneAir = await calculeEtalonnageHum();

    return temperatureMoyenneAir;
  };

  resultats()
    .then((temperatureMoyenneAir) => {
      // Calcule de la température.
      // console.log(
      //   bleu,
      //   '[ GESTION AIR      ] Temperature Moyenne Hum : ',
      //   temperatureMoyenneAir
      // );
    })
    .then(() => {
      // Transmission des données au serveur socket Io.
      let valeureEtalonnageHum = parseFloat(temperatureMoyenneAir).toFixed(2);

      socket.emit('etalonnageHum', {
        etalonnageHum: valeureEtalonnageHum,
      });
      //-------------------------------------
    })
    .then(() => {
      listValHum = [];
    });
  //------------------------------------------------------------
}, 1000);
