import { InputAdornment, styled, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '10px 16px',
  backdropFilter: 'blur(80px)',
  borderRadius: '10px 10px 0 0',
}));

export default function ChatInput() {
  return (
    <$Container>
      <TextField
        multiline
        maxRows={5}
        size='small'
        fullWidth
        placeholder='Type a message'
        InputProps={{
          startAdornment: (
            <InputAdornment position='end'>
              <EmojiEmotionsIcon htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <SendIcon htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
        }}
      />
    </$Container>
  );
}
