import { useEffect } from 'react';
import ChatContent from 'components/Chat/ChatContent';
import UsersList from 'components/sidebar/Sidebar';
import { socket } from 'helpers/socket';
import { useStore } from 'store/Store';
import { IContact, IMessage } from 'helpers/types';

const PrivatePage = () => {
  const {
    userContext: {
      selectedUser,
      dispatch,
      userInfo: { contacts },
    },
  } = useStore();

  useEffect(() => {
    socket.auth = { token: localStorage.getItem('token') };
    socket.connect();

    socket.on('connect', () => console.log('Connected'));

    socket.on('contacts', (contacts) => {
      dispatch({
        type: 'GET_CONTACTS',
        payload: contacts,
      });
    });

    socket.on('update-new-contact', (data) => {
      dispatch({
        type: 'UPDATE_NEW_CONTACT',
        payload: data,
      });
    });

    socket.on('add-new-contact', (data) => {
      dispatch({
        type: 'ADD_NEW_CONTACT',
        payload: data,
      });
    });

    socket.on('message-sent', (newMessage, callback) => {
      dispatch({
        type: 'MESSAGE_SENT',
        payload: newMessage,
      });
      callback();
    });

    socket.on('message-delivered', (newMessage) => {
      dispatch({
        type: 'MESSAGE_SENT',
        payload: newMessage,
      });
      // callback();
    });

    socket.on('message', (message) => {
      dispatch({
        type: 'MESSAGE',
        payload: message,
      });
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
