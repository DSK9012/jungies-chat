import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import startChat from 'assets/start-chat.svg';
import RenderChatSkelton from './RenderChatSkelton';

const $Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '4px 16px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const $Message = styled('div')(() => ({
  border: '2px solid #47e7e7',
  padding: '10px 16px',
  margin: '0 auto 8px',
  backgroundColor: '#47e7e70d',
  color: '#47e7e7',
  borderRadius: '5px',
  fontSize: '14px',
  width: 'fit-content',
  maxWidth: '60%',
  '&.left': {
    marginLeft: '0',
  },
  '&.right': {
    marginRight: '0',
  },
}));

export const $MsgTime = styled('sub')(({ theme }) => ({
  marginLeft: '6px',
  fontSize: '13px',
  textAlign: 'right',
}));

const $StartChatContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

const $NoContactsText = styled('h4')(() => ({
  color: '#a7b0b6',
  marginTop: '8px',
}));

export default function Chat() {
  const {
    userContext: {
      userInfo: { id },
      selectedUser,
    },
  } = useStore();

  if (!selectedUser?.messages?.data.length) {
    return (
      <$StartChatContainer>
        <img src={startChat} alt='start-chat' width='400px' height='400px' />
        <$NoContactsText>Say &quot;Hi&quot; to your friend</$NoContactsText>
      </$StartChatContainer>
    );
  }

  return (
    <$Container>
      {selectedUser?.messages.isLoading && <RenderChatSkelton />}
      {selectedUser?.messages.data.map((message) => (
        <$Message className={message.sentBy.userId === id ? 'right' : 'left'}>
          {message.message}
          <$MsgTime>{message.createdAt}</$MsgTime>
        </$Message>
      ))}
    </$Container>
  );
}