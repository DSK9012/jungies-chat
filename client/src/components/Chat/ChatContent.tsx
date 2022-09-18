import { useEffect } from 'react';
import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import noUserSelected from 'assets/no-user-selected.svg';
import ChatInput from 'components/Chat/ChatInput';
import UserChatHeader from 'components/Chat/UserChatHeader';
import { IContact } from 'helpers/types';
import { socket } from 'helpers/socket';
import Chat from './Chat';

const $Container = styled('div')(({ theme }) => ({
  height: '90%',
  width: '100%',
  backdropFilter: 'blur(30px)',
  backgroundColor: 'rgb(255,255,255, 0.1)',
  border: '1px solid rgb(255,255,255, 0.6)',
  borderRightColor: 'rgb(255,255,255, 0.2)',
  borderBottomColor: 'rgb(255,255,255, 0.2)',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const $NoSelectedUserContainer = styled($Container)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
}));

const $NoContactsText = styled('h4')(() => ({
  color: '#a7b0b6',
  marginTop: '8px',
}));

export default function ChatContent() {
  const {
    userContext: { selectedUser, setSelectedUser, dispatch },
  } = useStore();

  useEffect(() => {
    socket.on('message-sent', (newMessage) => {
      let user: Partial<IContact> = {};
      setSelectedUser((prevState) => {
        if (prevState) {
          const msgs = [...prevState.messages.data];
          const msgIndex = msgs.findIndex((msg) => msg.id === '');
          msgs[msgIndex].id = newMessage._id;
          msgs[msgIndex].status = newMessage.status;
          user = {
            ...prevState,
            messages: {
              ...prevState.messages,
              data: msgs,
            },
          };

          return user as IContact;
        }

        return prevState;
      });
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: user as IContact,
      });
    });
  }, []);

  if (!selectedUser) {
    return (
      <$NoSelectedUserContainer>
        <img src={noUserSelected} alt='start-chat' width='400px' height='400px' />
        <$NoContactsText>Select user to start chat</$NoContactsText>
      </$NoSelectedUserContainer>
    );
  }

  return (
    <$Container>
      <UserChatHeader />
      <Chat />
      <ChatInput />
    </$Container>
  );
}
