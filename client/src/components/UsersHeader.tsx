import { styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import sai from 'assets/sai.jpg';

const $Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '4px 10px',
}));

const $UserImage = styled('img')(() => ({
  borderRadius: '50%',
}));

interface IUsersHeaderProps {
  userName: string;
}

export default function UsersHeader({ userName }: IUsersHeaderProps) {
  return (
    <$Container>
      <div>
        {/* <$UserImage src={sai} width='50px' height='50px' /> */}
        <h4>{userName}</h4>
      </div>
      <MoreVertIcon />
    </$Container>
  );
}
