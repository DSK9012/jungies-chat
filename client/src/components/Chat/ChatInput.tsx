import { InputAdornment, styled, TextField } from '@mui/material';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useStore } from 'store/Store';
import { socket } from 'helpers/socket';
import { IContact, MessageStatusTypes } from 'helpers/types';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '10px 16px',
  backdropFilter: 'blur(80px)',
  borderRadius: '10px 10px 0 0',
}));

export default function ChatInput() {
  const [msg, setMsg] = useState<string>('');
  const {
    userContext: {
      setSelectedUser,
      dispatch,
      userInfo: { id, name },
    },
  } = useStore();

  const handleSubmit = () => {
    if (msg.trim().length > 0) {
      let user: Partial<IContact> = {};
      setSelectedUser((prevState) => {
        if (prevState) {
          const date = new Date().toISOString();
          const message = {
            id: '',
            chatId: prevState.id,
            sentBy: {
              name,
              userId: id,
            },
            sentTo: {
              name: prevState.name,
              userId: prevState.contactUserId,
            },
            message: msg,
            status: MessageStatusTypes.WAITING,
            createdAt: date,
            updatedAt: date,
            usersReadMessage: [],
          };
          const messages = [...prevState.messages.data];
          messages.push(message);
          socket.emit('message', message);
          user = {
            ...prevState,
            lastMessage: msg,
            messages: { ...prevState.messages, data: messages },
          };
          return user as IContact;
        }
        return prevState;
      });
      dispatch({
        type: 'SET_MESSAGE',
        payload: user as IContact,
      });
      setMsg('');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMsg(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }
  };

  return (
    <$Container>
      <TextField
        multiline
        maxRows={5}
        size='small'
        fullWidth
        placeholder='Type a message'
        spellCheck='false'
        value={msg}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <EmojiEmotionsIcon htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end' onClick={handleSubmit}>
              <SendIcon htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </$Container>
  );
}
