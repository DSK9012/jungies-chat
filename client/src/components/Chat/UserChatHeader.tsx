import { Avatar, styled } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useStore } from 'store/Store';
import { getAvatarBgColor } from './helpers';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  // width: '100%',
  padding: '8px 16px',
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
  marginTop: 4,
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
      <Avatar
        src={`http://localhost:4000/api/user/avatar/${selectedUser.contactUserId}`}
        sx={{ width: 45, height: 45, backgroundColor: getAvatarBgColor(selectedUser.name) }}
      >
        {selectedUser?.name?.charAt(0)}
      </Avatar>
      <$UserInfo>
        <$UserName>{selectedUser.name}</$UserName>
        <$LastMessage>Last seen at {format(parseISO(selectedUser.lastActive), 'dd/MM/yyyy h:mm aaa')}</$LastMessage>
      </$UserInfo>
    </$Container>
  );
}
