import { ChangeEvent } from 'react';
import { styled } from '@mui/material';
import chatImg from 'assets/chat.svg';
import LoginForm from './LoginForm';

const $Container = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: 'rgb(255,255,255, 0.1)',
  backdropFilter: 'blur(50px)',
  height: '90%',
  border: '1px solid rgb(255,255,255, 0.6)',
  borderRightColor: 'rgb(255,255,255, 0.2)',
  borderBottomColor: 'rgb(255,255,255, 0.2)',
  borderRadius: '10px',
  padding: '32px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const $Img = styled('img')(({ theme }) => ({
  width: '500px',
  height: '500px',
  margin: '0 auto',
}));

export default function LoginPage() {
  return (
    <$Container>
      <$Img src={chatImg} alt='chat image' />
      <LoginForm />
    </$Container>
  );
}
