import React from 'react'
import { 
  DocumentContentGrid, 
  GoToFileGrid, 
  InnerGridBackgroundContainer, 
  ParentGrid 
} from './styled';
import { 
  Button, 
  Grid, 
  Typography, 
  useMediaQuery 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../helpers/formatDate';
import { useDispatch } from 'react-redux';
import { MESSAGES_COLLECTION_SAVE_SUCCESS } from '../../consts/gptChatConstants';

function HistoryListItem({ messages, dateTime }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const stripHtmlTags = () => {
    const lastMessageIndex = messages?.length;
    const lastMessage = messages[lastMessageIndex - 1];

    const parser = new DOMParser();
    const doc = parser.parseFromString(lastMessage?.content, 'text/html');

    return doc.body.textContent || "";
  };

  const handleSelectFile = () => {
    dispatch({ type: MESSAGES_COLLECTION_SAVE_SUCCESS, payload: messages });
    navigate('/ai-chat');
  };

  const truncateText = (text) => {
    const maxLength = isMobile ? 45 : 125;
    if (text.length <= maxLength) {
      return text;
    };

    return text.slice(0, maxLength) + '...';
  };

  return (
    <ParentGrid container>
      <InnerGridBackgroundContainer container>
        <DocumentContentGrid item>
          <Grid 
            sx={{
              display: 'flex', 
              flex: '1', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}
          >
            <Grid 
              sx={{
                flex: isMobile && '9', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: isMobile ? 'flex-start' : 'center'
              }}
            >
              <Typography 
                variant={ isMobile ? 'h6' : 'h5'} 
                sx={{color: 'gray'}}
              >
                {formatDate(dateTime)}
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{flex: isMobile ? '2' : '1'}}>
            <Typography variant='body1' sx={{color: 'gray'}}>
              {truncateText(stripHtmlTags())}
            </Typography>
          </Grid>
        </DocumentContentGrid>
        <GoToFileGrid item>
          <Button
            variant='outlined'
            sx={{
              color: 'white', 
              background: 'linear-gradient(to left, #507CE6 0%, #84A8FF 100%)',
            }}
            onClick={handleSelectFile}
          >
            Resume Conversation
          </Button>
        </GoToFileGrid>
      </InnerGridBackgroundContainer>
    </ParentGrid>
  )
}

export default HistoryListItem;