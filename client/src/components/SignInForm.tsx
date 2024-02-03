import { ChangeEvent, useState } from 'react';
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
import useFormikHelpers from 'formik-config/FormikHelpers';
import useSignInFormik, { SignInFormik } from 'formik-config/SignInUserFormik';
import CustomTextField from 'helpers/CustomTextField';

const $SignUpLink = styled('p')(({ theme }) => ({
  fontSize: '16px',
  margin: '8px 0 0 16px',
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
  handleFormChange: (formType: FormTypes) => void;
}

export default function SignInForm({ handleFormChange }: ISignInFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const formik = useSignInFormik();
  const { email, password } = formik.values;
  const { handleChangeAndBlur, hasError, getHelpText } = useFormikHelpers<SignInFormik>(formik);

  const handleSubmit = () => {
    if (formik.isValid && formik.dirty) formik.submitForm();
  };

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
      <form>
        <CustomTextField
          placeholder='Email'
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
          type='text'
          title=''
          name='email'
          value={email}
          onChange={handleChangeAndBlur('email')}
          error={hasError('email')}
          helperText={getHelpText('email')}
        />
        <CustomTextField
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
          type={showPassword ? 'text' : 'password'}
          title=''
          name='password'
          value={password}
          onChange={handleChangeAndBlur('password')}
          error={hasError('password')}
          helperText={getHelpText('password')}
        />
        <FormGroup sx={{ margin: '0 0 10px 16px' }}>
          <FormControlLabel
            label='Show Password'
            checked={showPassword}
            onChange={() => setShowPassword((prevState) => !prevState)}
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
        <Button disabled={!formik.dirty || !formik.isValid} fullWidth variant='contained' onClick={handleSubmit}>
          Sign In
        </Button>
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
      </form>
    </>
  );
}
