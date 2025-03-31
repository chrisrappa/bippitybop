import React, { memo } from 'react';
import UserMessageRenderer from './UserMessageRenderer';
import { MarkdownRendererGridContainer, MessageBox } from './styled';
import { 
  Card, 
  Grid, 
  Typography, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import MarkdownRenderer from './MarkdownRenderer';
import examplePromptButtons from './examplePromptButtons';
import { useNavigate } from 'react-router-dom';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';


const MessagesRenderer = memo(function MessagesRenderer({
  messages, 
  submitDemoMessage
}) {
  
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleDemoCardClick = (button) => {
    if(button?.link){
      navigate('/faq');
    } else {
      submitDemoMessage(button?.textContent);
    };
  };

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

  const renderExamplePrompts = () => (
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
        {examplePromptButtons.map((button, index) => (
          <Card
            elevation={3}
            key={`example-prompt-${index}`}
            sx={{
              minWidth: isMobile ? '15rem' : '12rem',
              height: isMobile ? '5rem' : '8rem',
              borderRadius: '1rem',
              aspectRatio: '1/1',
              bgcolor: button.link ? 'primary.main' : 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '1rem',
              cursor: 'pointer',
              flexBasis: '1',
              marginRight: '1rem',
              color: button?.link ? 'white' : 'black',
              border: `1px solid ${theme.palette.primary.main}`
            }}
            onClick={(e) => {
              gtmTrackButtonClick(e, 'click_example_prompt')
              handleDemoCardClick(button)
            }}
          >
            {!isMobile && (
              <Grid sx={{ marginBottom: '1rem' }}>
                {button?.icon}
              </Grid>
            )}
            <Typography>{button?.title}</Typography>
          </Card>
        ))}
      </Grid>
    </Grid>
  );

  return messages.length ? renderMessages() : renderExamplePrompts();
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