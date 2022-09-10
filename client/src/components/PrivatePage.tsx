import { useEffect } from 'react';
import ChatContent from 'components/ChatContent';
import UsersList from 'components/UsersList';
import { socket } from 'helpers/socket';

const PrivatePage = () => {
  useEffect(() => {
    socket.auth = { token: localStorage.getItem('token') };
    socket.connect();

    socket.on('connect', () => console.log('Connected'));

    socket.on('contacts', (contacts) => console.log(contacts));

    socket.emit('sendMessage', 'sample message');

    socket.on('receiveMessage', (data: any) => {
      console.log(data);
    });

    socket.on('connect_error', (err) => {
      console.log('Connection Error', err);
    });

    socket.onAny((event, ...args) => {
      console.log('Logger', event, args);
    });
  }, []);

  return (
    <>
      <UsersList />
      <ChatContent />
    </>
  );
};

export default PrivatePage;
