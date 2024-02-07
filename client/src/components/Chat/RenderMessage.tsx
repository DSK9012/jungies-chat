/* eslint-disable no-nested-ternary */
import { format, parseISO } from 'date-fns';
import DoneIcon from '@mui/icons-material/Done';
import { styled } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IMessage } from 'helpers/types';
import { useStore } from 'store/Store';

const $Message = styled('div')(() => ({
  border: '2px solid #47e7e7',
  padding: '6px 10px',
  margin: '0 auto 8px',
  backgroundColor: '#47e7e70d',
  color: '#47e7e7',
  borderRadius: '5px',
  fontSize: '14px',
  width: 'fit-content',
  maxWidth: '60%',
  '&.left': {
    marginLeft: '16px',
  },
  '&.right': {
    marginRight: '16px',
  },
}));

const $MsgInfo = styled('sub')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const $MsgTime = styled('sub')(({ theme }) => ({
  marginRight: '4px',
  fontSize: '12px',
  textAlign: 'right',
  color: '#a7b0b6',
}));

const $Text = styled('p')(() => ({
  fontSize: '16px',
  marginBottom: '4px',
  whiteSpace: 'pre-wrap',
}));

interface IRenderMessageProps {
  message: IMessage;
}

const RenderMessage = ({ message }: IRenderMessageProps) => {
  const {
    userContext: {
      userInfo: { _id },
    },
  } = useStore();

  return (
    <$Message className={message.sentBy.userId === _id ? 'right' : 'left'}>
      <$Text>{message.message}</$Text>
      <$MsgInfo>
        <$MsgTime>{format(parseISO(message.createdAt), 'h:mm aaa')}</$MsgTime>
        {message.status.toLowerCase() === 'sent' ? (
          <DoneIcon sx={{ fontSize: '14px', color: '#a7b0b6' }} />
        ) : message.status.toLowerCase() === 'delivered' ? (
          <DoneAllIcon sx={{ fontSize: '14px', color: '#a7b0b6' }} />
        ) : message.status.toLowerCase() === 'read' ? (
          <DoneAllIcon sx={{ fontSize: '14px', color: '#47e7e7' }} />
        ) : (
          <AccessTimeIcon sx={{ fontSize: '14px', color: '#a7b0b6' }} />
        )}
      </$MsgInfo>
    </$Message>
  );
};

export default RenderMessage;
