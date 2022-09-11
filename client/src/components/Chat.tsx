import { styled } from '@mui/material';
import { useStore } from 'store/Store';

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

const $MsgTime = styled('sub')(({ theme }) => ({
  marginLeft: '6px',
  fontSize: '13px',
  textAlign: 'right',
}));

export default function Chat() {
  const {
    userContext: { selectedUser },
  } = useStore();

  if (!selectedUser) {
    return <h3>No messages yet.</h3>;
  }

  return (
    <$Container>
      {selectedUser.messages.map((message) => (
        <$Message className='left'>
          {message.message}
          <$MsgTime>6:00 am</$MsgTime>
        </$Message>
      ))}
      {/* <$Message className='right'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <$MsgTime>11:56 pm</$MsgTime>
      </$Message>
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
      <$Message className='right'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</$Message> */}
    </$Container>
  );
}
