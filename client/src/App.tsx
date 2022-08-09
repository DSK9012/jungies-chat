import { styled } from '@mui/material';
import { useEffect } from 'react';
import io from 'socket.io-client';
import ChatContent from 'components/ChatContent';
import UsersList from 'components/UsersList';

const $Container = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: 'white',
  position: 'relative',
}));

const $Content = styled('div')(({ theme }) => ({
  height: '90%',
  width: '85%',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '99',
}));

const $Header = styled('h3')(() => ({
  fontSize: '40px',
  fontFamily: 'Oleo Script Swash Caps, cursive',
  color: '#fff',
  textShadow: '0 0 5px  #47e7e7, 0 0 10px #47e7e7, 0 0 20px #47e7e7, 0 0 40px #47e7e7, 0 0 80px #47e7e7',
}));

const $GlassCircleGradient1 = styled('span')(() => ({
  position: 'absolute',
  width: '200px',
  height: '200px',
  background: 'linear-gradient(#32b8a2fa, #ffaa00, #ed5b09)',
  borderRadius: '50%',
  top: '-1%',
  left: '2%',
}));

const $GlassCircleGradient2 = styled('span')(() => ({
  position: 'absolute',
  width: '200px',
  height: '200px',
  background: 'linear-gradient(#b25019, #3bac7ea1, #070e0dfa)',
  borderRadius: '50%',
  bottom: '-10%',
  left: '25%',
}));

const $GlassCircleGradient3 = styled('span')(() => ({
  position: 'absolute',
  width: '200px',
  height: '200px',
  background: 'linear-gradient(#f07f00, #03f9abbf, #337f5c)',
  borderRadius: '50%',
  right: '-2%',
  top: '5%',
}));

function App() {
  useEffect(() => {
    const socket = io('ws://localhost:5000/socket/one2one');
    socket.on('connect', () => {
      const transport = socket.io.engine.transport.name; // in most cases, "polling"
      console.log(transport);
      socket.io.engine.on('upgrade', () => {
        const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
        console.log(upgradedTransport);
      });
      localStorage.debug = '*';
    });

    socket.emit('sendMessage', 'sai');
    socket.emit('sendMessage', 'sai1');
    socket.emit('sendMessage', 'sai2');
  }, []);

  return (
    <$Container>
      <$GlassCircleGradient1 />
      <$GlassCircleGradient2 />
      <$GlassCircleGradient3 />
      <$Header>Jungies Chat</$Header>
      <$Content>
        <UsersList />
        <ChatContent />
      </$Content>
    </$Container>
  );
}

export default App;
