import { Box, InputAdornment, styled, TextField } from '@mui/material';
import { ChangeEvent, useState, KeyboardEvent, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useStore } from 'store/Store';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '10px 16px',
  backdropFilter: 'blur(80px)',
  borderRadius: '10px 10px 0 0',
}));

export default function ChatInput() {
  const inputRef = useRef<HTMLInputElement>();
  const [msg, setMsg] = useState<string>('');
  const {
    userContext: { selectedUser, dispatch },
  } = useStore();

  const handleSubmit = () => {
    if (msg.trim().length > 0) {
      dispatch({
        type: 'SEND_MESSAGE',
        payload: msg,
      });
      setMsg('');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMsg(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (selectedUser && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedUser]);

  return (
    <$Container>
      <Box width='70%' margin='0 auto'>
        <TextField
          inputRef={inputRef}
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
                <EmojiEmotionsIcon htmlColor='#47e7e7' fontSize='small' sx={{ cursor: 'pointer' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end' onClick={handleSubmit}>
                <SendIcon htmlColor='#47e7e7' fontSize='small' sx={{ cursor: 'pointer' }} />
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </Box>
    </$Container>
  );
}
