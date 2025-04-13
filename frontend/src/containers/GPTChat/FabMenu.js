import React, { useState } from 'react';
import { 
  Fab, 
  Popover, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Grid 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { CLEAR_GLOBAL_MESSAGES } from '../../consts/gptChatConstants';

function FabMenu({
  isMobile, 
  setMessages,
  messages
}) {

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // Hook for navigation if using react-router

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewChat = () => {
    const messageData = {
      dateTime: new Date().toISOString(),
      messageThread: [...messages],
    };

    const existingMessages = JSON.parse(localStorage.getItem('conversationHistory')) || [];
    const updatedMessages = [...existingMessages, messageData];
    localStorage.setItem('conversationHistory', JSON.stringify(updatedMessages));

    dispatch({ type: CLEAR_GLOBAL_MESSAGES });
    localStorage.setItem('messageHistory', '');
    setMessages([]);
    handleClose();
  };

  const handleChatHistory = () => {
    navigate('/chat-history');
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Grid sx={{flex: '1', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Fab 
        size="medium" 
        color="secondary" 
        aria-label="add" 
        sx={{
          flex: '1', 
          maxWidth: '3rem', 
          background: `linear-gradient(to left, #52985b 0%, #a1dbb0 100%)`,
          alignSelf: 'center'
        }}
        onClick={handleClick}
      >
        <AddIcon sx={{ color: 'white' }} />
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <List>
          <ListItem button onClick={handleNewChat}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="New Chat" />
          </ListItem>
          <ListItem button onClick={handleChatHistory}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Chat History" />
          </ListItem>
        </List>
      </Popover>
    </Grid>
  )
}

export default FabMenu;