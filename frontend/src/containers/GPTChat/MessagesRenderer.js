import React, { memo } from 'react';
import UserMessageRenderer from './UserMessageRenderer';
import { MarkdownRendererGridContainer, MessageBox } from './styled';
import { 
  Grid, 
  Typography, 
  useMediaQuery, 
} from '@mui/material';
import MarkdownRenderer from './MarkdownRenderer';


const MessagesRenderer = memo(function MessagesRenderer({
  messages, 
  palName,
}) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const renderMessages = () => {
    if(!messages.length) return null;

    return messages.map((message, index) => {
      if(message.role === 'user'){
        return (
          <UserMessageRenderer
            key={`user-message-${index}`}
            message={message} 
          />
        )
      }
      
      return (
        <MessageBox key={`ai-message-${index}`}>
          <MarkdownRendererGridContainer>
            <Typography
              variant='h6' 
              sx={{
                marginLeft: '0.5rem', 
                textWrap: 'wrap',
                color: '#373737',
                height: '100%'
              }}
            >
              <MarkdownRenderer content={message?.content} />
            </Typography>
          </MarkdownRendererGridContainer>
        </MessageBox>
      )
    });
  };

  const renderPlaceholder = () => (
    <Grid
      sx={{
        height: '95%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: isMobile ? 'flex-end' : 'center'
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'center',
          width: '100%',
          overFlowX: 'auto',
          marginLeft: isMobile && '1rem',
        }}
      >
        <Typography>
          Ask {palName} Anything!
        </Typography>
      </Grid>
    </Grid>
  );

  return messages.length ? renderMessages() : renderPlaceholder();
}, (prevProps, nextProps) => {
  // Custom comparison function
  // Return true if we DON'T want the component to update
  return (
    prevProps.messages === nextProps.messages &&
    prevProps.anchorEl === nextProps.anchorEl &&
    prevProps.selectedFolder === nextProps.selectedFolder &&
    prevProps.addNewFolder === nextProps.addNewFolder
  );
});

export default MessagesRenderer;