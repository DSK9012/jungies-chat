import { Box, Typography, styled } from '@mui/material';
import { IMessage } from 'helpers/types';

const $Container = styled('div')(() => ({
  // backgroundColor: '#c0c0c026',
  // backdropFilter: 'blur(100px)',
  borderTop: '1.5px solid #c0c0c026',
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
  if (
    !index ||
    new Date(messages[index].createdAt).toDateString() !== new Date(messages[index - 1].createdAt).toDateString()
  ) {
    return (
      <Box display='flex' alignItems='center' width='100%' mt={1}>
        <$Container sx={{ flex: 1 }} />
        <Typography
          fontSize={12}
          sx={{
            transform: 'translateY(-50%)',
            padding: '0 8px',
            margin: '0 auto',
          }}
        >
          {getDate(messages[index].createdAt)}
        </Typography>
        <$Container sx={{ flex: 1 }} />
      </Box>
    );
  }

  return null;
};

export default RenderChatDate;
