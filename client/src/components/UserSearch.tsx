import { Search } from '@mui/icons-material';
import { InputAdornment, styled, TextField } from '@mui/material';
import { useStore } from 'store/Store';

const $Container = styled('div')(() => ({
  padding: '4px 12px',
  height: 'fit-content',
}));

export default function UserSearch() {
  const {
    userContext: { searchUsers },
  } = useStore();

  return (
    <$Container>
      <TextField
        size='small'
        fullWidth
        placeholder='Search user to start chat'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Search htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
        }}
        onChange={searchUsers}
      />
    </$Container>
  );
}
