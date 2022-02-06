const http = require('http');
require('dotenv').config();
const app = require('./app');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

require('dotenv').config();

// const etalonnageAir = require('/home/pi/Desktop/champiBack/gestion/gestionAir/etalonnageAir.js');
// const etalonnageHum = require('/home/pi/Desktop/champiBack/gestion/gestionHum/etalonnageHum.js');
// const etalonnageSec = require('/home/pi/Desktop/champiBack/gestion/gestionHum/etalonnageSec.js');
// const etalonnageSub = require('/home/pi/Desktop/champiBack/gestion/gestionSubstrat /etalonnageSub.js');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);

server.on('listening', () => {
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port ' + `${port}`;

  console.log(
    '\x1b[32m',
    '[ NODE SERVER      ] Le serveur est démarré sur le ' + bind
  );
});

process.on('warning', (e) =>
  console.warn('\x1b[33m', '[ LES WARNING ]', e.stack)
);

//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  GESTION DU SERVER SOCKET IO ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  //
  console.log(
    '\x1b[35m',
    "[ SOCKET IO        ] Le serveur Socket.io est connecté avec l'id : ",
    socket.id
  );

  socket.on('disconnect', () => {
    console.log(
      '\x1b[35m',
      "[ SOCKET IO        ] ⚠️ Le serveur Socket.io est déconnecté avec l'id : ",
      socket.id
    );
  });

  //* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  GESTION AIR ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

  //* Affichage gestionAir.

  socket.on('affichageTemperatureAir', function (arg) {
    // console.log(
    //   '\x1b[35m',
    //   '[ SOCKET IO        ] affichage des valeures gestionAir : ',
    //   arg
    // );
    socket.broadcast.emit('affichageTemperatureAir', arg);
  });

  //* ---------------------------------------------------

  //* Etalonnage Air

  socket.on('etalonnageAir', function (arg) {
    // console.log('\x1b[35m', '[ SOCKET IO        ] etalonnageAir : ', arg);
    socket.broadcast.emit('etalonnageAir', arg);
  });

  //* ---------------------------------------------------

  //* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  GESTION HUMIDITE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

  //* Affichage gestionHum

  socket.on('affichageTauxHumidite', function (arg) {
    // console.log(
    //   '\x1b[35m',
    //   '[ SOCKET IO        ] affichage des valeures gestionHum : ',
    //   arg
    // );
    socket.broadcast.emit('affichageTauxHumidite', arg);
  });

  //* ---------------------------------------------------

  //* Etalonnage Sec

  socket.on('etalonnageSec', function (arg) {
    // console.log('\x1b[35m', '[ SOCKET IO        ] etalonnageSec : ', arg);
    socket.broadcast.emit('etalonnageSec', arg);
  });

  //* ---------------------------------------------------

  //* Etalonnage hum

  socket.on('etalonnageHum', function (arg) {
    // console.log('\x1b[35m', '[ SOCKET IO        ] etalonnageHum : ', arg);
    socket.broadcast.emit('etalonnageHum', arg);
  });

  //* ---------------------------------------------------

  //* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  GESTION CO2 ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

  //* Affichage gestionCo2.

  socket.on('affichageTauxCo2', function (arg) {
    console.log(
      '\x1b[35m',
      '[ SOCKET IO        ] affichage des valeures gestionCo2 : ',
      arg
    );
    socket.broadcast.emit('affichageTauxCo2', arg);
  });

  //* ---------------------------------------------------

  //* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  GESTION SUBSTRAT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

  //* Etalonnage Substrat.

  socket.on('etalonnageSub', function (arg) {
    // console.log('\x1b[35m', '[ SOCKET IO        ] etalonnageSub : ', arg);
    socket.broadcast.emit('etalonnageSub', arg);
  });

  //* ---------------------------------------------------

  //* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  GESTION OUTIL ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

  //* Relay eau au sol OFF.

  socket.on('gestionRelay', function (arg) {
    // console.log('\x1b[35m', '[ SOCKET IO        ] gestionRelay est : ', arg);
    socket.broadcast.emit('gestionRelay', arg);
  });

  //* ---------------------------------------------------
});

server.listen(port);
