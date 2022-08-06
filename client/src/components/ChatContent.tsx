import { styled } from '@mui/material';
import Chat from './Chat';
import ChatInput from './ChatInput';
import UserChatHeader from './UserChatHeader';

const $Container = styled('div')(({ theme }) => ({
  height: '90%',
  width: '100%',
  backdropFilter: 'blur(50px)',
  backgroundColor: 'rgb(255,255,255, 0.1)',
  border: '1px solid rgb(255,255,255, 0.6)',
  borderRightColor: 'rgb(255,255,255, 0.2)',
  borderBottomColor: 'rgb(255,255,255, 0.2)',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export default function ChatContent() {
  return (
    <$Container>
      <UserChatHeader />
      <Chat />
      <ChatInput />
    </$Container>
  );
}
