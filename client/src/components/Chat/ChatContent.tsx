import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import noUserSelected from 'assets/no-user-selected.svg';
import ChatInput from 'components/ChatInput';
import UserChatHeader from 'components/UserChatHeader';
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
    userContext: { selectedUser },
  } = useStore();

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