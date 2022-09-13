import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import startChat from 'assets/start-chat.svg';
import Chat from './Chat';
import ChatInput from './ChatInput';
import UserChatHeader from './UserChatHeader';

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

const $StartChatContainer = styled($Container)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
}));

const $NoContactsText = styled('h4')(() => ({
  color: '#a7b0b6',
  marginTop: '8px',
}));

export default function ChatContent() {
  const {
    userContext: { selectedUser },
  } = useStore();

  if (!selectedUser) {
    return (
      <$StartChatContainer>
        <img src={startChat} alt='start-chat' width='400px' height='400px' />
        <$NoContactsText>Select user to start chat</$NoContactsText>
      </$StartChatContainer>
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
