import { styled } from '@mui/material';
import Users from './Users';
import UserSearch from './UserSearch';
import UsersHeader from './UsersHeader';

const $Container = styled('div')(({ theme }) => ({
  width: '450px',
  backgroundColor: 'rgb(255,255,255, 0.1)',
  backdropFilter: 'blur(50px)',
  height: '90%',
  marginRight: '16px',
  border: '1px solid rgb(255,255,255, 0.6)',
  borderRightColor: 'rgb(255,255,255, 0.2)',
  borderBottomColor: 'rgb(255,255,255, 0.2)',
  borderRadius: '10px',
  padding: '10px 0 0',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

interface IUsersListProps {
  userName: string;
}

export default function UsersList({ userName }: IUsersListProps) {
  return (
    <$Container>
      <UsersHeader userName={userName} />
      <UserSearch />
      <Users />
    </$Container>
  );
}
