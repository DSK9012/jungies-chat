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

    socket.on('user/update-new-contact', (data) => {
      dispatch({
        type: 'UPDATE_NEW_CONTACT',
        payload: data,
      });
    });

    socket.on('user/other-tab/update-new-contact', (data) => {
      dispatch({
        type: 'ADD_NEW_CONTACT',
        payload: data,
      });
    });

    socket.on('contact/add-new-contact', (data, callback) => {
      dispatch({
        type: 'ADD_NEW_CONTACT',
        payload: data,
      });
      callback();
    });

    socket.on('user/message-sent', (newMessage) => {
      dispatch({
        type: 'MESSAGE_SENT',
        payload: newMessage,
      });
    });

    socket.on('user/other-tab/message', (message) => {
      dispatch({
        type: 'MESSAGE',
        payload: message,
      });
    });

    socket.on('contact/message', (message, callback) => {
      console.log(message, callback);
      dispatch({
        type: 'MESSAGE',
        payload: message,
      });
      // callback();
    });

    socket.on('user/message-delivered', (newMessage) => {
      dispatch({
        type: 'MESSAGE_DELIVERED',
        payload: newMessage,
      });
    });

    socket.on('user/other-tab/message-delivered', (newMessage) => {
      dispatch({
        type: 'MESSAGE_DELIVERED',
        payload: newMessage,
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
