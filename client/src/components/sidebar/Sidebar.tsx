import { ChangeEvent, useEffect, useState } from 'react';
import { styled } from '@mui/material';
import { useStore } from 'store/Store';
import { socket } from 'helpers/socket';
import { IContact } from 'helpers/types';
import UserSearch from './UserSearch';
import UsersHeader from './UsersHeader';
import Contacts from './Contacts';

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
    userContext: { searchUsers, setSearchedUsers, setSelectedUser, dispatch },
  } = useStore();

  useEffect(() => {
    socket.on('new-contact-updated', (data) => {
      let user: Partial<IContact> = {};
      setSelectedUser((prevState) => {
        if (prevState) {
          const msgs = [...prevState.messages.data];
          const msgIndex = msgs.findIndex((msg) => msg.chatId === '');
          msgs[msgIndex].id = data.newMessage._id;
          msgs[msgIndex].chatId = data.newMessage.chatId;
          msgs[msgIndex].status = data.newMessage.status;
          user = {
            ...prevState,
            id: data.newContact._id,
            messages: {
              ...prevState.messages,
              data: msgs,
            },
          };
          return user as IContact;
        }

        return prevState;
      });
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: user as IContact,
      });
    });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchMode(true);
    setSearchText(event.target.value);
    if (!event.target.value) {
      setSearchedUsers((prevState) => ({ ...prevState, data: [] }));
    } else {
      searchUsers(event);
    }
  };

  const handleBlur = () => {
    if (!searchText) {
      setSearchedUsers((prevState) => ({ ...prevState, data: [] }));
      setSearchMode(false);
    }
  };

  const handleClose = () => {
    setSearchedUsers((prevState) => ({ ...prevState, data: [] }));
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
      <Contacts searchMode={searchMode} handleClose={handleClose} />
    </$Container>
  );
}
