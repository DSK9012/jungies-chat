import { InputAdornment, styled, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '4px 16px',
  marginBottom: '8px',
}));

export default function ChatInput() {
  return (
    <$Container>
      <TextField
        size='small'
        fullWidth
        placeholder='Type a message'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SendIcon htmlColor='#47e7e7' />
            </InputAdornment>
          ),
        }}
      />
    </$Container>
  );
}
