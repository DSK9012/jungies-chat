import { Skeleton } from '@mui/material';
import { $UserContainer, $UserInfo } from './Contacts';

const RenderContactSkelton = () => (
  <$UserContainer>
    <Skeleton animation='wave' variant='circular' width={60} height={50} />
    <$UserInfo style={{ width: '100%' }}>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$UserInfo>
  </$UserContainer>
);

export default RenderContactSkelton;
