const http = require('http');
require('dotenv').config();
const app = require('./app');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

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

  // console.log(
  //   '\x1b[32m',
  //   '[ NODE SERVER      ] Le serveur est démarré sur le http://localhost:' +
  //     bind
  // );
  console.log(`Le serveur est démarré sur : http://localhost:${port}/`);
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

  //* Etalonnage Air

  socket.on('etalonnageAir', function (arg) {
    // console.log('\x1b[35m', '[ SOCKET IO        ] etalonnageAir : ', arg);
    socket.broadcast.emit('etalonnageAir', arg);
  });

  //* ---------------------------------------------------

  //* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  GESTION HUMIDITE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

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

  //* Etalonnage Substrat.

  socket.on('etalonnageSub', function (arg) {
    // console.log('\x1b[35m', '[ SOCKET IO        ] etalonnageSub : ', arg);
    socket.broadcast.emit('etalonnageSub', arg);
  });

  //* ---------------------------------------------------
});

server.listen(port);
