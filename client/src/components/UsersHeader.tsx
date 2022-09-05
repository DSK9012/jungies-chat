import { styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import sai from 'assets/sai.jpg';
import { useStore } from 'store/Store';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '4px 10px',
}));

const $UserInfo = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const $UserImage = styled('img')(() => ({
  borderRadius: '50%',
}));

const $UserName = styled('h4')(() => ({
  marginLeft: '8px',
  textTransform: 'capitalize',
}));

export default function UsersHeader() {
  const {
    userContext: { userInfo },
  } = useStore();

  return (
    <$Container>
      <$UserInfo>
        <$UserImage src={`http://localhost:5000/api/user/avatar/${userInfo.id}`} width='50px' height='50px' />
        <$UserName>{userInfo.userName}</$UserName>
      </$UserInfo>
      <MoreVertIcon />
    </$Container>
  );
}
