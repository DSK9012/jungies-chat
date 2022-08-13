import { ChangeEvent, useState } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  styled,
  TextField,
} from '@mui/material';
import { FormTypes } from 'helpers/types';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const $Container = styled('div')(({ theme }) => ({
  width: '400px',
  backgroundColor: 'rgb(255,255,255, 0.1)',
  backdropFilter: 'blur(50px)',
  height: '100%',
  border: '1px solid rgb(255,255,255, 0.6)',
  borderRightColor: 'rgb(255,255,255, 0.2)',
  borderBottomColor: 'rgb(255,255,255, 0.2)',
  borderRadius: '10px',
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

interface ILoginFormProps {
  handleUserChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginForm({ handleUserChange }: ILoginFormProps) {
  const [selectedForm, setSelectedForm] = useState<FormTypes>('sign-up-form');

  const handleFormChange = (formType: FormTypes) => {
    setSelectedForm(formType);
  };

  return (
    <$Container>
      {selectedForm === 'sign-in-form' ? (
        <SignInForm handleUserChange={handleUserChange} handleFormChange={handleFormChange} />
      ) : (
        <SignUpForm handleFormChange={handleFormChange} />
      )}
    </$Container>
  );
}
