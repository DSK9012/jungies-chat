import { Search, Close } from '@mui/icons-material';
import { InputAdornment, styled, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

const $Container = styled('div')(() => ({
  padding: '4px 12px',
  height: 'fit-content',
}));

interface IProps {
  handleChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleBlur: () => void;
  handleClose: () => void;
  searchMode: boolean;
  searchText: string;
}

export default function UserSearch({ handleBlur, handleChange, handleClose, searchMode, searchText }: IProps) {
  return (
    <$Container>
      <TextField
        size='small'
        fullWidth
        placeholder='Search user to start chat'
        value={searchText}
        spellCheck='false'
        InputProps={{
          endAdornment: searchMode ? (
            <InputAdornment position='end'>
              <Close htmlColor='#47e7e7' fontSize='small' sx={{ cursor: 'pointer' }} onClick={handleClose} />
            </InputAdornment>
          ) : (
            <InputAdornment position='end'>
              <Search htmlColor='#47e7e7' fontSize='small' sx={{ cursor: 'pointer' }} />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </$Container>
  );
}
