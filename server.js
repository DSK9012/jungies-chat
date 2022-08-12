const http=require('http');
const express=require('express');
const { Server }=require('socket.io');
const cors=require('cors');
const app=express();

app.use(cors());

app.use('/', (req, res)=>{
  res.send('Chat Server');
});

const httpServer=http.createServer(app);
const io=new Server(httpServer, {
  allowUpgrades:true,
  transports:["polling", "websocket"],
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.of('/socket/one2one').on('connection', (socket)=>{
  console.log(socket.id);
  
  socket.on('sendMessage', (msg)=>{    
    console.log(socket.conn.transport.name, msg);
    console.log(socket.id);
    socket.conn.on('upgrade', () => {
      const upgradedTransport = socket.conn.transport.name; // in most cases, "websocket"
      console.log(upgradedTransport);
    });
    socket.to('RAPqH_kGnFtT01xlAAAF').emit('receiveMessage', 'kiran');
  });

});

httpServer.listen(5000, ()=>{
  console.log('Chat app listening on 5000');
});