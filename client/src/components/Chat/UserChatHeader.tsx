import { styled } from '@mui/material';
import { useStore } from 'store/Store';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  // width: '100%',
  padding: '8px 16px',
}));

const $UserImage = styled('img')(() => ({
  borderRadius: '50%',
}));

const $UserInfo = styled('div')(() => ({
  marginLeft: '16px',
  flex: 1,
  overflow: 'hidden',
}));

const $UserName = styled('h4')(() => ({
  fontSize: '18px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const $LastMessage = styled('p')(() => ({
  fontSize: '12px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  // width: '90%',
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
      <div>
        <$UserImage
          src={`http://localhost:5000/api/user/avatar/${selectedUser.contactUserId}`}
          width='50px'
          height='50px'
        />
      </div>
      <$UserInfo>
        <$UserName>{selectedUser.name}</$UserName>
        <$LastMessage>{selectedUser.lastMessage}</$LastMessage>
      </$UserInfo>
    </$Container>
  );
}
