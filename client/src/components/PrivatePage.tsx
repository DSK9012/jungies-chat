import { useEffect } from 'react';
import ChatContent from 'components/Chat/ChatContent';
import UsersList from 'components/sidebar/Sidebar';
import { socket } from 'helpers/socket';
import { useStore } from 'store/Store';
import { IMessage } from 'helpers/types';

const PrivatePage = () => {
  const {
    userContext: { setSelectedUser, dispatch },
  } = useStore();

  useEffect(() => {
    socket.auth = { token: localStorage.getItem('token') };
    socket.connect();

    socket.on('connect', () => console.log('Connected'));

    socket.on('contacts', (contacts) => console.log(contacts));
    socket.on('new-contact-updated', (data) => {
      setSelectedUser((prevState) => {
        if (prevState) {
          const msgs = [...prevState.messages.data];
          const msgIndex = msgs.findIndex((msg) => !msg.chatId);
          msgs[msgIndex].id = data.newMessage._id;
          msgs[msgIndex].chatId = data.newMessage.chatId;
          msgs[msgIndex].status = data.newMessage.status;
          const user = {
            ...prevState,
            id: data.newContact._id,
            messages: {
              ...prevState.messages,
              data: msgs,
            },
          };
          dispatch({
            type: 'UPDATE_CONTACT',
            payload: user,
          });
          return user;
        }

        return prevState;
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
