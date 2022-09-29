import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';

const $Message = styled('div')(() => ({
  padding: '10px 16px',
  margin: '0 auto 8px',
  backgroundColor: '#4f4f4f',
  borderRadius: '5px',
  fontSize: '14px',
  width: '40%',
  maxWidth: '60%',
  '&.left': {
    marginLeft: '16px',
  },
  '&.right': {
    marginRight: '16px',
  },
}));

const RenderChatSkelton = () => (
  <>
    <$Message className='right'>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$Message>
    <$Message className='right'>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$Message>
    <$Message className='left'>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$Message>
    <$Message className='left'>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$Message>
    <$Message className='right'>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$Message>
    <$Message className='left'>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$Message>
    <$Message className='left'>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$Message>
    <$Message className='right'>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$Message>
    <$Message className='right'>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$Message>
    <$Message className='right'>
      <Skeleton animation='wave' height={10} width='90%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={10} width='60%' />
    </$Message>
  </>
);

export default RenderChatSkelton;
