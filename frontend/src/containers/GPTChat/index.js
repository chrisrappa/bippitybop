import React, { 
  useEffect, 
  useMemo, 
  useRef, 
  useState 
} from 'react';
import { 
  Grid,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatContainer, ChatInputContainer } from './styled';
import { MESSAGES_COLLECTION_SAVE_SUCCESS } from '../../consts/gptChatConstants';
import { 
  createClaudeSonnetRequest, 
  createGrokRequest, 
  createOpenAIRequest, 
  createPerplexityRequest 
} from './helpers';
import { debounce } from 'lodash';
import { useLocation } from 'react-router-dom';
import InputField from './InputField.js';
import FabMenu from './FabMenu.js';
import MessagesRenderer from './MessagesRenderer.js';

// VERY IMPORTANT 
// Maintains scroll position due to DOM rerendering upon subtracting credits
let globalScrollPosition = 0;

function GPTChat() {

  const theme = useTheme();
  const dispatch = useDispatch();
  const chatContainerRef = useRef();
  const inputRef = useRef();
  const location = useLocation();
  const recentHistory = localStorage.getItem('messageHistory') ?? [];
  const previouslySelectedVersion = localStorage.getItem('AIVersion') ?? 'GPT 3.5';
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const messsagesGlobalState = useSelector((state) => state.gptChat.messages);
  const userGenCredits = useSelector((state) => state?.userData?.loginInfo?.userCredits);
  const selectedVersion = useSelector((state) => state?.gptChat?.gptVersion);

  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  const [stopGenerating, setStopGenerating] = useState(false);

  const popluateInitialMessages = () => {
    if(messsagesGlobalState && messsagesGlobalState.length > 0){
      return messsagesGlobalState;
    };

    if(recentHistory.length){
      return JSON.parse(recentHistory);
    };

    return [];
  };

  const [messages, setMessages] = useState(popluateInitialMessages());

  // Keeps formatting from carrying over while text is copied.
  document.addEventListener('copy', function(e) {
    e.preventDefault();
    const text = window.getSelection().toString();
    e.clipboardData.setData('text/plain', text);
  });

  const submitDemoMessage = debounce(async(demoMessage) => {
    const updatedMessages = [...messages, { role: 'user', content: demoMessage }];
    setMessages(updatedMessages);

    try {

      await createOpenAIRequest(
        updatedMessages, 
        selectedVersion ?? previouslySelectedVersion, 
        setMessages,
        setStopGenerating,
        setResponseLoading,
        stopGenerating,
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, 300);

  const handleSendDebounced = debounce(async(userMessage) => {
    const updatedMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);

    try {
      
      if(
        selectedVersion === 'ChatGPT 3.5' || 
        selectedVersion === 'ChatGPT 4o'  
      ){
        await createOpenAIRequest(
          updatedMessages, 
          selectedVersion ?? previouslySelectedVersion, 
          setMessages,
          setStopGenerating,
          setResponseLoading,
          stopGenerating,
        );
      };

      if(selectedVersion === 'Claude'){
        await createClaudeSonnetRequest(
          updatedMessages, 
          setMessages,
          setStopGenerating,
          setResponseLoading,
          stopGenerating
        );
      };

      if(selectedVersion === 'Grok xAI'){
        await createGrokRequest(
          updatedMessages, 
          setMessages,
          setStopGenerating,
          setResponseLoading,
          stopGenerating
        );
      }

      if(selectedVersion === 'Perplexity'){
        await createPerplexityRequest(
          updatedMessages, 
          setMessages,
          setStopGenerating,
          setResponseLoading,
          stopGenerating
        );
      }

    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, 300);

  const handleSend = async (userMessage) => {
    // Ensure scroll position is up to date
    const { scrollTop } = chatContainerRef.current;
    globalScrollPosition = scrollTop;

    setIsUserScrolledUp(false);
    setResponseLoading(true);
    handleSendDebounced(userMessage);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = globalScrollPosition;
    }
  }, [location]);

  useMemo(() => {

    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        globalScrollPosition = scrollTop;

        const isAtBottom = scrollHeight - scrollTop === clientHeight;
        setIsUserScrolledUp(!isAtBottom);
      }
    };

    const container = chatContainerRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };

    // eslint-disable-next-line
  }, [chatContainerRef?.current?.scrollTop]);

  useMemo(() => {
    if (chatContainerRef.current && !isUserScrolledUp) {
      chatContainerRef.current.scrollTop = globalScrollPosition;
    };

    dispatch({ type: MESSAGES_COLLECTION_SAVE_SUCCESS, payload: messages});

    inputRef?.current?.focus();

      // eslint-disable-next-line
  }, [messages, isUserScrolledUp]);

  return (
    <Grid 
      className='ask-question'
      sx={{
        ...theme.flexBox.justifyAlignCenter, 
        flexDirection: 'column', 
        width: '100%',
        position: 'relative',
        height: '100%'
      }}
    >
      <Grid 
        item 
        sx={{
          flex: '8', 
          width: '100%', 
          maxHeight: '100dvh', 
          overflow: 'auto',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <ChatContainer ref={chatContainerRef}>
          <MessagesRenderer
            messages={ messages }
            submitDemoMessage={ submitDemoMessage }
          />
        </ChatContainer>
      </Grid>
      <Grid 
        container 
        sx={{
          flex: '1', 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: isMobile && '0 0.5rem'
        }}
      >
        <ChatInputContainer>
          <InputField 
            inputRef={inputRef} 
            handleSend={handleSend} 
            responseLoading={responseLoading}
            selectedVersion={selectedVersion}
            userGenCredits={userGenCredits}
          />
          <FabMenu 
            isMobile={isMobile}
            setMessages={setMessages}
            messages={messages}
          />
        </ChatInputContainer>
      </Grid>
    </Grid>
  )
}

export default GPTChat;