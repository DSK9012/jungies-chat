require('dotenv').config();
// const { default: chalk } = (async () => await import('chalk'))();
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const serverConfig = require('./serverConfig');
const morgan = require('morgan');
const app = express();

// Allow cors
app.use(cors());

// Http requests logger
app.use(morgan('dev'));

// Intializing express middleware to parse the data in req object
app.use(express.json({ extended: false }));

app.use('/', (req, res) => {
  res.send('Chat Server');
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  allowUpgrades: true,
  transports: ['polling', 'websocket'],
});

io.use((socket, next) => {
  // const username = socket.handshake.auth.username;
  // if (!username) {
  //   return next(new Error("invalid username"));
  // }
  // socket.username = username;
  next();
});

io.of('/socket/one2one').on('connection', (socket) => {
  console.log(io.of('/socket/one2one').sockets.size);
  socket.on('sendMessage', (msg) => {
    socket.conn.on('upgrade', () => {
      const upgradedTransport = socket.conn.transport.name;
    });
  });
});

const serverPort = serverConfig.serverPort;
httpServer.listen(serverPort, () => {
  console.log(`Chat app listening on ${serverPort}`);
});
