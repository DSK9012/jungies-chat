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

    socket.on('message-sent', (newMessage) => {
      dispatch({
        type: 'MESSAGE_SENT',
        payload: newMessage,
      });
    });

    socket.on('message', (message: IMessage) => {
      // setSelectedUser((prevState) => {
      //   if (prevState?.messages) {
      //     const messages = [...prevState.messages];
      //     messages.push(message);
      //     return { ...prevState, messages };
      //   }
      //   return prevState;
      // });
      // setUserInfo((prevState) => {
      //   prevState.contacts[0].messages.push(message);
      //   return { ...prevState };
      // });
      console.log(message);
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
