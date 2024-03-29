import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import { IContact } from 'helpers/types';
import { ReactComponent as ErrorImg } from 'assets/error.svg';
import { ReactComponent as NoContactsImg } from 'assets/no-contacts.svg';
import RenderSearchedContacts from './RenderSearchedContacts';
import RenderContactSkelton from './RenderContactSkelton';
import RenderContact from './RenderContact';

export const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  overflow: 'auto',
  '&::-webkit-scrollbar-track:hover': {
    display: 'none',
  },
}));

export const $UserContainer = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '8px 12px',
  cursor: 'pointer',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: '#67676766',
    backdropFilter: 'blur(100px)',
  },
  '&.selected': {
    backgroundColor: '#47e7e71f',
    backdropFilter: 'blur(100px)',
  },
}));

export const $UserImage = styled('img')(() => ({
  borderRadius: '50%',
  objectFit: 'cover',
}));

export const $UserInfo = styled('div')(() => ({
  marginLeft: '16px',
}));

export const $UserName = styled('h4')(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '18px',
  marginBottom: '4px',
  fontWeight: 400,
}));

export const $LastMessage = styled('p')(() => ({
  fontSize: '12px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '250px',
}));

const $SearchingText = styled('p')(() => ({
  fontSize: '14px',
  color: ' #c3c3c3',
  padding: '8px 16px',
}));

export const $NoUserFound = styled($SearchingText)(() => ({
  marginTop: '64px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const $NoContactsContainer = styled($Container)(() => ({
  justifyContent: 'center',
  height: '70%',
}));

export const $NoContactsText = styled('h4')(() => ({
  color: '#a7b0b6',
  marginTop: '16px',
}));

interface IProps {
  searchMode: boolean;
  handleClose: () => void;
}

export default function Users({ searchMode, handleClose }: IProps) {
  const {
    userContext: {
      dispatch,
      userInfo: {
        contacts: { isLoading, hasError, data: contacts },
      },
    },
  } = useStore();

  const handleSelectUser = (user: IContact) => {
    if (!user.messages.data.length) {
      dispatch({ type: 'MESSAGES_LOADING', payload: user });
    }
    dispatch({
      type: 'SELECT_CONTACT',
      payload: user,
    });
  };

  if (searchMode) {
    return <RenderSearchedContacts handleClose={handleClose} />;
  }

  if (isLoading) {
    const skelton = [];
    for (let i = 0; i < 10; i++) {
      skelton.push(<RenderContactSkelton />);
    }
    return <$Container style={{ overflow: 'hidden' }}>{skelton}</$Container>;
  }

  if (hasError) {
    return (
      <$NoContactsContainer>
        <ErrorImg width='180px' height='200px' />
        <$NoContactsText>Ooops, Please try again</$NoContactsText>
      </$NoContactsContainer>
    );
  }

  if (!contacts.length) {
    return (
      <$NoContactsContainer>
        <NoContactsImg width='180px' height='200px' />
        <$NoContactsText>No contacts</$NoContactsText>
      </$NoContactsContainer>
    );
  }

  return (
    <$Container>
      {contacts.map((user) => (
        <RenderContact user={user} handleSelectUser={handleSelectUser} />
      ))}
    </$Container>
  );
}
