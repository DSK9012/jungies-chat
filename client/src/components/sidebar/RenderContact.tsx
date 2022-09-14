import { IContact } from 'helpers/types';
import { useStore } from 'store/Store';
import { $UserContainer, $UserImage, $UserInfo, $UserName, $LastMessage } from './Contacts';

interface IRenderContactProps {
  user: IContact;
  handleSelectUser: (user: IContact) => void;
}

const RenderContact = ({ user, handleSelectUser }: IRenderContactProps) => {
  const {
    userContext: { selectedUser },
  } = useStore();

  return (
    <$UserContainer
      className={selectedUser && user.contactUserId === selectedUser.contactUserId ? 'selected' : ''}
      onClick={() => handleSelectUser(user)}
    >
      <$UserImage src={`http://localhost:5000/api/user/avatar/${user.contactUserId}`} width='50px' height='50px' />
      <$UserInfo>
        <$UserName>{user.name}</$UserName>
        <$LastMessage>{user.lastMessage}</$LastMessage>
      </$UserInfo>
    </$UserContainer>
  );
};

export default RenderContact;
