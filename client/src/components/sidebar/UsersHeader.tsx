import { styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useStore } from 'store/Store';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '4px 10px',
}));

const $UserImage = styled('img')(() => ({
  borderRadius: '50%',
  cursor: 'pointer',
}));

export default function UsersHeader() {
  const {
    userContext: { userInfo },
  } = useStore();

  return (
    <$Container>
      <$UserImage src={`http://localhost:4000/api/user/avatar/${userInfo._id}`} width='50px' height='50px' />
      <MoreVertIcon sx={{ cursor: 'pointer' }} />
    </$Container>
  );
}
