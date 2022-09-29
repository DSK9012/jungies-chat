import { styled } from '@mui/material';
import { IMessage } from 'helpers/types';

const $Container = styled('div')(() => ({
  backgroundColor: '#c0c0c026',
  backdropFilter: 'blur(100px)',
  textAlign: 'center',
  padding: '4px',
  color: '#a7b0b6',
  margin: '8px 0 16px',
  fontSize: '14px',
}));

interface IRenderChatDateProps {
  index: number;
  messages: IMessage[];
}

const getDate = (date: string) => new Date(date).toDateString();

const RenderChatDate = ({ index, messages }: IRenderChatDateProps) => {
  if (!index) {
    return <$Container>{getDate(messages[index].createdAt)}</$Container>;
  }

  if (new Date(messages[index].createdAt).toDateString() !== new Date(messages[index - 1].createdAt).toDateString()) {
    return <$Container>{getDate(messages[index].createdAt)}</$Container>;
  }

  return null;
};

export default RenderChatDate;
