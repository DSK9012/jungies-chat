require('dotenv').config();
// const { default: chalk } = (async () => await import('chalk'))();
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const serverConfig = require('./serverConfig');
const morgan = require('morgan');
const app = express();
const connectToMongoDB = require('./DBConnections');
const socketAuth = require('./middlewares/socket-auth-validation');
const { PRIVATE_CHAT } = require('./namespaces');
const contactEntity = require('./routes/contacts/contactEntity');
const { handleMessage } = require('./socket-handlers/handle-message');

// Allow cors
app.use(cors());

// Http requests logger
app.use(morgan('dev'));

// Database Connection
connectToMongoDB();

// Intializing express middleware to parse the data in req object
app.use(express.json({ extended: false }));

app.use('/api', require('./routes/users/usersRouter'));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
  allowUpgrades: true,
  transports: ['polling', 'websocket'],
});

// Socket middleware
io.of(PRIVATE_CHAT).use((socket, next) => {
  socketAuth(socket, next);
});

io.of(PRIVATE_CHAT).on('connection', async (socket) => {
  // Join the user to his associated room
  socket.join(socket.user.id);

  const contacts = await contactEntity.find({ userId: socket.user.id });
  socket.emit('contacts', contacts);
  //  async () => {
  //   try {
  //     // const activeUsers
  //     // for (let [id, socket] of io.of("/").sockets) {
  //     //   console.log(socket.username),
  //     //   if(socket.id===){

  //     //   }
  //     // }
  //     return [{ a: 1 }];
  //   } catch (error) {}
  // });

  socket.on('message', (msg) => {
    console.log(msg);
    handleMessage(socket, msg);
  });
});

const serverPort = serverConfig.serverPort;
httpServer.listen(serverPort, () => {
  console.log(`Chat app listening on ${serverPort}`);
});
