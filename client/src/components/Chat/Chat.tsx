import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import startChat from 'assets/start-chat.svg';
import RenderMessage from './RenderMessage';
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
    userContext: { selectedUser },
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
        <RenderMessage message={message} />
      ))}
    </$Container>
  );
}
