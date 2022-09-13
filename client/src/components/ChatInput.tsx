import { InputAdornment, styled, TextField, Box } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useStore } from 'store/Store';
import { socket } from 'helpers/socket';
import { MessageStatusTypes } from 'helpers/types';

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
    userContext: { selectedUser, setSelectedUser, userInfo },
  } = useStore();

  // const handleSubmit = () => {
  //   setSelectedUser((prevState) => {
  //     const message = {
  //       chatId: '',
  //       sentBy: {
  //         userId: userInfo._id,
  //         name: userInfo.name,
  //       },
  //       sentTo: {
  //         userId: selectedUser?._id || '',
  //         name: selectedUser?.name || '',
  //       },
  //       message: msg,
  //       status: MessageStatusTypes.WAITING,
  //     };
  //     if (prevState?.messages) {
  //       const messages = [...prevState.messages];
  //       messages.push(message);
  //       socket.emit('sendMessage', message);
  //       return { ...prevState, messages };
  //     }

  //     return prevState;
  //   });
  //   setMsg('');
  // };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMsg(event.target.value);
  };

  return (
    <$Container>
      {/* <Box component='form' onSubmit={handleSubmit}> */}
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
            <InputAdornment position='end'>
              <SendIcon htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
      />
      {/* </Box> */}
    </$Container>
  );
}
