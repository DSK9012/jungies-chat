/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/material';
import sai from 'assets/sai.jpg';
import { useStore } from 'store/Store';

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
  const {
    userContext: { selectedUser },
  } = useStore();
  if (!selectedUser) {
    return <h3>Select user to start chat</h3>;
  }

  return (
    <$Container>
      <$UserImage src={`http://localhost:5000/api/user/avatar/${selectedUser._id}`} width='50px' height='50px' />
      <$UserInfo>
        <$UserName>{selectedUser.name}</$UserName>
        <$LastMessage>{selectedUser.lastMessage}</$LastMessage>
      </$UserInfo>
    </$Container>
  );
}
