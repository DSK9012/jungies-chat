const http=require('http');
const express=require('express');
const { Server }=require('socket.io');
const cors=require('cors');
const app=express();

app.use(cors());

const httpServer=http.createServer(app);
const io=new Server(httpServer, {
  allowUpgrades:true,
  transports:["polling", "websocket"],
});

app.use('/', (req, res)=>{
  res.send('Chat Server');
});

io.of('/socket/one2one').on('connection', (socket)=>{

  socket.on('sendMessage', (msg)=>{
    
    console.log(socket.conn.transport.name, msg);
    socket.conn.on('upgrade', () => {
      const upgradedTransport = socket.conn.transport.name; // in most cases, "websocket"
      console.log(upgradedTransport);
    });
  });

});

httpServer.listen(5000, ()=>{
  console.log('Chat app listening on 5000');
});