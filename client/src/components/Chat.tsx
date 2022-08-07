import { styled } from '@mui/material';

const $Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '4px 16px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const $Message = styled('div')(() => ({
  border: '2px solid #47e7e7',
  padding: '10px 16px',
  margin: '0 auto 8px',
  backgroundColor: '#47e7e70d',
  color: '#47e7e7',
  borderRadius: '5px',
  fontSize: '14px',
  width: 'fit-content',
  maxWidth: '60%',
  '&.left': {
    marginLeft: '0',
  },
  '&.right': {
    marginRight: '0',
  },
}));

export default function Chat() {
  return (
    <$Container>
      <$Message className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='left'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
      <$Message className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message>
    </$Container>
  );
}
