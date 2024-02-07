import { useEffect } from 'react';
import { styled } from '@mui/material';
import LoginPage from 'components/LoginPage';
import PrivatePage from 'components/PrivatePage';
import { useStore } from 'store/Store';
import setAuthToken from 'helpers/set-auth-token';
import BackgroundGradients from 'BackgroundGradients';
import Header from 'Header';

const Content = styled('div')(({ theme }) => ({
  height: '90%',
  width: '85%',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '99',
}));

if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));

function App() {
  const {
    userContext: {
      userInfo: { isLoading, isAuthenticated },
      getUser,
    },
  } = useStore();

  useEffect(() => {
    if (!isAuthenticated) getUser();
  }, [isAuthenticated]);

  return (
    <Container>
      <BackgroundGradients />
      <Header />
      <Content>{!isLoading && (isAuthenticated ? <PrivatePage /> : <LoginPage />)}</Content>
    </Container>
  );
}

const Container = styled('div')({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: 'white',
  position: 'relative',
});

export default App;
