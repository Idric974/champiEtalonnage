const io = require('socket.io-client');

const socket = io('http://localhost:3001', {
  reconnection: true,
  reconnectionDelay: 2000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

socket.on('connect', () => {
  console.log('Client Etalonnage connecté', socket.id);
});

socket.on('disconnect', () => {
  console.log('Client Etalonnage déconnecté');
});

socket.on('etalonnageAir', (msg) => {
  console.log('Etalonnage Air :', msg.etalonnageAir);
});
