import { ChangeEvent } from 'react';
import {
  Avatar,
  TextField,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  styled,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FormTypes } from 'helpers/types';

const $SignUpLink = styled('p')(({ theme }) => ({
  fontSize: '16px',
  marginLeft: '16px',
}));

const $AvatarContainer = styled('div')(({ theme }) => ({
  margin: '0 auto',
  border: '2.8px solid #47e7e7',
  borderRadius: '50%',
  padding: '2px',
}));

const $SocialLogin = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: '16px',
}));

interface ISignInFormProps {
  handleUserChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFormChange: (formType: FormTypes) => void;
}

export default function SignInForm({ handleUserChange, handleFormChange }: ISignInFormProps) {
  return (
    <>
      <$AvatarContainer>
        <Avatar
          alt='User Avatar'
          src=''
          sx={{
            width: '65px',
            height: '65px',
            backgroundColor: '#b2b2b273',
            backdropFilter: 'blur(100px)',
          }}
        >
          <PersonIcon />
        </Avatar>
      </$AvatarContainer>
      <br />
      <TextField
        placeholder='Email or Mobile Number'
        fullWidth
        size='small'
        spellCheck='false'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PersonIcon htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
        }}
        onChange={handleUserChange}
      />
      <br />
      <TextField
        spellCheck='false'
        placeholder='Password'
        fullWidth
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PasswordIcon htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
        }}
      />
      <FormGroup sx={{ margin: '0 0 16px 16px' }}>
        <FormControlLabel
          label='Show Password'
          control={
            <Checkbox
              size='small'
              sx={{
                marginLeft: '0',
                color: '#47e7e7',
                '&.Mui-checked': {
                  color: '#47e7e7',
                },
                '& .css-zddgej-MuiFormControlLabel-root .MuiFormControlLabel-label': {
                  color: 'white',
                },
              }}
            />
          }
          sx={{
            '& .MuiFormControlLabel-label': {
              color: '#e8e8e8',
              fontSize: '16px',
            },
          }}
        />
      </FormGroup>
      <Button fullWidth variant='contained'>
        Sign In
      </Button>
      <br />
      <$SignUpLink>
        New User?{' '}
        <Button size='small' disableRipple sx={{ fontSize: '16px' }} onClick={() => handleFormChange('sign-up-form')}>
          Sign Up
        </Button>
      </$SignUpLink>
      <$SocialLogin>
        <GoogleIcon
          htmlColor='#47e7e7'
          fontSize='medium'
          sx={{
            '&:hover': {
              backgroundColor: '#47e7e70d',
              borderRadius: '50%',
              cursor: 'pointer',
              transform: 'scale(1.3)',
              transition: '.3s',
            },
          }}
        />
        <InstagramIcon
          htmlColor='#47e7e7'
          fontSize='medium'
          sx={{
            '&:hover': {
              backgroundColor: '#47e7e70d',
              borderRadius: '50%',
              cursor: 'pointer',
              transform: 'scale(1.3)',
              transition: '.3s',
            },
          }}
        />
        <TwitterIcon
          htmlColor='#47e7e7'
          fontSize='medium'
          sx={{
            '&:hover': {
              backgroundColor: '#47e7e70d',
              borderRadius: '50%',
              cursor: 'pointer',
              transform: 'scale(1.3)',
              transition: '.3s',
            },
          }}
        />
        <LinkedInIcon
          htmlColor='#47e7e7'
          fontSize='medium'
          sx={{
            '&:hover': {
              backgroundColor: '#47e7e70d',
              borderRadius: '50%',
              cursor: 'pointer',
              transform: 'scale(1.3)',
              transition: '.3s',
            },
          }}
        />
      </$SocialLogin>
    </>
  );
}
