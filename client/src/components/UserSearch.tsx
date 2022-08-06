import { Search } from '@mui/icons-material';
import { InputAdornment, styled, TextField } from '@mui/material';

const $Container = styled('div')(() => ({
  padding: '4px 12px',
  height: 'fit-content',
}));

export default function UserSearch() {
  return (
    <$Container>
      <TextField
        size='small'
        fullWidth
        placeholder='search user to start chat'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Search htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
        }}
      />
    </$Container>
  );
}
