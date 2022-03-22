// Les constantes

const mcpadc = require('mcp-spi-adc');
const bleu = '\x1b[34m';
const io = require('socket.io-client');
//-------------------------------------

// Les variables.

let mcpBroche = 0; // Broche 2.
let temperatureMoyenneSub;
//-------------------------------------

// Les tableaux.

listValSub = [];
//-------------------------------------

// Initialisation socket.io Client

const socket = io('http://localhost:3001', {
  reconnection: true,
});

socket.on('connect', () => {
  console.log(
    bleu,
    '[ SOCKET IO        ] Client Etalonnage Gestion Sub connecté',
    socket.id
  );
});
//-----------------------------------------------------------

// Calcule de la temprature.

// Fonction moyenne
function ArrayAvg(listValSub) {
  let i = 0,
    summ = 0,
    ArrayLen = listValSub.length;
  while (i < ArrayLen) {
    summ = summ + listValSub[i++];
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
        if (temps++ === 30) {
          clearInterval(conteur);
        }

        // FIN Compteur.

        // Ma fonction.
        const tempSensor = mcpadc.open(mcpBroche, { speedHz: 20000 }, (err) => {
          if (err) throw err;

          tempSensor.read((err, reading) => {
            if (err) throw err;
            listValSub.push(reading.value * 40);
            // console.log(jaune, '[ GESTION AIR      ] listValSub', listValSub);
          });
        });
        // FIN Ma fonction.
      };
      setTimeout(() => {
        resolve(ArrayAvg(listValSub));
      }, 900);

      let conteur = setInterval(count, 70);
    });
  };

  let resultats = async () => {
    temperatureMoyenneSub = await calculeTemperatureEtalonnage();

    return temperatureMoyenneSub;
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
      let valeureEtalonnageSub = parseFloat(temperatureMoyenneSub).toFixed(2);

      socket.emit('etalonnageSub', {
        etalonnageSub: valeureEtalonnageSub,
      });
      //-------------------------------------
    })
    .then(() => {
      listValSub = [];
    });
  //------------------------------------------------------------
}, 1000);
