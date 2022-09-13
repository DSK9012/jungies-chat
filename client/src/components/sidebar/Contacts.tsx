import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import { IContact, IUser } from 'helpers/types';
import noContcats from 'assets/no-contacts.svg';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  overflow: 'auto',
  '&::-webkit-scrollbar-track:hover': {
    display: 'none',
  },
}));

const $UserContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '8px 12px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#67676766',
    backdropFilter: 'blur(100px)',
  },
  '&.selected': {
    backgroundColor: '#676767',
    backdropFilter: 'blur(100px)',
  },
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

const $SearchingText = styled('p')(() => ({
  fontSize: '14px',
  color: ' #c3c3c3',
  padding: '8px 16px',
}));

const $NoUserFound = styled($SearchingText)(() => ({
  marginTop: '64px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const $NoContactsContainer = styled($Container)(() => ({
  justifyContent: 'center',
  height: '70%',
}));

const $NoContactsText = styled('h4')(() => ({
  color: '#a7b0b6',
  marginTop: '16px',
}));

interface IProps {
  searchMode: boolean;
  searchText: string;
  handleClose: () => void;
}

export default function Users({ searchMode, searchText, handleClose }: IProps) {
  const {
    userContext: {
      searchedUsers,
      selectedUser,
      setSelectedUser,
      userInfo: { contacts },
    },
  } = useStore();

  const handleSelectNewUser = (user: IContact) => {
    // setUserInfo((prevState) => {
    //   const selectedUserInfo = {
    //     ...user,
    //     lastMessage: '',
    //     chatId: '',
    //     userId: prevState._id,
    //     contactUserId: user._id,
    //     unreadNotifications: 0,
    //     messages: [],
    //   };
    //   const contacts = [selectedUserInfo, ...prevState.contacts];
    //   setSelectedUser({ ...selectedUserInfo, messages: [] });
    //   return { ...prevState, contacts };
    // });
    handleClose();
  };

  const handleSelectUser = (user: IContact) => {
    // setUserInfo((prevState) => {
    //   const index = prevState.contacts.findIndex((contact) => contact._id === user._id);
    //   prevState.contacts[index] = user;
    //   setSelectedUser({ ...user, messages: [] });
    //   return prevState;
    // });
  };

  if (searchMode) {
    return (
      <>
        {searchText && (
          <$SearchingText>
            Searching for <b>&apos;{searchText}&apos;</b>
          </$SearchingText>
        )}
        <$Container>
          {searchedUsers.data.length === 0 ? (
            <$NoUserFound>No users found</$NoUserFound>
          ) : (
            searchedUsers.data.map((user) => (
              <$UserContainer onClick={() => handleSelectNewUser(user)}>
                <$UserImage src={`http://localhost:5000/api/user/avatar/${user.id}`} width='50px' height='50px' />
                <$UserInfo>
                  <$UserName>{user.name}</$UserName>
                  <$LastMessage />
                </$UserInfo>
              </$UserContainer>
            ))
          )}
        </$Container>
      </>
    );
  }

  if (!contacts.data.length) {
    return (
      <$NoContactsContainer>
        <img src={noContcats} alt='no-contacts' width='180px' height='200px' />
        <$NoContactsText>No contacts</$NoContactsText>
      </$NoContactsContainer>
    );
  }

  return (
    <$Container>
      {contacts.data.map((user) => (
        <$UserContainer
          className={selectedUser && user.id === selectedUser.id ? 'selected' : ''}
          onClick={() => handleSelectUser(user)}
        >
          <$UserImage src={`http://localhost:5000/api/user/avatar/${user.id}`} width='50px' height='50px' />
          <$UserInfo>
            <$UserName>{user.name}</$UserName>
            <$LastMessage>{user.lastMessage}</$LastMessage>
          </$UserInfo>
        </$UserContainer>
      ))}
      {/* <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer>
      <$UserContainer>
        <$UserImage src={sai} width='50px' height='50px' />
        <$UserInfo>
          <$UserName>Sai</$UserName>
          <$LastMessage>This is the last message</$LastMessage>
        </$UserInfo>
      </$UserContainer> */}
    </$Container>
  );
}
