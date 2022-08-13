import { ChangeEvent, MouseEvent } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  Avatar,
  TextField,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  styled,
  Badge,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
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
  cursor: 'pointer',
}));

const $SocialLogin = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: '16px',
}));

const $FileLabel = styled('label')(({ theme }) => ({
  cursor: 'pointer',
}));

interface ISignupFormProps {
  handleFormChange: (formType: FormTypes) => void;
}

export default function SignUpForm({ handleFormChange }: ISignupFormProps) {
  return (
    <>
      <$AvatarContainer>
        <$FileLabel htmlFor='user-avatar'>
          <input type='file' name='user-avatar' id='user-avatar' hidden />
          <Badge
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <InsertPhotoIcon
                fontSize='small'
                sx={{
                  fontSize: '20px',
                  backgroundColor: '#47e7e77d',
                  borderRadius: '50%',
                  padding: '2px',
                }}
              />
            }
          >
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
          </Badge>
        </$FileLabel>
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
        // onChange={}
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
      <br />
      <TextField
        spellCheck='false'
        placeholder='Confirm Password'
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
      <br />
      <Button fullWidth variant='contained'>
        Sign Up
      </Button>
      <br />
      <$SignUpLink>
        Have Account?{' '}
        <Button size='small' disableRipple sx={{ fontSize: '16px' }} onClick={() => handleFormChange('sign-in-form')}>
          Sign In
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
