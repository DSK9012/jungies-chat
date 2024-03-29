import { useRef, useEffect } from 'react';
import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import { ReactComponent as StartChatImg } from 'assets/start-chat.svg';
import RenderMessage from './RenderMessage';
import RenderChatSkelton from './RenderChatSkelton';
import RenderChatDate from './RenderChatDate';

const $Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '70%',
  height: '100%',
  padding: '4px 0',
  margin: '0 auto',
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
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    userContext: { selectedUser },
  } = useStore();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight });
    }
  }, [selectedUser]);

  if (!selectedUser?.messages?.data.length) {
    return (
      <$StartChatContainer>
        <StartChatImg width='400px' height='400px' />
        <$NoContactsText>Say &quot;Hi&quot; to your friend</$NoContactsText>
      </$StartChatContainer>
    );
  }

  return (
    <$Container ref={containerRef}>
      {/* {selectedUser?.messages.isLoading && <RenderChatSkelton />} */}
      {selectedUser?.messages.data.map((message, index, messages) => (
        <>
          <RenderChatDate index={index} messages={messages} />
          <RenderMessage message={message} />
        </>
      ))}
    </$Container>
  );
}
