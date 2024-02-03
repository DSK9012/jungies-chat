import { Avatar, Box, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useStore } from 'store/Store';
import { getAvatarBgColor } from 'components/Chat/helpers';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '4px 10px',
}));

export default function UsersHeader() {
  const {
    userContext: { userInfo },
  } = useStore();

  return (
    <$Container>
      <Box display='flex' alignItems='center'>
        <Avatar
          src={`http://localhost:4000/api/user/avatar/${userInfo._id}`}
          sx={{ width: 45, height: 45, backgroundColor: getAvatarBgColor(userInfo.name) }}
        >
          {userInfo?.name?.charAt(0)}
        </Avatar>
        <UserName>{userInfo.name}</UserName>
      </Box>
      {/* <MoreVertIcon sx={{ cursor: 'pointer' }} /> */}
    </$Container>
  );
}

const UserName = styled('h4')(() => ({
  fontSize: '18px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginLeft: 8,
}));
