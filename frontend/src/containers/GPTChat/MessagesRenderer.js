import React, { memo } from 'react';
import UserMessageRenderer from './UserMessageRenderer';
import { MarkdownRendererGridContainer, MessageBox } from './styled';
import { 
  Box,
  Button, 
  Card, 
  Grid, 
  IconButton, 
  Popover, 
  Typography, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import SavePopout from './SavePopout';
import MarkdownRenderer from './MarkdownRenderer';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import examplePromptButtons from './examplePromptButtons';
import { useNavigate } from 'react-router-dom';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';


const MessagesRenderer = memo(function MessagesRenderer({
  messages, 
  userInfo,
  addNewFolder,
  handleClose,
  userFolders,
  setAddNewFolder,
  setSelectedFolder,
  selectedFolder,
  handleSaveDoc,
  handleChange,
  handleClick,
  anchorEl,
  handleClosePopover,
  submitDemoMessage
}) {
  
  const theme = useTheme();
  const open = Boolean(anchorEl);
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
            userInfo={userInfo} 
          />
        )
      }
      
      return (
        <MessageBox key={`ai-message-${index}`}>
          <Grid
            sx={{
              display: 'flex', 
              flex: '1', 
              width: '100%', 
              justifyContent: 'flex-start', 
              alignItems: 'center', 
              padding: '0.5rem',
              maxHeight: '5rem'
            }}
          >
            <IconButton 
              disabled 
              sx={{
                border: '1px solid lightgray', 
                padding: '0.75rem',
                marginRight: '1rem',
              }}
            >
              <>
                <svg width={0} height={0}>
                  <linearGradient id="exampleColors" x1={1} y1={0} x2={1} y2={1} gradientTransform="rotate(45)">
                    <stop offset='0%' stopColor="#507CE6" />
                    <stop offset='50%' stopColor="#84A8FF" />
                    <stop offset='100%' stopColor="#FED602" />
                  </linearGradient>
                </svg>
                <AutoAwesomeIcon sx={{ fill: "url(#exampleColors)" }} />
              </>
            </IconButton>
            <Button
              sx={{
                border: `1px solid ${theme.palette.secondary.main}`, 
                padding: '0.5rem 1rem',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '10rem',
                borderRadius: '2rem',
                background: `linear-gradient(to left, #507CE6 0%, #84A8FF 100%)` 
              }}
              onClick={(e) => handleClick(e, message)}
            >
              <SaveOutlinedIcon 
                sx={{
                  color: `${theme.palette.secondary.main}`, 
                  fontSize: '2rem',
                  marginRight: '1rem'
                }} 
              />
              <Typography color={'secondary'} variant='h6'>
                Save
              </Typography>
            </Button>
            <Popover
              key={index}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <SavePopout 
                addNewFolder={addNewFolder}
                handleClose={handleClose}
                userFolders={userFolders}
                setAddNewFolder={setAddNewFolder}
                setSelectedFolder={setSelectedFolder}
                selectedFolder={selectedFolder}
                handleSaveDoc={handleSaveDoc}
                handleChange={handleChange}
              />
            </Popover>
          </Grid>
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