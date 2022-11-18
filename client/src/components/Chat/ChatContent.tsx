import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import noUserSelected from 'assets/no-user-selected.svg';
import ChatInput from 'components/Chat/ChatInput';
import UserChatHeader from 'components/Chat/UserChatHeader';
import Chat from './Chat';

const $Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  overflow: 'auto',
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
      <div
        style={{
          height: '90%',
          width: '100%',
          backdropFilter: 'blur(30px)',
          backgroundColor: 'rgb(255,255,255, 0.1)',
          border: '1px solid rgb(255,255,255, 0.6)',
          borderRightColor: 'rgb(255,255,255, 0.2)',
          borderBottomColor: 'rgb(255,255,255, 0.2)',
          borderRadius: '5px',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <$NoSelectedUserContainer>
          <img src={noUserSelected} alt='start-chat' width='400px' height='400px' />
          <$NoContactsText>Select user to start chat</$NoContactsText>
        </$NoSelectedUserContainer>
      </div>
    );
  }

  return (
    <div
      style={{
        height: '90%',
        width: '100%',
        backdropFilter: 'blur(30px)',
        backgroundColor: 'rgb(255,255,255, 0.1)',
        border: '1px solid rgb(255,255,255, 0.6)',
        borderRightColor: 'rgb(255,255,255, 0.2)',
        borderBottomColor: 'rgb(255,255,255, 0.2)',
        borderRadius: '5px',
        flex: 1,
        overflow: 'hidden',
      }}
    >
      <$Container>
        <UserChatHeader />
        <Chat />
        <ChatInput />
      </$Container>
    </div>
  );
}
