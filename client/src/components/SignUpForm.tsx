import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
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
import useSignUpFormik, { SignUpFormik } from 'formik-config/SignUpUserFormik';
import useFormikHelpers from 'formik-config/FormikHelpers';
import CustomTextField from 'helpers/CustomTextField';

const $SignUpLink = styled('p')(({ theme }) => ({
  fontSize: '16px',
  marginLeft: '16px',
}));

const $AvatarContainer = styled('div')(({ theme }) => ({
  margin: '0 auto 8px',
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

const $UserAvatarFieldError = styled('p')(({ theme }) => ({
  color: '#ff7100',
  fontSize: '14px',
  fontWeight: 'bold',
  marginBottom: '8px',
}));

interface ISignupFormProps {
  handleFormChange: (formType: FormTypes) => void;
}

export default function SignUpForm({ handleFormChange }: ISignupFormProps) {
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer>();
  const [validImg, setValidImg] = useState<boolean>(true);
  const formik = useSignUpFormik();
  const { avatar, email, password, confirmPassword, name } = formik.values;
  const { handleChangeAndBlur, hasError, getHelpText } = useFormikHelpers<SignUpFormik>(formik);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValidImg(true);
    const reader = new FileReader();
    const file = event.target.files?.length && event.target.files[0];
    if (reader && file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        formik.setFieldValue(event.target.name, file);
        setImgPreview(reader.result ?? '');
        if (
          file.size / 1024 > 500 ||
          (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png')
        ) {
          setValidImg(false);
        }
      };
    }
  };

  const handleSubmit = () => {
    if (formik.isValid && formik.dirty) formik.submitForm();
  };

  return (
    <>
      <$AvatarContainer
        style={{ borderColor: validImg ? '#47e7e7' : '#ff7100', marginBottom: validImg ? '16px' : '8px' }}
      >
        <$FileLabel htmlFor='avatar'>
          <input
            type='file'
            name='avatar'
            id='avatar'
            hidden
            src={imgPreview?.toString()}
            onChange={handleFileChange}
            accept='image/jpg,img/jpeg,img/png,.png,.jpg,.jpeg'
          />
          <Badge
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              avatar && validImg ? (
                <ModeEditIcon
                  fontSize='small'
                  sx={{
                    fontSize: '20px',
                    backgroundColor: '#47e7e7ba',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                  onClick={(event: MouseEvent) => event.preventDefault()}
                />
              ) : (
                <InsertPhotoIcon
                  fontSize='small'
                  sx={{
                    fontSize: '20px',
                    backgroundColor: validImg ? '#47e7e7ba' : '#ff7100ba',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
              )
            }
          >
            <Avatar
              alt='User Avatar'
              src={imgPreview?.toString()}
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
      {!validImg && (
        <$UserAvatarFieldError>
          Allowed image types are .jpg, jpeg, .png and size should not exceed 500 KB.
        </$UserAvatarFieldError>
      )}
      <CustomTextField
        placeholder='Display Name'
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
        name='name'
        value={name}
        onChange={handleChangeAndBlur('name')}
        error={hasError('name')}
        helperText={getHelpText('name')}
      />
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
        type='password'
        title=''
        name='password'
        value={password}
        onChange={handleChangeAndBlur('password')}
        error={hasError('password')}
        helperText={getHelpText('password')}
      />
      <CustomTextField
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
        type='password'
        title=''
        name='confirmPassword'
        value={confirmPassword}
        onChange={handleChangeAndBlur('confirmPassword')}
        error={hasError('confirmPassword')}
        helperText={getHelpText('confirmPassword')}
      />
      <Button
        fullWidth
        variant='contained'
        disabled={!formik.dirty || !formik.isValid || !(avatar ? validImg : true)}
        sx={{
          margin: '8px 0',
        }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
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
