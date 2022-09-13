import { ChangeEvent, useEffect, useState } from 'react';
import { styled } from '@mui/material';
import LoginPage from 'components/LoginPage';
import PrivatePage from 'components/PrivatePage';
import { useStore } from 'store/Store';
import setAuthToken from 'helpers/set-auth-token';

const $Container = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: 'white',
  position: 'relative',
}));

const $Content = styled('div')(({ theme }) => ({
  height: '90%',
  width: '85%',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '99',
}));

const $Header = styled('h3')(() => ({
  fontSize: '40px',
  fontFamily: 'Oleo Script Swash Caps, cursive',
  color: '#fff',
  textShadow: '0 0 5px  #47e7e7, 0 0 10px #47e7e7, 0 0 20px #47e7e7, 0 0 40px #47e7e7, 0 0 80px #47e7e7',
}));

const $GlassCircleGradient1 = styled('span')(() => ({
  position: 'absolute',
  width: '200px',
  height: '200px',
  background: 'linear-gradient(#32b8a2fa, #ffaa00, #ed5b09)',
  borderRadius: '50%',
  top: '-1%',
  left: '2%',
}));

const $GlassCircleGradient2 = styled('span')(() => ({
  position: 'absolute',
  width: '200px',
  height: '200px',
  background: 'linear-gradient(#b25019, #3bac7ea1, #070e0dfa)',
  borderRadius: '50%',
  bottom: '-10%',
  left: '25%',
}));

const $GlassCircleGradient3 = styled('span')(() => ({
  position: 'absolute',
  width: '200px',
  height: '200px',
  background: 'linear-gradient(#f07f00, #03f9abbf, #337f5c)',
  borderRadius: '50%',
  right: '-2%',
  top: '5%',
}));

if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));

function App() {
  const {
    userContext: {
      userInfo: { isAuthenticated, isLoading },
      getUser,
    },
  } = useStore();

  useEffect(() => {
    if (!isAuthenticated) getUser();
  }, [isAuthenticated]);

  return (
    <$Container>
      <$GlassCircleGradient1 />
      <$GlassCircleGradient2 />
      <$GlassCircleGradient3 />
      <$Header>Jungies Chat</$Header>
      <$Content>{!isLoading && (isAuthenticated ? <PrivatePage /> : <LoginPage />)}</$Content>
    </$Container>
  );
}

export default App;
