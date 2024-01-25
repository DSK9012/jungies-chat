import { styled } from '@mui/material';
import { IContact } from 'helpers/types';
import { useStore } from 'store/Store';
import { $UserContainer, $UserImage, $UserInfo, $UserName, $LastMessage } from './Contacts';

interface IRenderContactProps {
  user: IContact;
  handleSelectUser: (user: IContact) => void;
}

const $Notifications = styled('span')(() => ({
  position: 'absolute',
  right: '10px',
  top: '50%',
  backgroundColor: '#47e7e7cc',
  color: 'white',
  borderRadius: '50%',
  fontSize: '14px',
  transform: 'translateY(-50%)',
  minWidth: '25px',
  minHeight: '25px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 6px',
}));

const RenderContact = ({ user, handleSelectUser }: IRenderContactProps) => {
  const {
    userContext: {
      selectedUser,
      userInfo: { _id },
    },
  } = useStore();

  return (
    <$UserContainer
      className={selectedUser && user.contactUserId === selectedUser.contactUserId ? 'selected' : ''}
      onClick={() => handleSelectUser(user)}
    >
      <div>
        <$UserImage src={`http://localhost:4000/api/user/avatar/${user.contactUserId}`} width='50px' height='50px' />
      </div>
      <$UserInfo>
        <$UserName>{user.name}</$UserName>
        <$LastMessage>{user.lastMessage}</$LastMessage>
      </$UserInfo>
      {user.unreadNotifications && user.contactUserId === _id && (
        <$Notifications>{user.unreadNotifications < 99 ? user.unreadNotifications : '99+'}</$Notifications>
      )}
    </$UserContainer>
  );
};

export default RenderContact;
