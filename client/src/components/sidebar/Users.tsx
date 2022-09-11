/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/material';
import sai from 'assets/sai.jpg';
import { useStore } from 'store/Store';
import { IUser } from 'store/UserStore';

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

interface IProps {
  searchMode: boolean;
  searchText: string;
  handleClose: () => void;
}

export default function Users({ searchMode, searchText, handleClose }: IProps) {
  const {
    userContext: { searchedUsers, selectedUser, setSelectedUser, setUserInfo, userInfo },
  } = useStore();

  const handleSelectNewUser = (user: IUser) => {
    setUserInfo((prevState) => {
      const selectedUserInfo = {
        ...user,
        lastMessage: '',
        chatId: '',
        userId: prevState._id,
        contactUserId: user._id,
        unreadNotifications: 0,
      };
      const contacts = [selectedUserInfo, ...prevState.contacts];
      setSelectedUser({ ...selectedUserInfo, messages: [] });
      return { ...prevState, contacts };
    });
    handleClose();
  };

  const handleSelectUser = (user: IUser) => {};

  if (searchMode) {
    return (
      <>
        {searchText && (
          <$SearchingText>
            Searching for <b>&apos;{searchText}&apos;</b>
          </$SearchingText>
        )}
        <$Container>
          {searchedUsers.length === 0 ? (
            <$NoUserFound>No users found</$NoUserFound>
          ) : (
            searchedUsers.map((user) => (
              <$UserContainer onClick={() => handleSelectNewUser(user)}>
                <$UserImage src={`http://localhost:5000/api/user/avatar/${user._id}`} width='50px' height='50px' />
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

  return (
    <$Container>
      {userInfo.contacts.map((user) => (
        <$UserContainer
          className={selectedUser && user._id === selectedUser._id ? 'selected' : ''}
          onClick={() => handleSelectUser(user)}
        >
          <$UserImage src={`http://localhost:5000/api/user/avatar/${user._id}`} width='50px' height='50px' />
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
