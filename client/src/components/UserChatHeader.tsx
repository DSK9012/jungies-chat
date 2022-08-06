import { styled } from '@mui/material';
import sai from 'assets/sai.jpg';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '8px 16px',
}));

const $UserImage = styled('img')(() => ({
  borderRadius: '50%',
}));

const $UserInfo = styled('div')(() => ({
  marginLeft: '16px',
}));

const $UserName = styled('h4')(() => ({
  fontSize: '18px',
}));

const $LastMessage = styled('p')(() => ({
  fontSize: '12px',
}));

export default function UserChatHeader() {
  return (
    <$Container>
      <$UserImage src={sai} width='50px' height='50px' />
      <$UserInfo>
        <$UserName>Sai</$UserName>
        <$LastMessage>This is the last message</$LastMessage>
      </$UserInfo>
    </$Container>
  );
}
