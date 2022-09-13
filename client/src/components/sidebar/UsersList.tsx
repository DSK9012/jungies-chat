import { ChangeEvent, useState } from 'react';
import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import UserSearch from './UserSearch';
import UsersHeader from './UsersHeader';
import Users from './Users';

const $Container = styled('div')(({ theme }) => ({
  width: '450px',
  backgroundColor: 'rgb(255,255,255, 0.1)',
  backdropFilter: 'blur(50px)',
  height: '90%',
  marginRight: '16px',
  border: '1px solid rgb(255,255,255, 0.6)',
  borderRightColor: 'rgb(255,255,255, 0.2)',
  borderBottomColor: 'rgb(255,255,255, 0.2)',
  borderRadius: '10px',
  padding: '10px 0 0',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

export default function UsersList() {
  const [searchText, setSearchText] = useState<string>('');
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const {
    userContext: { searchUsers, setSearchedUsers },
  } = useStore();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchMode(true);
    setSearchText(event.target.value);
    if (!event.target.value) {
      // setSearchedUsers([]);
    } else {
      searchUsers(event);
    }
  };

  const handleBlur = () => {
    if (!searchText) {
      // setSearchedUsers([]);
      setSearchMode(false);
    }
  };

  const handleClose = () => {
    // setSearchedUsers([]);
    setSearchMode(false);
    setSearchText('');
  };

  return (
    <$Container>
      <UsersHeader />
      <UserSearch
        searchText={searchText}
        searchMode={searchMode}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleClose={handleClose}
      />
      <Users searchMode={searchMode} searchText={searchText} handleClose={handleClose} />
    </$Container>
  );
}
